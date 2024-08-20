import { events } from '@dropins/tools/event-bus.js';

export default function Actions(ctx)
{
    const SpecialMessage = document.createElement('div');
    
    SpecialMessage.classList.add('SpecialMessageText');
    SpecialMessage.innerHTML = `<span data-test-id="ShippingMessage__OrderText"></span> 
                                to receive <em data-test-id="ShippingMessage__DeliveryEstimate"></em>`;
    
    ctx.prependSibling(SpecialMessage);

    const mobileResponsive = document.createElement('div');
    mobileResponsive.classList.add('mobile-responsive-section');

    ctx.prependSibling(mobileResponsive);
    

    ctx.appendButton((next,state) => {
        const adding = state.get('adding');
        const addingSpinner = `<div class="loadingSpinner"></div>`;

        return{
            type: 'submit',
            innerHTML: adding ? addingSpinner : 'Add to Cart',
            className: adding ? 'loading' : '',
            onClick: async () => 
            {
                state.set('adding',true);
                console.log('Add to Cart clicked');
            }
        }
    });

    ctx.appendButton(() => {
        return {
            innerHTML: "Add to Wishlist",
            variant: "Primary",
            className: "wish-list-button",
            onClick: async () => 
            {
                console.log('Add to Wishlist clicked');
            }
        };
    });

    /* TODO: make counter of shipping message dynamic
    https://www.youtube.com/watch?v=mmD7LWeM9TY */
    
    events.on('eds/lcp', () => {

        const cartButton  = document.querySelector(".pdp-product__buttons > button:nth-child(1)");
        cartButton.classList.add("add-to-cart");

        document.querySelector(".mobile-responsive-section").append(cartButton);

        const deadline = new Date();
        
        //setting the time that a user has left to have same day delivery
        deadline.setHours(17);

        const x = setInterval(function(){
            var now = new Date().getTime();

            //get distance between deadline and current time
            var distance = deadline - now;

            //convert the distance into hours and minutes
            var hours = Math.floor((distance % (1000*60*60*24))/(1000*60*60));
            var minutes = Math.floor((distance % (1000*60*60))/(1000*60));
            
            if(hours > 0)
            {
                document.querySelector(`[data-test-id='ShippingMessage__OrderText']`).innerHTML = "Order within " + hours + " hours " + minutes + " mins";
            }        
            else
            {
                document.querySelector(`[data-test-id='ShippingMessage__OrderText']`).innerHTML = "Order within " + minutes + " mins";
            }

            if(distance <= 0)
            {
                document.querySelector(`[data-test-id='ShippingMessage__OrderText']`).innerHTML = "Order Now";
            }

            const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            const day = weekday[tomorrow.getDay()];
            const month = months[tomorrow.getMonth()];

            document.querySelector(`[data-test-id='ShippingMessage__DeliveryEstimate']`).innerHTML = day + " " + tomorrow.getDate() + " " + month;
        });
    });
}