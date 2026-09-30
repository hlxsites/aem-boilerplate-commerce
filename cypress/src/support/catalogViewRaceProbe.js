/** ******************************************************************
 * ADOBE CONFIDENTIAL
 * __________________
 *
 *  Copyright 2026 Adobe
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe and its suppliers, if any. The intellectual
 * and technical concepts contained herein are proprietary to Adobe
 * and its suppliers and are protected by all applicable intellectual
 * property laws, including trade secret and copyright laws.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe.
 ****************************************************************** */

import {
  createCatalogServiceResponseFixture,
  createCatalogViewContextResponseFixture,
} from '../fixtures/catalogViewContext.js';

const CATALOG_VIEW_QUERY = 'GET_CATALOG_VIEW_CONTEXT';
const COMPANY_HEADER = 'x-adobe-company';
const CATALOG_VIEW_HEADER = 'ac-view-id';
const CATALOG_VIEW_ACCESS_TOKEN_HEADER = 'ac-catalog-view-access-token';
const CATALOG_VIEW_RESPONSE_DELAY = 3000;

function findHeaderKey(headers, expectedKey) {
  return Object.keys(headers).find((key) => key.toLowerCase() === expectedKey);
}

function getHeaderValue(headers, expectedKey) {
  const key = findHeaderKey(headers, expectedKey);
  return key ? headers[key] : undefined;
}

function getPathConfig(cachedConfig, path) {
  const rootPath = Object.keys(cachedConfig.public)
    .filter((key) => key !== 'default')
    .sort((first, second) => second.split('/').length - first.split('/').length)
    .find((key) => path === key || path.startsWith(key));
  const defaultConfig = cachedConfig.public.default;
  const pathConfig = rootPath ? cachedConfig.public[rootPath] : {};
  return {
    ...defaultConfig,
    ...pathConfig,
    headers: {
      all: {
        ...defaultConfig?.headers?.all,
        ...pathConfig?.headers?.all,
      },
      cs: {
        ...defaultConfig?.headers?.cs,
        ...pathConfig?.headers?.cs,
      },
    },
  };
}

function getGraphQlQuery(req) {
  if (typeof req.body === 'string') {
    return req.body;
  }
  if (req.body?.query) {
    return req.body.query;
  }
  return new URL(req.url).searchParams.get('query') || '';
}

function isCatalogServiceRequest(req, phase) {
  if (!req.url.startsWith(phase.catalogEndpoint)) {
    return false;
  }
  if (phase.catalogEndpoint !== phase.coreEndpoint) {
    return true;
  }
  return new URL(req.url).searchParams.has('cb')
    || phase.catalogHeaderNames.some(
      (headerName) => getHeaderValue(req.headers, headerName) !== undefined,
  );
}

/**
 * Installs a deterministic probe for the authenticated catalog-view race.
 *
 * Core returns a synthetic company context and Catalog Service is fully stubbed,
 * so the EDS ordering contract runs in CI without an ACO projection or endpoint.
 *
 * @returns {{
 *   expectProtectedCatalogRequest: (context: {
 *     companyId: string,
 *     catalogViewId: string,
 *     accessToken: string
 *   }, path: string) => void,
 *   expectGuestCatalogRequest: (path: string) => void
 * }}
 */
export default function installCatalogViewRaceProbe() {
  let phaseNumber = 0;
  let activePhase = null;
  let cachedConfig;
  const syntheticPhaseByView = new Map();

  cy.window().should((win) => {
    const config = JSON.parse(win.sessionStorage.getItem('config') || '{}');
    expect(config?.public?.default, 'cached storefront config').to.be.an('object');
    cachedConfig = config;
  });

  cy.then(() => {
    cy.intercept({ method: '+(GET|POST)', url: '**/graphql*' }, (req) => {
      const query = getGraphQlQuery(req);
      if (activePhase?.armed && query.includes(CATALOG_VIEW_QUERY)) {
        if (!activePhase.contextRequest) {
          activePhase.contextRequest = {
            companyId: String(getHeaderValue(req.headers, COMPANY_HEADER)),
            startedAt: Date.now(),
          };
          if (activePhase.expectedContext) {
            req.alias = activePhase.contextAlias;
          }
        }

        if (activePhase.expectedContext) {
          req.reply({
            delay: CATALOG_VIEW_RESPONSE_DELAY,
            statusCode: 200,
            body: createCatalogViewContextResponseFixture(activePhase.expectedContext),
          });
        } else {
          req.continue();
        }
        return;
      }

      const requestViewId = getHeaderValue(req.headers, CATALOG_VIEW_HEADER);
      const phase = syntheticPhaseByView.get(requestViewId)
        || (activePhase?.armed ? activePhase : null);
      if (!phase
        || !isCatalogServiceRequest(req, phase)) {
        req.continue();
        return;
      }

      if (activePhase?.armed && !activePhase.catalogRequest) {
        activePhase.catalogRequest = {
          companyId: getHeaderValue(req.headers, COMPANY_HEADER),
          viewId: requestViewId,
          accessToken: getHeaderValue(
            req.headers,
            CATALOG_VIEW_ACCESS_TOKEN_HEADER,
          ),
          startedAt: Date.now(),
        };
        req.alias = activePhase.catalogAlias;
      }

      req.reply({
        statusCode: 200,
        body: createCatalogServiceResponseFixture(query, phase.productPath),
      });
    });
  });

  const createPhase = (expectedContext, path) => {
    phaseNumber += 1;
    return {
      expectedContext,
      contextAlias: `catalogViewContext${phaseNumber}`,
      catalogAlias: `catalogServiceRequest${phaseNumber}`,
      armed: false,
      contextRequest: null,
      catalogRequest: null,
      coreEndpoint: null,
      catalogEndpoint: null,
      catalogHeaderNames: [],
      publicCatalogViewId: null,
      productPath: path,
    };
  };

  const configurePhase = (phase) => {
    cy.then(() => {
      const pathConfig = getPathConfig(cachedConfig, phase.productPath);
      phase.coreEndpoint = pathConfig['commerce-core-endpoint'];
      phase.catalogEndpoint = pathConfig['commerce-endpoint'];
      phase.catalogHeaderNames = Object.keys(pathConfig.headers.cs)
        .map((headerName) => headerName.toLowerCase())
        .filter((headerName) => headerName !== 'content-type');
      phase.publicCatalogViewId = getHeaderValue(
        pathConfig.headers.cs,
        CATALOG_VIEW_HEADER,
      );
      expect(phase.catalogEndpoint, 'Catalog Service endpoint from config')
        .to.be.a('string').and.not.be.empty;
      expect(phase.coreEndpoint, 'Core GraphQL endpoint from config')
        .to.be.a('string').and.not.be.empty;
      expect(phase.catalogHeaderNames, 'Catalog Service identifying headers')
        .to.not.be.empty;
      if (phase.expectedContext) {
        syntheticPhaseByView.set(phase.expectedContext.catalogViewId, phase);
      }
      activePhase = phase;
    });
  };

  const visitPhase = (phase) => {
    cy.visit(phase.productPath, {
      onBeforeLoad() {
        phase.armed = true;
      },
    });
  };

  return {
    expectProtectedCatalogRequest(expectedContext, path) {
      const phase = createPhase(expectedContext, path);
      configurePhase(phase);
      visitPhase(phase);
      cy.wait(`@${phase.contextAlias}`);
      cy.wait(`@${phase.catalogAlias}`);
      cy.then(() => {
        expect(phase.contextRequest, 'catalog view context request').to.not.equal(null);
        expect(phase.catalogRequest, 'first Catalog Service request').to.not.equal(null);
        expect(phase.contextRequest.companyId, 'active company header on catalog context request')
          .to.equal(expectedContext.companyId);
        expect(phase.catalogRequest.viewId, 'catalog view id on first Catalog Service request')
          .to.equal(expectedContext.catalogViewId);
        expect(phase.catalogRequest.accessToken, 'catalog view token on first Catalog Service request')
          .to.equal(expectedContext.accessToken);
        expect(
          phase.catalogRequest.startedAt - phase.contextRequest.startedAt,
          'first Catalog Service request waited for the delayed catalog context',
        ).to.be.at.least(CATALOG_VIEW_RESPONSE_DELAY);
        phase.armed = false;
      });
    },

    expectGuestCatalogRequest(path) {
      const phase = createPhase(null, path);
      configurePhase(phase);
      visitPhase(phase);
      cy.wait(`@${phase.catalogAlias}`);
      cy.then(() => {
        expect(
          phase.contextRequest,
          'guest catalog view context request',
        ).to.equal(null);
        expect(phase.catalogRequest, 'first guest Catalog Service request').to.not.equal(null);
        expect(phase.catalogRequest.companyId, 'company header for guest request')
          .to.equal(undefined);
        expect(phase.catalogRequest.viewId, 'public catalog view id for guest request')
          .to.equal(phase.publicCatalogViewId);
        expect(phase.catalogRequest.accessToken, 'catalog view token for guest request')
          .to.equal(undefined);
        phase.armed = false;
      });
    },
  };
}
