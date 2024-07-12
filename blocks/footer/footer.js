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

  //adding a subscribe div to the footer first section

  document.querySelector(".footer-one").innerHTML += 
  `
    <div class="sub-form">
        <form name="mail_mini_form" action="/mail" method="GET">
            <div>
              <label id="mail-lbl" for="email">EMAIL ADDRESS</label><br>
              <input id="mail" name="mail" type="email" placeholder="" size="40"/>
              <button class="sign-up" type="button">SIGN UP</button>
            </div>
        <form/>
        <div class="socials">
            <svg id="instagram" fill="rgb(217, 50, 117)" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="169.063px" height="169.063px" viewBox="0 0 169.063 169.063" style="enable-background:new 0 0 169.063 169.063;"
              xml:space="preserve">
              <a href="https://www.instagram.com/endclothing/" rel="noreferrer noopener" target="_blank" aria-label="Visit our Instagram page">
                <g>
                  <path d="M122.406,0H46.654C20.929,0,0,20.93,0,46.655v75.752c0,25.726,20.929,46.655,46.654,46.655h75.752
                                        c25.727,0,46.656-20.93,46.656-46.655V46.655C169.063,20.93,148.133,0,122.406,0z M154.063,122.407
                                        c0,17.455-14.201,31.655-31.656,31.655H46.654C29.2,154.063,15,139.862,15,122.407V46.655C15,29.201,29.2,15,46.654,15h75.752
                                        c17.455,0,31.656,14.201,31.656,31.655V122.407z" />
                  <path d="M84.531,40.97c-24.021,0-43.563,19.542-43.563,43.563c0,24.02,19.542,43.561,43.563,43.561s43.563-19.541,43.563-43.561
                                        C128.094,60.512,108.552,40.97,84.531,40.97z M84.531,113.093c-15.749,0-28.563-12.812-28.563-28.561
                                        c0-15.75,12.813-28.563,28.563-28.563s28.563,12.813,28.563,28.563C113.094,100.281,100.28,113.093,84.531,113.093z" />
                  <path d="M129.921,28.251c-2.89,0-5.729,1.17-7.77,3.22c-2.051,2.04-3.23,4.88-3.23,7.78c0,2.891,1.18,5.73,3.23,7.78
                                        c2.04,2.04,4.88,3.22,7.77,3.22c2.9,0,5.73-1.18,7.78-3.22c2.05-2.05,3.22-4.89,3.22-7.78c0-2.9-1.17-5.74-3.22-7.78
                                        C135.661,29.421,132.821,28.251,129.921,28.251z" />
                </g>
              </a>
            </svg>
            <svg id="twitter" viewBox="328 355 335 276" xmlns="http://www.w3.org/2000/svg">
              <a href="https://twitter.com/endclothing?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5E" rel="noreferrer noopener" target="_blank" aria-label="Visit our Twitter page">
                  <path d="
                    M 630, 425 A 195, 195 0 0 1 331, 600 A 142, 142 0 0 0 428, 570 A  70,  70 0 0 1 370, 523 A  70,  70 0 0 0 401, 521
                    A  70,  70 0 0 1 344, 455 A  70,  70 0 0 0 372, 460 A  70,  70 0 0 1 354, 370 A 195, 195 0 0 0 495, 442
                    A  67,  67 0 0 1 611, 380 A 117, 117 0 0 0 654, 363 A  65,  65 0 0 1 623, 401 A 117, 117 0 0 0 662, 390 A  65,  65 0 0 1 630, 425 Z"/>
              </a>
            </svg>
            <svg id="facebook" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.0" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" style="null" class="icon icons8-Facebook-Filled" >    
              <a href="https://www.facebook.com/END-112066392160743/" rel="noreferrer noopener" target="_blank" aria-label="Visit our Facebook page">  
                <path d="M40,0H10C4.486,0,0,4.486,0,10v30c0,5.514,4.486,10,10,10h30c5.514,0,10-4.486,10-10V10C50,4.486,45.514,0,
                  40,0z M39,17h-3 c-2.145,0-3,0.504-3,2v3h6l-1,6h-5v20h-7V28h-3v-6h3v-3c0-4.677,1.581-8,7-8c2.902,0,6,1,6,1V17z" />
              </a>
            </svg>
          </div>
    </div>
    `;

    //adding the End logo next to the terms and condition menus
    document.querySelector(".footer-three").innerHTML += 
    `<div id="footer-logo">
        <svg viewBox="0 0 123 45" xmlns="http://www.w3.org/2000/svg" class=""><defs>
          <path d="M0 44.83h123.537V0H0z"></path></defs><path fill="currentColor" d="M0 0v44.83h24.167v-7.575H8.595V25.458h11.398v-7.576H8.595V7.575h14.948V0zM57.488 
            0v26.575h-.124L45.405 0H36v44.83h7.848V15.896h.123l13.143 28.936h8.222V0zM80 0h11.958c9.842 0 15.323 4.222 15.696 15.523v13.784c-.373 11.3-5.854 15.523-15.696
            15.523H80V0zm8.595 37.255h2.99c4.734 0 7.474-2.235 7.474-8.94V16.516c0-6.334-2.118-8.942-7.474-8.942h-2.99v29.68zM114 44.817h8.844V36H114z" fill-rule="evenodd">
          </path>
        </svg>
      </div>`;


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