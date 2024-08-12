import { events } from '@dropins/tools/event-bus.js';

export default function Actions(ctx)
{
    const SpecialMessage = document.createElement('div');
    SpecialMessage.classList.add('SpecialMessageText');
    SpecialMessage.innerHTML = `<span data-test-id="ShippingMessage__OrderText"></span> 
                                to receive <em data-test-id="ShippingMessage__DeliveryEstimate"></em>`;

    ctx.appendChild(SpecialMessage);

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
    events.on('eds/lcp', () => {
        const deadline = new Date();
        
        deadline.setHours(17);

        const x = setInterval(function(){
            var now = new Date().getTime();

            var distance = deadline - now;
            // var distance = 0;

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

        });

        const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const day = weekday[tomorrow.getDay()];
        const month = months[tomorrow.getMonth()];

        document.querySelector(`[data-test-id='ShippingMessage__DeliveryEstimate']`).innerHTML = day + " " + tomorrow.getDate() + " " + month;
    });
}