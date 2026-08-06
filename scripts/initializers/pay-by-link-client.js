import { FetchGraphQL } from '@dropins/tools/fetch-graphql.js';

export const PBL_FETCH_GRAPHQL = new FetchGraphQL();

export function configurePayByLinkClient(sourceClient) {
  const { endpoint, fetchGraphQlHeaders } = sourceClient.getConfig();
  const { Authorization: _authorization, ...anonymousHeaders } = fetchGraphQlHeaders;

  PBL_FETCH_GRAPHQL.setEndpoint(endpoint);
  PBL_FETCH_GRAPHQL.setFetchGraphQlHeaders(anonymousHeaders);
  PBL_FETCH_GRAPHQL.removeFetchGraphQlHeader('Authorization');
}
