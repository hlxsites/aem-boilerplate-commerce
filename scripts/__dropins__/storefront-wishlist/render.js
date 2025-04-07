/*! Copyright 2025 Adobe
All Rights Reserved. */
(function injectCodeCustomRunTimeFunction(cssCode, options) {
  try {
    if (typeof document != "undefined") {
      const elem = document.createElement("style");
      const name = options.styleId;
      for (const attribute in options.attributes) {
        elem.setAttribute(attribute, options.attributes[attribute]);
      }
      elem.setAttribute("data-dropin", name);
      elem.appendChild(document.createTextNode(cssCode));
      const sdk = document.querySelector('style[data-dropin="sdk"]');
      if (sdk) {
        sdk.after(elem);
      } else {
        const base = document.querySelector(
          'link[rel="stylesheet"], style'
        );
        if (base) {
          base.before(elem);
        } else {
          document.head.append(elem);
        }
      }
    }
  } catch (e) {
    console.error("dropin-styles (injectCodeFunction)", e);
  }
})("/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.dropin-icon--shape-stroke-1 {\n  stroke-width: var(--shape-icon-stroke-1);\n}\n\n.dropin-icon--shape-stroke-2 {\n  stroke-width: var(--shape-icon-stroke-2);\n}\n\n.dropin-icon--shape-stroke-3 {\n  stroke-width: var(--shape-icon-stroke-3);\n}\n\n.dropin-icon--shape-stroke-4 {\n  stroke-width: var(--shape-icon-stroke-4);\n}\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* Common button styles */\n.dropin-button,\n.dropin-iconButton {\n  border: 0 none;\n  cursor: pointer;\n  white-space: normal;\n}\n\n.dropin-button {\n  border-radius: var(--shape-border-radius-3);\n  font-size: var(--type-button-1-font);\n  font-weight: var(--type-button-1-font);\n  padding: var(--spacing-xsmall) var(--spacing-medium);\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: left;\n  word-wrap: break-word;\n}\n\n.dropin-iconButton {\n  height: var(--spacing-xbig);\n  width: var(--spacing-xbig);\n  padding: var(--spacing-xsmall);\n}\n\n.dropin-button:disabled,\n.dropin-iconButton:disabled {\n  pointer-events: none;\n  user-select: none;\n}\n\n.dropin-button:not(:disabled),\n.dropin-iconButton:not(:disabled) {\n  cursor: pointer;\n}\n\n.dropin-button:focus,\n.dropin-iconButton:focus {\n  outline: none;\n}\n\n.dropin-button:focus-visible,\n.dropin-iconButton:focus-visible {\n  outline: var(--spacing-xxsmall) solid var(--color-button-focus);\n}\n\n/* Primary */\n.dropin-button--primary,\na.dropin-button--primary,\n.dropin-iconButton--primary {\n  border: none;\n  background: var(--color-brand-500) 0 0% no-repeat padding-box;\n  color: var(--color-neutral-50);\n  text-align: left;\n  margin-right: 0;\n}\n\n.dropin-iconButton--primary {\n  border-radius: var(--spacing-xbig);\n  min-height: var(--spacing-xbig);\n  min-width: var(--spacing-xbig);\n  padding: var(--spacing-xsmall);\n}\n\n.dropin-button--primary--disabled,\na.dropin-button--primary--disabled,\n.dropin-iconButton--primary--disabled {\n  background: var(--color-neutral-300) 0 0% no-repeat padding-box;\n  color: var(--color-neutral-500);\n  fill: var(--color-neutral-300);\n  pointer-events: none;\n  user-select: none;\n}\n\n.dropin-button--primary:hover,\na.dropin-button--primary:hover,\n.dropin-iconButton--primary:hover,\n.dropin-button--primary:focus:hover,\n.dropin-iconButton--primary:focus:hover {\n  background-color: var(--color-button-hover);\n  text-decoration: none;\n}\n\n.dropin-button--primary:focus,\n.dropin-iconButton--primary:focus {\n  background-color: var(--color-brand-500);\n}\n\n.dropin-button--primary:hover:active,\n.dropin-iconButton--primary:hover:active {\n  background-color: var(--color-button-active);\n}\n\n/* Secondary */\n.dropin-button--secondary,\na.dropin-button--secondary,\n.dropin-iconButton--secondary {\n  border: var(--shape-border-width-2) solid var(--color-brand-500);\n  background: none 0 0% no-repeat padding-box;\n  color: var(--color-brand-500);\n  padding-top: calc(var(--spacing-xsmall) - var(--shape-border-width-2));\n  padding-left: calc(var(--spacing-medium) - var(--shape-border-width-2));\n}\n\n.dropin-iconButton--secondary {\n  border-radius: var(--spacing-xbig);\n  min-height: var(--spacing-xbig);\n  min-width: var(--spacing-xbig);\n  padding: var(--spacing-xsmall);\n  padding-top: calc(var(--spacing-xsmall) - var(--shape-border-width-2));\n  padding-left: calc(var(--spacing-xsmall) - var(--shape-border-width-2));\n}\n\n.dropin-button--secondary--disabled,\na.dropin-button--secondary--disabled,\n.dropin-iconButton--secondary--disabled {\n  border: var(--shape-border-width-2) solid var(--color-neutral-300);\n  background: none 0 0% no-repeat padding-box;\n  color: var(--color-neutral-500);\n  fill: var(--color-neutral-300);\n  pointer-events: none;\n  user-select: none;\n}\n\n.dropin-button--secondary:hover,\na.dropin-button--secondary:hover,\n.dropin-iconButton--secondary:hover {\n  border: var(--shape-border-width-2) solid var(--color-button-hover);\n  color: var(--color-button-hover);\n  text-decoration: none;\n}\n\n.dropin-button--secondary:active,\n.dropin-iconButton--secondary:active {\n  border: var(--shape-border-width-2) solid var(--color-button-active);\n  color: var(--color-button-active);\n}\n\n/* Tertiary */\n.dropin-button--tertiary,\na.dropin-button--tertiary,\n.dropin-iconButton--tertiary {\n  border: none;\n  background: none 0 0% no-repeat padding-box;\n  color: var(--color-brand-500);\n}\n\n.dropin-iconButton--tertiary {\n  border: none;\n  border-radius: var(--spacing-xbig);\n  min-height: var(--spacing-xbig);\n  min-width: var(--spacing-xbig);\n  padding: var(--spacing-xsmall);\n}\n\n.dropin-button--tertiary--disabled,\na.dropin-button--tertiary--disabled,\n.dropin-iconButton--tertiary--disabled {\n  border: none;\n  color: var(--color-neutral-500);\n  pointer-events: none;\n  user-select: none;\n}\n\n.dropin-button--tertiary:hover,\na.dropin-button--tertiary:hover,\n.dropin-iconButton--tertiary:hover {\n  color: var(--color-button-hover);\n  text-decoration: none;\n}\n\n.dropin-button--tertiary:active,\n.dropin-iconButton--tertiary:active {\n  color: var(--color-button-active);\n}\n\n.dropin-button--tertiary:focus-visible,\n.dropin-iconButton--tertiary:focus-visible {\n  -webkit-box-shadow: inset 0 0 0 2px var(--color-neutral-800);\n  -moz-box-shadow: inset 0 0 0 2px var(--color-neutral-800);\n  box-shadow: inset 0 0 0 2px var(--color-neutral-800);\n}\n\n/* Button Sizes */\n.dropin-button--large {\n  font: var(--type-button-1-font);\n  letter-spacing: var(--type-button-1-letter-spacing);\n}\n\n.dropin-button--medium {\n  font: var(--type-button-2-font);\n  letter-spacing: var(--type-button-2-letter-spacing);\n}\n\n.dropin-button-icon {\n  height: 24px;\n}\n\n/* Button with text and icon */\n.dropin-button--with-icon {\n  column-gap: var(--spacing-xsmall);\n  row-gap: var(--spacing-xsmall);\n}\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/**\n * Do not edit directly\n * Generated on Tue, 05 Mar 2024 20:18:40 GMT\n */\n\n.dropin-design {\n  --color-brand-500: #454545; /* Brand buttons default - AAA */\n  --color-brand-600: #383838; /* Brand buttons on hover - AAA */\n  --color-brand-700: #2b2b2b; /* Brand buttons selected */\n  --color-neutral-50: #ffffff; /* Lightest surface / Text & components On Dark surface - AAA */\n  --color-neutral-100: #fafafa; /* Light surface - AAA */\n  --color-neutral-200: #f5f5f5; /* Light surface - AAA */\n  --color-neutral-300: #e8e8e8; /* Disabled surfaces - AAA */\n  --color-neutral-400: #d6d6d6; /* Ornamental elements (ie. Divider) */\n  --color-neutral-500: #b8b8b8; /* Disabled text */\n  --color-neutral-600: #8f8f8f; /* Component borders (ie. Text field border) - AA Large text */\n  --color-neutral-700: #666666; /* Secondary text - AAA */\n  --color-neutral-800: #3d3d3d; /* Default text - AAA */\n  --color-neutral-900: #292929; /* Default text on hover - AAA */\n  --color-positive-200: #eff5ef; /* Semantic positive surface - AA Large text */\n  --color-positive-500: #7fb078; /* Semantic positive surface */\n  --color-positive-800: #53824c; /* Semantic Positive text - On Light AA */\n  --color-informational-200: #eeeffb; /* Semantic informational surface - AA Large text */\n  --color-informational-500: #6978d9; /* Semantic informational surface */\n  --color-informational-800: #5d6dd6; /* Semantic informational text, Highlights - On Light AA */\n  --color-warning-200: #fdf3e9; /* Semantic warning surface - AA Large text */\n  --color-warning-500: #e79f5c; /* Semantic warning surface */\n  --color-warning-800: #ad5c00; /* Semantic warning text - On Light AA */\n  --color-alert-200: #ffebeb; /* Semantic alert surface - AA Large text */\n  --color-alert-500: #db7070; /* Semantic alert surface */\n  --color-alert-800: #bf4545; /* Semantic alert text - On light AA */\n  --color-opacity-16: rgba(255, 255, 255, 0.16);\n  --color-opacity-24: rgba(255, 255, 255, 0.24);\n  --color-action-button-active: #ffffff; /* Defaults to var(--color-neutral-50) */\n  --color-action-button-hover: #e8e8e8; /* Defaults to var(--color-neutral-300) */\n  --color-button-active: #2b2b2b; /* Defaults to var(--color-brand-700) */\n  --color-button-focus: #d6d6d6; /* Defaults to var(--color-neutral-400) */\n  --color-button-hover: #383838; /* Defaults to var(--color-brand-600) */\n  --grid-1-columns: 4;\n  --grid-1-margins: 0;\n  --grid-1-gutters: 16px;\n  --grid-2-columns: 12;\n  --grid-2-margins: 0;\n  --grid-2-gutters: 16px;\n  --grid-3-columns: 12;\n  --grid-3-margins: 0;\n  --grid-3-gutters: 24px;\n  --grid-4-columns: 12;\n  --grid-4-margins: 0;\n  --grid-4-gutters: 24px;\n  --grid-5-columns: 12;\n  --grid-5-margins: 0;\n  --grid-5-gutters: 24px;\n  --shape-border-radius-1: 3px;\n  --shape-border-radius-2: 8px;\n  --shape-border-radius-3: 24px;\n  --shape-border-width-1: 1px;\n  --shape-border-width-2: 1.5px;\n  --shape-border-width-3: 2px;\n  --shape-border-width-4: 4px;\n  --shape-shadow-1: 0 0 16px 0 rgba(0, 0, 0, 0.16); /* Elevated panels (ie. Page side panel, Mobile bottom bar) */\n  --shape-shadow-2: 0 2px 16px 0 rgba(0, 0, 0, 0.16); /* Elevated dialogs (ie. Modal) */\n  --shape-shadow-3: 0 2px 3px 0 rgba(0, 0, 0, 0.16); /* Elevated container (ie. Card) */\n  --shape-icon-stroke-1: 1px;\n  --shape-icon-stroke-2: 1.5px;\n  --shape-icon-stroke-3: 2px;\n  --shape-icon-stroke-4: 4px;\n  --spacing-xxsmall: 4px;\n  --spacing-xsmall: 8px;\n  --spacing-small: 16px;\n  --spacing-medium: 24px;\n  --spacing-big: 32px;\n  --spacing-xbig: 40px;\n  --spacing-xxbig: 48px;\n  --spacing-large: 64px;\n  --spacing-xlarge: 72px;\n  --spacing-xxlarge: 96px;\n  --spacing-huge: 120px;\n  --spacing-xhuge: 144px;\n  --spacing-xxhuge: 192px;\n  --type-base-font-family: system-ui, sans-serif;\n  --type-display-1-font: normal normal 300 60px/72px\n    var(--type-base-font-family); /* Hero title */\n  --type-display-1-letter-spacing: 0.04em;\n  --type-display-2-font: normal normal 300 48px/56px\n    var(--type-base-font-family); /* Banner title */\n  --type-display-2-letter-spacing: 0.04em;\n  --type-display-3-font: normal normal 300 34px/40px\n    var(--type-base-font-family); /* Desktop & tablet section title */\n  --type-display-3-letter-spacing: 0.04em;\n  --type-headline-1-font: normal normal 400 24px/32px\n    var(--type-base-font-family); /* Desktop & tablet page title */\n  --type-headline-1-letter-spacing: 0.04em;\n  --type-headline-2-default-font: normal normal 300 20px/24px\n    var(--type-base-font-family); /* Rail title */\n  --type-headline-2-default-letter-spacing: 0.04em;\n  --type-headline-2-strong-font: normal normal 400 20px/24px\n    var(--type-base-font-family); /* Mobile page and section title */\n  --type-headline-2-strong-letter-spacing: 0.04em;\n  --type-body-1-default-font: normal normal 300 16px/24px\n    var(--type-base-font-family); /* Normal text paragraph */\n  --type-body-1-default-letter-spacing: 0.04em;\n  --type-body-1-strong-font: normal normal 400 16px/24px\n    var(--type-base-font-family);\n  --type-body-1-strong-letter-spacing: 0.04em;\n  --type-body-1-emphasized-font: normal normal 700 16px/24px\n    var(--type-base-font-family);\n  --type-body-1-emphasized-letter-spacing: 0.04em;\n  --type-body-2-default-font: normal normal 300 14px/20px\n    var(--type-base-font-family);\n  --type-body-2-default-letter-spacing: 0.04em;\n  --type-body-2-strong-font: normal normal 400 14px/20px\n    var(--type-base-font-family);\n  --type-body-2-strong-letter-spacing: 0.04em;\n  --type-body-2-emphasized-font: normal normal 700 14px/20px\n    var(--type-base-font-family);\n  --type-body-2-emphasized-letter-spacing: 0.04em;\n  --type-button-1-font: normal normal 400 20px/26px var(--type-base-font-family); /* Primary button text */\n  --type-button-1-letter-spacing: 0.08em;\n  --type-button-2-font: normal normal 400 16px/24px var(--type-base-font-family); /* Small buttons */\n  --type-button-2-letter-spacing: 0.08em;\n  --type-details-caption-1-font: normal normal 400 12px/16px\n    var(--type-base-font-family);\n  --type-details-caption-1-letter-spacing: 0.08em;\n  --type-details-caption-2-font: normal normal 300 12px/16px\n    var(--type-base-font-family);\n  --type-details-caption-2-letter-spacing: 0.08em;\n  --type-details-overline-font: normal normal 700 12px/20px\n    var(--type-base-font-family);\n  --type-details-overline-letter-spacing: 0.16em;\n}\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n.dropin-design a {\n  --textColor: var(--color-brand-500);\n  color: var(--textColor);\n  text-decoration: none;\n}\n\n.dropin-design a:hover {\n  --textColor: var(--color-brand-700);\n  text-decoration: solid underline var(--textColor);\n  text-underline-offset: 6px;\n}\n\n.dropin-design a:focus-visible {\n  outline: solid var(--shape-border-width-4) var(--color-neutral-400);\n  border: var(--shape-border-width-1) solid var(--color-neutral-800);\n  border-radius: var(--shape-border-radius-1);\n}\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.dropin-in-line-alert {\n  border-width: var(--shape-border-width-2);\n  border-style: solid;\n  border-radius: var(--shape-border-radius-1);\n  display: grid;\n  grid-auto-flow: row;\n  gap: var(--spacing-small);\n  padding: var(--spacing-small);\n  position: relative;\n}\n\n.dropin-in-line-alert__heading {\n  display: grid;\n  gap: var(--spacing-small);\n  grid-template-columns: auto auto;\n  align-items: center;\n}\n\n.dropin-in-line-alert__title-container {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xsmall);\n}\n\n.dropin-in-line-alert__title {\n  color: var(--color-neutral-800);\n  font: var(--type-body-2-emphasized-font);\n  letter-spacing: var(--type-body-2-emphasized-letter-spacing);\n  margin: 0;\n}\n\n.dropin-in-line-alert__actions-container {\n  display: flex;\n  justify-content: end;\n}\n\n.dropin-in-line-alert__additional-action {\n  padding: 0px;\n}\n\n.dropin-in-line-alert__additional-action span {\n  font: var(--type-details-caption-1-font);\n  letter-spacing: var(--type-details-caption-1-letter-spacing);\n  text-decoration: underline;\n  color: var(--color-neutral-700);\n}\n\n.dropin-in-line-alert__dismiss-button {\n  padding: 0;\n}\n\n.dropin-in-line-alert__description {\n  color: var(--color-neutral-800);\n  font: var(--type-body-2-default-font);\n  letter-spacing: var(--type-body-2-default-letter-spacing);\n  margin: 0;\n}\n\n.dropin-in-line-alert__additional-actions-container {\n  display: flex;\n  gap: var(--spacing-small);\n  justify-content: flex-end;\n}\n\n.dropin-in-line-alert__item-list:first-child::before {\n  content: '';\n  display: block;\n  border-top: var(--shape-border-width-3) solid var(--color-neutral-400);\n  margin-bottom: var(--spacing-medium);\n}\n\n/* Variants */\n\n/* Error */\n.dropin-in-line-alert--error {\n  border-color: var(--color-alert-500);\n}\n\n/* Warning */\n.dropin-in-line-alert--warning {\n  border-color: var(--color-warning-500);\n}\n\n/* Success */\n.dropin-in-line-alert--success {\n  border-color: var(--color-positive-500);\n}\n\n/* Secondary */\n.dropin-in-line-alert--secondary {\n  border: none;\n  background-color: var(--color-neutral-200);\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.dropin-illustrated-message {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  height: 100%;\n  row-gap: var(--spacing-small);\n}\n\n.dropin-illustrated-message .dropin-card {\n  width: 100%;\n}\n\n.dropin-illustrated-message__icon {\n  color: var(--color-neutral-400);\n  margin: 0 auto var(--spacing-medium) auto;\n}\n\n.dropin-illustrated-message__heading {\n  color: var(--color-neutral-800);\n  font: var(--type-headline-2-strong-font);\n  letter-spacing: var(--type-headline-2-strong-letter-spacing);\n  margin: 0;\n}\n\n.dropin-illustrated-message__message {\n  color: var(--color-neutral-800);\n  font: var(--type-body-2-default-font);\n  letter-spacing: var(--type-body-2-default-letter-spacing);\n  text-align: center;\n  margin: 0;\n}\n\n.dropin-illustrated-message .dropin-illustrated-message__action {\n  justify-self: center;\n  align-self: center;\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.dropin-image {\n  background: var(--color-neutral-300)\n    linear-gradient(\n      to right,\n      var(--color-neutral-300) 0%,\n      var(--color-neutral-100) 20%,\n      var(--color-neutral-300) 40%,\n      var(--color-neutral-300) 100%\n    )\n    no-repeat;\n  animation: imageShimmer infinite 1.2s linear;\n  border-radius: var(--shape-border-radius-2);\n}\n\n/* Loaded */\n.dropin-image--loaded {\n  background: unset;\n  border-radius: unset;\n}\n\n@keyframes imageShimmer {\n  0% {\n    background-position: -600px 0;\n  }\n\n  100% {\n    background-position: 600px 0;\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n *  Copyright 2024 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  Adobe permits you to use, modify, and distribute this \n * file in accordance with the terms of the Adobe license agreement \n * accompanying it. \n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.dropin-price {\n  color: inherit;\n}\n\n.dropin-price--small {\n  font: var(--type-body-2-strong-font);\n  letter-spacing: var(--type-body-2-strong-letter-spacing);\n}\n\n.dropin-price--medium {\n  font: var(--type-body-1-default-font);\n  letter-spacing: var(--type-body-1-default-letter-spacing);\n}\n\n.dropin-price--large {\n  font: var(--type-headline-2-strong-font);\n  letter-spacing: var(--type-headline-2-strong-letter-spacing);\n}\n\n.dropin-price--strikethrough {\n  text-decoration: line-through;\n}\n\n.dropin-price--sale {\n  color: var(--color-alert-800);\n}\n\n.dropin-price--bold {\n  font-weight: bold;\n}\n\n.dropin-price--normal {\n  font-weight: normal;\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-empty-wishlist {\n  container-type: inline-size;\n  container-name: wishlist;\n}\n\n.wishlist-empty-wishlist__wrapper .dropin-card--secondary {\n  display: grid;\n  grid-auto-rows: min-content;\n  justify-content: center;\n  text-align: center;\n  border: unset;\n}\n\n.wishlist-empty-wishlist .dropin-illustrated-message__heading {\n  font: var(--type-headline-1-font);\n}\n\n.wishlist-empty-wishlist .dropin-illustrated-message__message {\n  font: var(--type-body-1-default-font);\n}\n\n@container wishlist (width < 737px) {\n  .wishlist-empty-wishlist__wrapper .dropin-card {\n    border: unset;\n    border-style: hidden;\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n/* @media only screen and (min-width: 768px) { } */\n\n/* Large (landscape tablets, 1024px and up) */\n/* @media only screen and (min-width: 1024px) { } */\n\n/* XLarge (laptops/desktops, 1366px and up) */\n/* @media only screen and (min-width: 1366px) { } */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/* @media only screen and (min-width: 1920px) { } */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-wishlist {\n  container-type: inline-size;\n  container-name: wishlist-grid;\n  max-width: inherit;\n}\n\n/* Container for the wishlist grid */\n.wishlist-wishlist__content {\n  display: grid;\n  gap: var(--spacing-medium);\n  margin: auto;\n  padding: var(--spacing-medium) 0;\n}\n\n/* Heading */\n.wishlist-wishlist__heading {\n  color: var(--color-neutral-800);\n  display: grid;\n  font: var(--type-headline-1-font);\n  letter-spacing: var(--type-headline-1-letter-spacing);\n  padding: var(--spacing-small) 0;\n  row-gap: var(--spacing-xsmall);\n}\n\n.wishlist-wishlist__heading-count {\n  color: #6D6D6D;\n  margin-left: var(--spacing-xxsmall);\n  letter-spacing: normal;\n  font: var(--type-details-caption-2-font);\n}\n\n/* Empty wishlist message */\n.wishlist-wishlist__content.wishlist-wishlist__content--empty {\n  border: var(--shape-border-width-2) solid var(--color-neutral-400);\n  border-radius: var(--shape-border-radius-2);\n  grid-template-columns: repeat(1, 1fr);\n  padding: var(--spacing-xxbig);\n}\n\n/* Extra small devices (phones, 480px and down) */\n@media only screen and (max-width: 480px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(1, 1fr);\n  }\n}\n\n@media only screen and (min-width: 480px) and (max-width: 600px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Small devices (portrait tablets and large phones, 600px and up) */\n@media only screen and (min-width: 600px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n@media only screen and (min-width: 768px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n/* Large (landscape tablets, 1024px and up) */\n@media only screen and (min-width: 1024px) {\n  .wishlist-wishlist__content {\n    grid-template-columns: repeat(4, 1fr);\n  }\n}\n\n/* XLarge (laptops/desktops, 1366px and up) */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-product-item {\n  background-color: var(--color-neutral-50);\n  margin-bottom: var(--spacing-small)\n}\n\n.wishlist-product-item__content {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-small);\n}\n\n.wishlist-product-item__content .wishlist-product-item-image {\n  height: 100%;\n  padding: 0;\n  width: 100%;\n}\n\n.wishlist-product-item__content .wishlist-product-item__title {\n  color: var(--color-neutral-800);\n  font: var(--type-body-2-strong-font);\n  letter-spacing: var(--type-body-2-strong-letter-spacing);\n  margin: 0;\n  position: relative;\n}\n\n.wishlist-product-item-name {\n  display: block;\n}\n\n.wishlist-product-item__content .wishlist-product-item-button__remove {\n  position: absolute;\n  right: 0;\n  top: -10px;\n}\n\n.wishlist-product-item__content .wishlist-product-item-price {\n  display: inline;\n  font: var(--type-body-2-default-font);\n}\n\n.strikeout {\n  text-decoration: line-through;\n}\n\n.wishlist-product-item__content .wishlist-product-item-discounted-price {\n  display: inline;\n  margin-left: var(--spacing-xsmall);\n  color: var(--color-alert-800);\n}\n\n.wishlist-product-item-move-to-cart {\n  display: grid;\n  grid-area: product-add-to-cart;\n  justify-content: end;\n}\n/********************************************************************\n * ADOBE CONFIDENTIAL\n * __________________\n *\n *  Copyright 2025 Adobe\n *  All Rights Reserved.\n *\n * NOTICE:  All information contained herein is, and remains\n * the property of Adobe and its suppliers, if any. The intellectual\n * and technical concepts contained herein are proprietary to Adobe\n * and its suppliers and are protected by all applicable intellectual\n * property laws, including trade secret and copyright laws.\n * Dissemination of this information or reproduction of this material\n * is strictly forbidden unless prior written permission is obtained\n * from Adobe.\n *******************************************************************/\n\n.image-carousel {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-medium);\n  padding: var(--spacing-medium);\n}\n\n.image-carousel .image-carousel-image {\n  object-fit: contain;\n  padding: var(--spacing-xxsmall) 0;\n  width: 100%;\n}\n\n.image-switcher-area {\n  margin-top: var(--spacing-small);\n  text-align: center;\n  width: 100%;\n}\n\n.image-switcher-area .image-switcher {\n  cursor: pointer;\n  border-radius: 50%;\n  display: inline-flex;\n  height: var(--spacing-xsmall);\n  margin: 0 var(--spacing-xxsmall);\n  width: var(--spacing-xsmall);\n}\n\n.image-switcher-area .image-switcher-active {\n  background-color: var(--color-neutral-900);\n  border: var(--shape-border-width-1) solid var(--color-brand-700);\n}\n\n.image-switcher-area .image-switcher-inactive {\n  background-color: var(--color-neutral-600);\n  border: var(--shape-border-width-1) solid var(--color-neutral-600);\n}\n\n/* Extra small devices (phones, 480px and down) */\n@media only screen and (max-width: 480px) {\n  .image-carousel {\n    gap: var(--spacing-xxsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 250px;\n  }\n}\n\n/* Small devices (portrait tablets and large phones, 600px and up) */\n@media only screen and (min-width: 480px) and (max-width: 600px) {\n  .image-carousel {\n    gap: var(--spacing-xsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 300px;\n  }\n}\n\n@media only screen and (min-width: 600px) {\n  .image-carousel {\n    gap: var(--spacing-xsmall);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 300px;\n  }\n}\n\n/* Medium (portrait tablets and large phones, 768px and up) */\n@media only screen and (min-width: 768px) {\n  .image-carousel {\n    gap: var(--spacing-small);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 350px;\n  }\n}\n\n/* Large (landscape tablets, 1024px and up) */\n@media only screen and (min-width: 1024px) {\n  .image-carousel {\n    gap: var(--spacing-medium);\n  }\n\n  .image-carousel .image-carousel-image {\n    height: 400px;\n  }\n}\n\n/* XLarge (laptops/desktops, 1366px and up) */\n\n/* XXlarge (large laptops and desktops, 1920px and up) */\n/********************************************************************\n* ADOBE CONFIDENTIAL\n* __________________\n*\n*  Copyright 2024 Adobe\n*  All Rights Reserved.\n*\n* NOTICE:  All information contained herein is, and remains\n* the property of Adobe and its suppliers, if any. The intellectual\n* and technical concepts contained herein are proprietary to Adobe\n* and its suppliers and are protected by all applicable intellectual\n* property laws, including trade secret and copyright laws.\n* Dissemination of this information or reproduction of this material\n* is strictly forbidden unless prior written permission is obtained\n* from Adobe.\n*******************************************************************/\n\n/* https://cssguidelin.es/#bem-like-naming */\n\n.wishlist-login__sign-in {\n  grid-column-start: 2;\n  color: var(--color-neutral-800);\n  font: var(--type-body-1-default-font);\n  letter-spacing: var(--type-body-2-default-letter-spacing);\n  margin-top: var(--spacing-xxsmall);\n  text-align: center;\n}\n\na.wishlist-login__link {\n  font: var(--type-body-1-strong-font);\n  letter-spacing: var(--type-body-2-strong-letter-spacing);\n  margin-left: var(--spacing-xxsmall);\n  text-decoration: underline;\n  text-decoration-thickness: auto;\n  text-underline-offset: auto;\n  color: var(--color-neutral-800);\n}\n\na.wishlist-login__link:hover {\n  color: var(--color-neutral-800);\n  text-decoration: underline;\n  text-decoration-thickness: auto;\n  text-underline-offset: auto;\n}", { "styleId": "Wishlist" });
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { options, h as h$1, Fragment, render as render$1, createContext } from "@dropins/tools/preact.js";
import { VComponent, deepmerge, Render as Render$1 } from "@dropins/tools/lib.js";
import { a as u$1, t as t$1, u as u$2 } from "./chunks/jsxRuntime.module.js";
import { signal } from "@dropins/tools/signals.js";
import { useState, useEffect } from "@dropins/tools/preact-hooks.js";
import { e as events } from "./chunks/index.js";
import { t } from "./chunks/devtools.module.js";
import { useMemo, createContext as createContext$1 } from "@dropins/tools/preact-compat.js";
import { IntlProvider } from "@dropins/tools/i18n.js";
var n = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i, o = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/, i = /[\s\n\\/='"\0<>]/, l = /^xlink:?./, a = /["&<]/;
function s(e) {
  if (false === a.test(e += "")) return e;
  for (var t2 = 0, r = 0, n2 = "", o2 = ""; r < e.length; r++) {
    switch (e.charCodeAt(r)) {
      case 34:
        o2 = "&quot;";
        break;
      case 38:
        o2 = "&amp;";
        break;
      case 60:
        o2 = "&lt;";
        break;
      default:
        continue;
    }
    r !== t2 && (n2 += e.slice(t2, r)), n2 += o2, t2 = r + 1;
  }
  return r !== t2 && (n2 += e.slice(t2, r)), n2;
}
var f = function(e, t2) {
  return String(e).replace(/(\n+)/g, "$1" + (t2 || "	"));
}, u = function(e, t2, r) {
  return String(e).length > 40 || -1 !== String(e).indexOf("\n") || -1 !== String(e).indexOf("<");
}, c = {}, _ = /([A-Z])/g;
function p(e) {
  var t2 = "";
  for (var r in e) {
    var o2 = e[r];
    null != o2 && "" !== o2 && (t2 && (t2 += " "), t2 += "-" == r[0] ? r : c[r] || (c[r] = r.replace(_, "-$1").toLowerCase()), t2 = "number" == typeof o2 && false === n.test(r) ? t2 + ": " + o2 + "px;" : t2 + ": " + o2 + ";");
  }
  return t2 || void 0;
}
function d(e, t2) {
  return Array.isArray(t2) ? t2.reduce(d, e) : null != t2 && false !== t2 && e.push(t2), e;
}
function v() {
  this.__d = true;
}
function h(e, t2) {
  return { __v: e, context: t2, props: e.props, setState: v, forceUpdate: v, __d: true, __h: [] };
}
function g(e, t2) {
  var r = e.contextType, n2 = r && t2[r.__c];
  return null != r ? n2 ? n2.props.value : r.__ : t2;
}
var y = [];
function m(r, n2, a2, c2, _2, v2) {
  if (null == r || "boolean" == typeof r) return "";
  if ("object" != typeof r) return "function" == typeof r ? "" : s(r);
  var b2 = a2.pretty, x2 = b2 && "string" == typeof b2 ? b2 : "	";
  if (Array.isArray(r)) {
    for (var k2 = "", S2 = 0; S2 < r.length; S2++) b2 && S2 > 0 && (k2 += "\n"), k2 += m(r[S2], n2, a2, c2, _2, v2);
    return k2;
  }
  if (void 0 !== r.constructor) return "";
  var w2, C2 = r.type, O2 = r.props, j2 = false;
  if ("function" == typeof C2) {
    if (j2 = true, !a2.shallow || !c2 && false !== a2.renderRootComponent) {
      if (C2 === Fragment) {
        var A2 = [];
        return d(A2, r.props.children), m(A2, n2, a2, false !== a2.shallowHighOrder, _2, v2);
      }
      var F2, H = r.__c = h(r, n2);
      options.__b && options.__b(r);
      var M = options.__r;
      if (C2.prototype && "function" == typeof C2.prototype.render) {
        var L = g(C2, n2);
        (H = r.__c = new C2(O2, L)).__v = r, H._dirty = H.__d = true, H.props = O2, null == H.state && (H.state = {}), null == H._nextState && null == H.__s && (H._nextState = H.__s = H.state), H.context = L, C2.getDerivedStateFromProps ? H.state = Object.assign({}, H.state, C2.getDerivedStateFromProps(H.props, H.state)) : H.componentWillMount && (H.componentWillMount(), H.state = H._nextState !== H.state ? H._nextState : H.__s !== H.state ? H.__s : H.state), M && M(r), F2 = H.render(H.props, H.state, H.context);
      } else for (var T = g(C2, n2), E = 0; H.__d && E++ < 25; ) H.__d = false, M && M(r), F2 = C2.call(r.__c, O2, T);
      return H.getChildContext && (n2 = Object.assign({}, n2, H.getChildContext())), options.diffed && options.diffed(r), m(F2, n2, a2, false !== a2.shallowHighOrder, _2, v2);
    }
    C2 = (w2 = C2).displayName || w2 !== Function && w2.name || function(e) {
      var t2 = (Function.prototype.toString.call(e).match(/^\s*function\s+([^( ]+)/) || "")[1];
      if (!t2) {
        for (var r2 = -1, n3 = y.length; n3--; ) if (y[n3] === e) {
          r2 = n3;
          break;
        }
        r2 < 0 && (r2 = y.push(e) - 1), t2 = "UnnamedComponent" + r2;
      }
      return t2;
    }(w2);
  }
  var $, D, N = "<" + C2;
  if (O2) {
    var P = Object.keys(O2);
    a2 && true === a2.sortAttributes && P.sort();
    for (var W = 0; W < P.length; W++) {
      var I = P[W], R = O2[I];
      if ("children" !== I) {
        if (!i.test(I) && (a2 && a2.allAttributes || "key" !== I && "ref" !== I && "__self" !== I && "__source" !== I)) {
          if ("defaultValue" === I) I = "value";
          else if ("defaultChecked" === I) I = "checked";
          else if ("defaultSelected" === I) I = "selected";
          else if ("className" === I) {
            if (void 0 !== O2.class) continue;
            I = "class";
          } else _2 && l.test(I) && (I = I.toLowerCase().replace(/^xlink:?/, "xlink:"));
          if ("htmlFor" === I) {
            if (O2.for) continue;
            I = "for";
          }
          "style" === I && R && "object" == typeof R && (R = p(R)), "a" === I[0] && "r" === I[1] && "boolean" == typeof R && (R = String(R));
          var U = a2.attributeHook && a2.attributeHook(I, R, n2, a2, j2);
          if (U || "" === U) N += U;
          else if ("dangerouslySetInnerHTML" === I) D = R && R.__html;
          else if ("textarea" === C2 && "value" === I) $ = R;
          else if ((R || 0 === R || "" === R) && "function" != typeof R) {
            if (!(true !== R && "" !== R || (R = I, a2 && a2.xml))) {
              N = N + " " + I;
              continue;
            }
            if ("value" === I) {
              if ("select" === C2) {
                v2 = R;
                continue;
              }
              "option" === C2 && v2 == R && void 0 === O2.selected && (N += " selected");
            }
            N = N + " " + I + '="' + s(R) + '"';
          }
        }
      } else $ = R;
    }
  }
  if (b2) {
    var V = N.replace(/\n\s*/, " ");
    V === N || ~V.indexOf("\n") ? b2 && ~N.indexOf("\n") && (N += "\n") : N = V;
  }
  if (N += ">", i.test(C2)) throw new Error(C2 + " is not a valid HTML tag name in " + N);
  var q, z = o.test(C2) || a2.voidElements && a2.voidElements.test(C2), Z = [];
  if (D) b2 && u(D) && (D = "\n" + x2 + f(D, x2)), N += D;
  else if (null != $ && d(q = [], $).length) {
    for (var B = b2 && ~N.indexOf("\n"), G = false, J = 0; J < q.length; J++) {
      var K = q[J];
      if (null != K && false !== K) {
        var Q = m(K, n2, a2, true, "svg" === C2 || "foreignObject" !== C2 && _2, v2);
        if (b2 && !B && u(Q) && (B = true), Q) if (b2) {
          var X = Q.length > 0 && "<" != Q[0];
          G && X ? Z[Z.length - 1] += Q : Z.push(Q), G = X;
        } else Z.push(Q);
      }
    }
    if (b2 && B) for (var Y = Z.length; Y--; ) Z[Y] = "\n" + x2 + f(Z[Y], x2);
  }
  if (Z.length || D) N += Z.join("");
  else if (a2 && a2.xml) return N.substring(0, N.length - 1) + " />";
  return !z || q || D ? (b2 && ~N.indexOf("\n") && (N += "\n"), N = N + "</" + C2 + ">") : N = N.replace(/>$/, " />"), N;
}
var b = { shallow: true };
S.render = S;
var x = function(e, t2) {
  return S(e, t2, b);
}, k = [];
function S(n2, o2, i2) {
  o2 = o2 || {};
  var l2 = options.__s;
  options.__s = true;
  var a2, s2 = h$1(Fragment, null);
  return s2.__k = [n2], a2 = i2 && (i2.pretty || i2.voidElements || i2.sortAttributes || i2.shallow || i2.allAttributes || i2.xml || i2.attributeHook) ? m(n2, o2, i2) : F(n2, o2, false, void 0, s2), options.__c && options.__c(n2, k), options.__s = l2, k.length = 0, a2;
}
function w(e) {
  return null == e || "boolean" == typeof e ? null : "string" == typeof e || "number" == typeof e || "bigint" == typeof e ? h$1(null, null, e) : e;
}
function C(e, t2) {
  return "className" === e ? "class" : "htmlFor" === e ? "for" : "defaultValue" === e ? "value" : "defaultChecked" === e ? "checked" : "defaultSelected" === e ? "selected" : t2 && l.test(e) ? e.toLowerCase().replace(/^xlink:?/, "xlink:") : e;
}
function O(e, t2) {
  return "style" === e && null != t2 && "object" == typeof t2 ? p(t2) : "a" === e[0] && "r" === e[1] && "boolean" == typeof t2 ? String(t2) : t2;
}
var j = Array.isArray, A = Object.assign;
function F(r, n2, l2, a2, f2) {
  if (null == r || true === r || false === r || "" === r) return "";
  if ("object" != typeof r) return "function" == typeof r ? "" : s(r);
  if (j(r)) {
    var u2 = "";
    f2.__k = r;
    for (var c2 = 0; c2 < r.length; c2++) u2 += F(r[c2], n2, l2, a2, f2), r[c2] = w(r[c2]);
    return u2;
  }
  if (void 0 !== r.constructor) return "";
  r.__ = f2, options.__b && options.__b(r);
  var _2 = r.type, p2 = r.props;
  if ("function" == typeof _2) {
    var d2;
    if (_2 === Fragment) d2 = p2.children;
    else {
      d2 = _2.prototype && "function" == typeof _2.prototype.render ? function(e, r2) {
        var n3 = e.type, o2 = g(n3, r2), i2 = new n3(e.props, o2);
        e.__c = i2, i2.__v = e, i2.__d = true, i2.props = e.props, null == i2.state && (i2.state = {}), null == i2.__s && (i2.__s = i2.state), i2.context = o2, n3.getDerivedStateFromProps ? i2.state = A({}, i2.state, n3.getDerivedStateFromProps(i2.props, i2.state)) : i2.componentWillMount && (i2.componentWillMount(), i2.state = i2.__s !== i2.state ? i2.__s : i2.state);
        var l3 = options.__r;
        return l3 && l3(e), i2.render(i2.props, i2.state, i2.context);
      }(r, n2) : function(e, r2) {
        var n3, o2 = h(e, r2), i2 = g(e.type, r2);
        e.__c = o2;
        for (var l3 = options.__r, a3 = 0; o2.__d && a3++ < 25; ) o2.__d = false, l3 && l3(e), n3 = e.type.call(o2, e.props, i2);
        return n3;
      }(r, n2);
      var v2 = r.__c;
      v2.getChildContext && (n2 = A({}, n2, v2.getChildContext()));
    }
    var y2 = F(d2 = null != d2 && d2.type === Fragment && null == d2.key ? d2.props.children : d2, n2, l2, a2, r);
    return options.diffed && options.diffed(r), r.__ = void 0, options.unmount && options.unmount(r), y2;
  }
  var m2, b2, x2 = "<";
  if (x2 += _2, p2) for (var k2 in m2 = p2.children, p2) {
    var S2 = p2[k2];
    if (!("key" === k2 || "ref" === k2 || "__self" === k2 || "__source" === k2 || "children" === k2 || "className" === k2 && "class" in p2 || "htmlFor" === k2 && "for" in p2 || i.test(k2))) {
      if (S2 = O(k2 = C(k2, l2), S2), "dangerouslySetInnerHTML" === k2) b2 = S2 && S2.__html;
      else if ("textarea" === _2 && "value" === k2) m2 = S2;
      else if ((S2 || 0 === S2 || "" === S2) && "function" != typeof S2) {
        if (true === S2 || "" === S2) {
          S2 = k2, x2 = x2 + " " + k2;
          continue;
        }
        if ("value" === k2) {
          if ("select" === _2) {
            a2 = S2;
            continue;
          }
          "option" !== _2 || a2 != S2 || "selected" in p2 || (x2 += " selected");
        }
        x2 = x2 + " " + k2 + '="' + s(S2) + '"';
      }
    }
  }
  var H = x2;
  if (x2 += ">", i.test(_2)) throw new Error(_2 + " is not a valid HTML tag name in " + x2);
  var M = "", L = false;
  if (b2) M += b2, L = true;
  else if ("string" == typeof m2) M += s(m2), L = true;
  else if (j(m2)) {
    r.__k = m2;
    for (var T = 0; T < m2.length; T++) {
      var E = m2[T];
      if (m2[T] = w(E), null != E && false !== E) {
        var $ = F(E, n2, "svg" === _2 || "foreignObject" !== _2 && l2, a2, r);
        $ && (M += $, L = true);
      }
    }
  } else if (null != m2 && false !== m2 && true !== m2) {
    r.__k = [w(m2)];
    var D = F(m2, n2, "svg" === _2 || "foreignObject" !== _2 && l2, a2, r);
    D && (M += D, L = true);
  }
  if (options.diffed && options.diffed(r), r.__ = void 0, options.unmount && options.unmount(r), L) x2 += M;
  else if (o.test(_2)) return H + " />";
  return x2 + "</" + _2 + ">";
}
S.shallowRender = x;
var _jsxFileName$3 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/lib/render.tsx";
const SlotQueueContext = createContext(null);
class Render {
  constructor(provider) {
    __publicField(this, "_provider");
    this._provider = provider;
  }
  /**
   * Renders a container to a root element.
   * @param Container - The container to render.
   * @param props - The container parameters.
   * @returns A function to render the component to a root element.
   */
  render(Component, props) {
    return async (rootElement) => {
      var _a;
      if (!Component) throw new Error("Component is not defined");
      if (!rootElement) throw new Error("Root element is not defined");
      const initialData = await ((_a = Component.getInitialData) == null ? void 0 : _a.call(Component, props)) ?? {};
      const state = signal({
        ...props
      });
      const queue = signal(/* @__PURE__ */ new Set());
      const provider = this._provider;
      const Root = ({
        next
      }) => {
        return u$1(SlotQueueContext.Provider, {
          value: queue,
          children: u$1(VComponent, {
            node: provider,
            ...provider.props,
            children: u$1(Component, {
              ...next.value,
              initialData
            }, void 0, false, {
              fileName: _jsxFileName$3,
              lineNumber: 64,
              columnNumber: 15
            }, this)
          }, void 0, false, {
            fileName: _jsxFileName$3,
            lineNumber: 63,
            columnNumber: 13
          }, this)
        }, void 0, false, {
          fileName: _jsxFileName$3,
          lineNumber: 62,
          columnNumber: 11
        }, this);
      };
      rootElement.innerHTML = "";
      const tmp = document.createElement("div");
      rootElement.classList.add("dropin-design");
      render$1(u$1(Root, {
        next: state
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 79,
        columnNumber: 14
      }, this), tmp);
      const API = {
        remove: () => {
          render$1(null, tmp);
        },
        setProps: (cb) => {
          const next = cb(state.peek());
          state.value = next;
        }
      };
      return new Promise((resolve) => {
        queue.subscribe((pending) => {
          if (pending.size === 0) {
            rootElement.classList.add("dropin-design");
            rootElement.appendChild(tmp.firstChild ?? tmp);
            return resolve(API);
          }
        });
      });
    };
  }
  /**
   * UnRenders a component from a root element.
   * @param rootElement - The root element to unmount the component from.
   * @deprecated Use `remove` method from the returned object of the `mount` method instead.
   */
  unmount(rootElement) {
    var _a;
    if (!rootElement) throw new Error("Root element is not defined");
    (_a = rootElement.firstChild) == null ? void 0 : _a.remove();
  }
  /**
   * Renders a component to a string.
   * @param Component - The component to render.
   * @param props - The component props.
   * @param options - Optional rendering options.
   */
  async toString(Component, props, options2) {
    var _a;
    if (!Component) throw new Error("Component is not defined");
    const initialData = await ((_a = Component.getInitialData) == null ? void 0 : _a.call(Component, props)) ?? {};
    return S(u$1(VComponent, {
      node: this._provider,
      ...this._provider.props,
      children: u$1(Component, {
        ...props,
        initialData
      }, void 0, false, {
        fileName: _jsxFileName$3,
        lineNumber: 132,
        columnNumber: 9
      }, this)
    }, void 0, false, {
      fileName: _jsxFileName$3,
      lineNumber: 131,
      columnNumber: 7
    }, this), {}, {
      ...options2
    });
  }
}
const Dropin = {
  ExampleComponentName: {
    item: {
      label: "string"
    }
  },
  Pagination: {
    backwardButton: {
      ariaLabel: "Go to previous page"
    },
    forwardButton: {
      ariaLabel: "Go to next page"
    }
  },
  Incrementer: {
    decreaseLabel: "Decrease Quantity",
    increaseLabel: "Increase Quantity",
    label: "Quantity",
    errorMessage: "Enter a valid quantity",
    minQuantityMessage: "Enter at least {{minQuantity}}",
    maxQuantityMessage: "Maximum quantity is {{maxQuantity}}"
  },
  Modal: {
    Close: {
      label: "Close"
    }
  },
  InputPassword: {
    placeholder: "Password",
    floatingLabel: "Password",
    buttonShowTitle: "Click to show password",
    buttonHideTitle: "Click to hide password"
  },
  PasswordStatusIndicator: {
    chartTwoSymbols: "Use characters and numbers or symbols",
    chartThreeSymbols: "Use characters, numbers and symbols",
    chartFourSymbols: "Use uppercase characters, lowercase characters, numbers and symbols",
    messageLengthPassword: "At least {minLength} characters long"
  },
  InlineAlert: {
    dismissLabel: "Dismiss Alert"
  },
  PriceSummary: {
    subTotal: {
      label: "Subtotal",
      withTaxes: "Including taxes",
      withoutTaxes: "excluding taxes"
    },
    shipping: {
      label: "Shipping",
      editZipAction: "Apply",
      estimated: "Estimated Shipping",
      estimatedDestination: "Estimated Shipping to ",
      destinationLinkAriaLabel: "Change destination",
      zipPlaceholder: "Zip Code",
      withTaxes: "Including taxes",
      withoutTaxes: "excluding taxes",
      alternateField: {
        zip: "Estimate using country/zip",
        state: "Estimate using country/state"
      }
    },
    taxes: {
      total: "Tax Total",
      totalOnly: "Tax",
      breakdown: "Taxes",
      showBreakdown: "Show Tax Breakdown",
      hideBreakdown: "Hide Tax Breakdown",
      estimated: "Estimated Tax"
    },
    total: {
      estimated: "Estimated Total",
      label: "Total",
      withoutTax: "Total excluding taxes"
    }
  },
  ProgressSpinner: {
    updating: {
      label: "Item is updating"
    },
    updatingChildren: {
      label: "Items are updating"
    }
  },
  PriceRange: {
    from: {
      label: "From"
    },
    to: {
      label: "to"
    },
    asLowAs: {
      label: "As low as"
    }
  },
  Swatches: {
    outOfStock: {
      label: "out of stock swatch"
    },
    selected: {
      label: "swatch selected"
    },
    swatch: {
      label: "swatch"
    }
  },
  Accordion: {
    open: {
      label: "Open"
    },
    close: {
      label: "Close"
    }
  },
  CartItem: {
    each: {
      label: "each"
    },
    pricePerItem: {
      label: "price per item"
    },
    quantity: {
      label: "Quantity"
    },
    remove: {
      label: "Remove {product} from the cart"
    },
    removeDefault: {
      label: "Remove item from the cart"
    },
    taxIncluded: {
      label: "incl. VAT"
    },
    taxExcluded: {
      label: "excl. tax"
    },
    updating: {
      label: "{product} is updating"
    }
  },
  InputDate: {
    picker: "Select a date"
  }
};
const en_US$1 = {
  Dropin
};
const definition = {
  default: en_US$1,
  en_US: en_US$1
};
const getDefinitionByLanguage = (lang) => {
  return deepmerge(definition.default, definition[lang] || {});
};
var _jsxFileName$2 = "/Users/rafaljanicki/www/StorefrontSDK/packages/elsie/src/components/UIProvider/UIProvider.tsx";
const UIContext = createContext$1({
  locale: "en-US"
});
const UIProvider = ({
  lang = "en_US",
  langDefinitions: langDefinitions2 = {},
  children
}) => {
  const definitions = t(useMemo(() => {
    const selectedDefinitions = deepmerge(langDefinitions2.default, langDefinitions2[lang] ?? {});
    return deepmerge(
      getDefinitionByLanguage(lang),
      // SDK default definitions
      selectedDefinitions
      // Custom definitions
    );
  }, [lang, langDefinitions2]), "definitions");
  const locale = lang.replace("_", "-");
  return u$1(UIContext.Provider, {
    value: {
      locale
    },
    children: u$1(IntlProvider, {
      definition: definitions,
      children: u$1(Fragment, {
        children
      }, void 0, false)
    }, void 0, false, {
      fileName: _jsxFileName$2,
      lineNumber: 54,
      columnNumber: 7
    }, void 0)
  }, void 0, false, {
    fileName: _jsxFileName$2,
    lineNumber: 53,
    columnNumber: 5
  }, void 0);
};
new Render$1(u$1(UIProvider, {}, void 0, false, {
  fileName: _jsxFileName$2,
  lineNumber: 61,
  columnNumber: 36
}, void 0));
const Wishlist = {
  EmptyWishlist: {
    heading: "Your wishlist is empty",
    message: "Add items by clicking on the heart icon.",
    cta: "Start shopping"
  },
  Wishlist: {
    heading: "Wishlist {count}"
  },
  Alert: {
    addProduct: {
      heading: "Added to wishlist",
      message: "{product} has been added to your wishlist"
    },
    removeProduct: {
      heading: "Removed from wishlist",
      message: "{product} has been removed from your wishlist"
    },
    moveToCart: {
      heading: "Moved to cart",
      message: "{product} has been moved to your cart"
    },
    viewWishlist: "View wishlist"
  },
  Login: {
    sync: " to sync your saved items across all your devices.",
    logIn: "Log in"
  }
};
const ProductItem = {
  CartActionButton: "Move To Cart",
  TrashActionButton: "Remove this product from wishlist"
};
const en_US = {
  Wishlist,
  ProductItem
};
var _jsxFileName$1 = "/Users/rafaljanicki/www/storefront-wishlist/src/render/Provider.tsx";
const langDefinitions = {
  default: en_US
};
const Provider = ({
  children
}) => {
  const [lang, setLang] = t$1(useState("en_US"), "lang");
  useEffect(() => {
    const localeEvent = events.on("locale", (locale) => {
      setLang(locale);
    }, {
      eager: true
    });
    return () => {
      localeEvent == null ? void 0 : localeEvent.off();
    };
  }, []);
  return u$2(UIProvider, {
    lang,
    langDefinitions,
    children
  }, void 0, false, {
    fileName: _jsxFileName$1,
    lineNumber: 38,
    columnNumber: 5
  }, void 0);
};
var _jsxFileName = "/Users/rafaljanicki/www/storefront-wishlist/src/render/render.tsx";
const render = new Render(u$2(Provider, {}, void 0, false, {
  fileName: _jsxFileName,
  lineNumber: 4,
  columnNumber: 34
}, void 0));
export {
  render
};
//# sourceMappingURL=render.js.map
