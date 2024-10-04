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

    const getAppHero = document.querySelector(`.our-apps-hero > div > div`);

    const appsNewDiv = document.createElement("div")
    appsNewDiv.setAttribute("id","apps-icons");

    const googlePlayIcon = document.createElement("div");
    googlePlayIcon.setAttribute("id","google-play");
    const appleStoreIcon = document.createElement("div");
    appleStoreIcon.setAttribute("id","apple-store")

    if(getAppHero != null)
    {
      getAppHero.appendChild(appsNewDiv);
      appsNewDiv.appendChild(googlePlayIcon);
      appsNewDiv.appendChild(appleStoreIcon);

      document.getElementById('google-play').addEventListener('click', function () {
        window.location.href = 'https://play.google.com/store/apps/details?id=com.endclothing.endroid';
      });
  
      document.getElementById('apple-store').addEventListener('click', function () {
        window.location.href = 'https://apps.apple.com/gb/app/end/id1132649509';
      });
    }

    


}