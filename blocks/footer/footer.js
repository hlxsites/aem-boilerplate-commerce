import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);


    document.querySelector(".footer-one .form-wrapper").innerHTML += 
    `<span class="socials">
        <img class="social-icons" data-icon-name="instagram" src="/icons/instagram.svg" alt="" loading="lazy">
        <img class="social-icons" data-icon-name="twitter" src="/icons/twitter.svg" alt="" loading="lazy">
        <img class="social-icons" data-icon-name="facebook" src="/icons/facebook.svg" alt="" loading="lazy">
    </span>`;

      /*adding svgs icons to the giftcards and apps
      references used:
      https://www.w3schools.com/howto/howto_js_add_class.asp
      https://developer.mozilla.org/en-US/docs/Web/API/Element/prepend */

      const footerTwoLastColumn = document.getElementById("our-apps").parentElement;
      footerTwoLastColumn.classList.add("Column-4-Icons");

      const ourAppsText = document.getElementById("our-apps");
      const giftcardsText = document.getElementById("gift-cards");
      const ourAppsDiv = document.createElement("div");
      const giftCardDiv = document.createElement("div");

      ourAppsDiv.setAttribute('id','our-apps-icon');
      giftCardDiv.setAttribute('id','gift-cards-icon');

      footerTwoLastColumn.append(ourAppsDiv);
      footerTwoLastColumn.append(giftCardDiv);


      ourAppsDiv.append(ourAppsText);
      giftCardDiv.append(giftcardsText);

      const ourAppsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><g fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                            <g transform="translate(-132 -707)"><g><g><g transform="translate(132 707)"><g>
                            <path fill="#221E20" d="M8 0h24a8 8 0 018 8v24a8 8 0 01-8 8H8a8 8 0 01-8-8V8a8 8 0 018-8z"></path>
                            <g fill="#FFF" transform="translate(7 15)"><g fill-rule="nonzero">
                            <path d="M0 10L0 0 5.22865854 0 5.22865854 1.68992586 1.90984321 1.68992586 
                            1.90984321 3.98822503 4.44033101 3.98822503 4.44033101 5.67815089 1.90984321 5.67815089 1.90984321 8.31007414 5.36585366 8.31007414 5.36585366 10z">
                            </path>
                            <path d="M8.04878049 10L8.04878049 0 10.1269578 0 12.7685617 5.92891409 12.796733 5.92891409 12.796733 0 14.5325203 0 14.5325203 10 12.7143861 
                            10 9.81057209 3.54557348 9.78240077 3.54557348 9.78240077 10z"></path><path d="M19.54 8.306h.642c1.034 0 1.631-.499 1.631-1.994V3.684c0-1.413-.462-1.995-1.63-1.995h-.643v6.617zM17.663 
                            0h2.611c2.14 0 3.346.942 3.425 3.461V6.54C23.618 9.059 22.415 10 20.274 10h-2.611V0z">
                            </path>
                            <path d="M25.4878049 8L27.5 8 27.5 10 25.4878049 10z"></path></g></g></g></g></g></g></g></g>
                          </svg>`;

      const giftCardsSvg = `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                              <g fill="none" fill-rule="evenodd">
                              <path d="M32 .25c2.14 0 4.078.867 5.48 2.27A7.726 7.726 0 0139.75 8h0v24c0 2.14-.867 
                              4.078-2.27 5.48A7.726 7.726 0 0132 39.75h0H8a7.726 7.726 0 01-5.48-2.27A7.726 7.726 0 01.25 32h0V8c0-2.14.867-4.078 2.27-5.48A7.726 7.726 0 018 .25h0z" 
                              stroke="#979797" stroke-width=".5" fill="#FFF"></path><path d="M30 12a2 2 0 012 2v12a2 2 0 01-2 2H10a2 2 0 01-2-2V14a2 2 0 012-2h20zm1 7H9v7a1 1 0 00.883.993L10 
                              27h20a1 1 0 00.993-.883L31 26v-7zm-9 5v1H11v-1h11zm5 0v1h-3v-1h3zm3-11H10a1 1 0 00-.993.883L9 14v2h22v-2a1 1 0 00-.883-.993L30 13z" fill="#1A1A1A" fill-rule="nonzero"></path>
                              </g>
                            </svg>`;

      ourAppsDiv.innerHTML += ourAppsSvg;
      giftCardDiv.innerHTML += giftCardsSvg;

      //change styling of signup button on text input - work in progress
      const mail = document.getElementById("mail");
      const signupBtn = document.getElementsByClassName("sign-up");
      //const text = document.forms["mail-mini-form"]["mail"].value;

      mail.addEventListener('input',function(){
        signupBtn[0].style.backgroundColor = "black";
        signupBtn[0].style.color = "white";
        signupBtn[0].style.cursor = "pointer";
        //console.log(text);
      });
  }