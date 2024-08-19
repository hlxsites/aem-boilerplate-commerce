//Creating Elements
const oldPrice = document.createElement('span');
oldPrice.classList.add('old-price');

export default function RegularPrice(ctx)
{
    ctx.prependChild(oldPrice);

    ctx.onChange((next) => {
        oldPrice.innerHTML = next?.dictionary?.PDP?.Price?.Was?.label || 'old-price';
    });
}