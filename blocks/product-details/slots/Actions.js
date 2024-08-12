export default function Actions(ctx)
{
    const SpecialMessage = document.createElement('div');
    SpecialMessage.classList.add('SpecialMessageText');
    SpecialMessage.innerHTML = `<span data-test-id="ShippingMessage__OrderText">Order within 1 Hours 6 Minutes</span> 
                                to receive <em data-test-id="ShippingMessage__DeliveryEstimate">Mon 12 Aug</em>`;

    ctx.replaceWith(SpecialMessage);

    ctx.appendButton(() => {
        return{
            text: "Add to Cart"
        }
    });

    ctx.appendButton((next, state) => {
        return {
            text: "Add to Wishlist",
            variant: "Primary"
        };
    });
    
    // TODO: make counter of shipping message dynamic
}