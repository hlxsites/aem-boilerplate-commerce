import { events } from '@dropins/tools/event-bus.js';

export default function InfoContent(ctx)
{
    const tabs = document.createElement('div');
    ctx.appendChild(tabs);

    const ContentWrapper = document.createElement('div');
    ctx.appendChild(ContentWrapper);

    /* 
        tabs handling of the pdp description
        https://www.youtube.com/watch?v=nlOmgBHnLqQ
    */
    events.on('eds/lcp', () => {
        tabs.classList.add('tabs-index');
        ContentWrapper.classList.add('content-wrapper');
        
        //tab index
        tabs.innerHTML = `<button class="tab-button active">Description</button>
                          <button class="tab-button">Specifications</button>
                          <div class="line"></div>`;

        //creating classes to be able to style them
        const all_tabs = document.querySelectorAll('.tab-button');
        const all_content = document.querySelectorAll('.tab-content');

        //onclick event to show different attributes
        all_tabs.forEach((tab,index) => {
            tab.addEventListener('click',(e) => {
                all_tabs.forEach(tab => {tab.classList.remove('active')});
                tab.classList.add('active');

                var line = document.querySelector('.line');
                line.style.width = e.target.offsetWidth + "px";
                line.style.left = e.target.offsetLeft + "px";
                
                all_content.forEach(content => {content.classList.remove('active')});
                all_content[index].classList.add('active');
            });
        });
    });

    //adding more classes and appending content to the respective tab sections
    ctx.onChange(() => {
        const description = document.querySelector('.pdp-product__description');
        const attributes = document.querySelector('.pdp-product__attributes');
        
        description.classList.add('tab-content');
        attributes.classList.add('tab-content');
        description.classList.add('active');

        ContentWrapper.appendChild(description);
        ContentWrapper.appendChild(attributes);
    });
}

