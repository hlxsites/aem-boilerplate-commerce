/**
 * "completeCheckout" is a Commerce event available when it's installed the
 * Data Connection extension. The data this event collects is sent to the Adobe
 * Experience Platform edge.
 *
 * This is a Storefront event that collects anonymized behavioral data from the
 * shoppers as they browse the site. The data this event collects can be used
 * to create promotions and campaigns targeted to a specific set of shoppers.
 * Storefront event data includes simple and configurable products only.
 *
 * "completeCheckout" is triggered when the shopper places an order.
 *
 * The code access directly the Adobe Client Data Layer (ACDL) package instead
 * of using the Adobe Commerce Events SDK package, because the ACDL reduces the
 * effort to instrument websites by providing a standardized method to expose
 * and access any kind of data for any script. It consists of a JavaScript
 * client-side event-driven data store that can be used on web pages:
 *
 * - to collect data about what the visitors experience on the web page
 * - to communicate this data to digital analytics and reporting servers
 *
 * @param {string} orderId The order ID generated when placed the order.
 * @returns {void}
 *
 * Data Connection Events documentation @see https://experienceleague.adobe.com/docs/commerce-merchant-services/data-connection/event-forwarding/events.html?lang=en#completecheckout
 * Adobe Commerce Events SDK GitHub repo @see https://github.com/adobe/commerce-events
 * Adobe Client Data Layer documentation @see https://github.com/adobe/adobe-client-data-layer/wiki
 * Adobe Client Data Layer GitHub repo @see https://github.com/adobe/adobe-client-data-layer
 */
export declare function completeCheckout(orderId: string): void;
//# sourceMappingURL=completeCheckout.d.ts.map