const specialPrice = document.createElement('span');
specialPrice.classList.add("price-special");

//slot
export default function SpecialPrice(ctx)
{
    ctx.appendSibling(specialPrice);

    ctx.onChange((next) => {
        specialPrice.innerHTML = next.data?.prices?.final?.amount;
    });
}