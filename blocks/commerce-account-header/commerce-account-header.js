import { Header, provider as UI } from '@dropins/tools/components.js';
import { readBlockConfig } from '../../scripts/aem.js';

export default async function decorate(block) {
  const {
    title = 'My account',
  } = readBlockConfig(block);

  const navigation = [...block.querySelectorAll(':scope > div')]
    ?.find((div) => div.querySelector(':scope > div').textContent?.toLowerCase() === 'navigation')
    ?.querySelector(':scope > div + div')

  block.innerHTML = '';

  await UI.render(Header, { title })(block);

  if (navigation) {
    navigation.classList.add('commerce-account-header-navigation');

    navigation.querySelectorAll('li').forEach((li) => {
      if (!li.querySelector('a')) {
        li.classList.add('commerce-account-header-navigation--current');
      }
    });

    block.appendChild(navigation);
  }
}
