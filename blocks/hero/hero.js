export default function decorate(block) 
{
  
    //Christopher - Search
    const searchIconSecion = document.querySelector(
      `.hero > div > div > :has(span)`
    );

    const inputField = document.createElement("input");
    inputField.setAttribute("type","text");
    inputField.setAttribute("id","search-help-input");
    inputField.setAttribute("size","1000");
    inputField.setAttribute("maxlength","1000");
    inputField.setAttribute("placeholder","Search articles");

    if(searchIconSecion != null)
    {
      searchIconSecion.appendChild(inputField);
    }
  }