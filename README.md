# Edge  Delivery Services + Adobe Commerce Boilerplate (Experimental)

This project boilerplate is for Edge Delivery Services projects that integrate with Adobe Commerce.

## Environments

- Preview: https://main--{repo}--{owner}.hlx.page/
- Live: https://main--{repo}--{owner}.hlx.live/

## Pre-requisites

Out of the box, this project template uses a pre-configured Adobe Commerce environment. If you want to use your own Adobe Commerce environment, you'll need to update the `configs.xlsx` file in your content repository to have values that match your environment.

Additionally, you need to have the following modules and customizations installed on your environment:

1. magento/magento-extra-graphql: Commerce module required for Cart and Checkout Drop-Ins.
1. magento/module-data-services-graphql: Commerce module with functionality necessary for adding context to events.
1. magento/module-page-builder-product-recommendations: Commerce module required for PRex Widget
1. magento/module-visual-product-recommendations: Commerce module required for PRex Widget
<!-- 1. TODO: Add further prereqs.  -->

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
1. Add your Adobe Commerce SaaS configuration in the `configs.xlsx` sheet in your content repository.
1. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)
