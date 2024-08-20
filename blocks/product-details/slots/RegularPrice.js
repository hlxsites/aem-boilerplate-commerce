//Creating Elements
const wasPrice = document.createElement('span');

export default function RegularPrice(ctx)
{
    ctx.prependChild(wasPrice);

    ctx.onChange((next) => {
        // wasPrice.classList.add('was-price');
        // wasPrice.innerHTML = next?.dictionary?.PDP?.Was?.label || 'Was';
        // console.log("test");
    });
}