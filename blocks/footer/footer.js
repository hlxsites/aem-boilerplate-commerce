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

    // append social icons to the form div
    document.querySelector(".footer-one .form-wrapper").innerHTML += 
    `<span class="socials">
        <a href="https://www.instagram.com/endclothing/"><img class="social-icons" data-icon-name="instagram" src="/icons/instagram.svg" alt="" loading="lazy"></a>
        <a href="https://x.com/endclothing?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5E"><img class="social-icons" data-icon-name="twitter" src="/icons/twitter.svg" alt="" loading="lazy"></a>
        <a href="https://www.facebook.com/people/END/100064815875933/"><img class="social-icons" data-icon-name="facebook" src="/icons/facebook.svg" alt="" loading="lazy"></a>
    </span>`;


    // //change styling of signup button on text input - work in progress
    // const mail = document.getElementById("mail");
    // const signupBtn = document.getElementsByClassName("sign-up");
    // //const text = document.forms["mail-mini-form"]["mail"].value;

    // mail.addEventListener('input',function(){
    //   signupBtn[0].style.backgroundColor = "black";
    //   signupBtn[0].style.color = "white";
    //   signupBtn[0].style.cursor = "pointer";
    //   //console.log(text);
    // });
}