const specialPrice = document.createElement('span');

//slot
export default function SpecialPrice(ctx)
{
    ctx.appendSibling(specialPrice);

    ctx.onChange(() => {
        specialPrice.innerHTML = "test";
    });
}