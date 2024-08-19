//Creating Elements
const wasPrice = document.createElement('span');
wasPrice.classList.add('was-price');

export default function RegularPrice(ctx)
{
    ctx.appendChild(wasPrice);

    ctx.onChange(() => {
        wasPrice.innerHTML = 'test';
        console.log("test");
    });
}