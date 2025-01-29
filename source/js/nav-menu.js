const navMenu = document.querySelector('.navigation-menu');
const submenuButtons = navMenu.querySelectorAll('.navigation-menu__submenu-button');
// const submenuList = navMenu.querySelectorAll('.navigation-menu__submenu-list');
const navButton = document.querySelector('.nav-button');

const handleNavButtonClick = () => {
  navButton.classList.toggle('nav-button--opened');
};

let overflowTimeout;

const handleOverflowVisibility = (list) => {
  if (list.classList.contains('navigation-menu__submenu-list--is-open')) {
    overflowTimeout = setTimeout(() => {
      list.classList.add('navigation-menu__submenu-list--is-overflow-visible');
    }, 300);
  } else {
    clearTimeout(overflowTimeout);
    list.classList.remove('navigation-menu__submenu-list--is-overflow-visible');
  }
};

const closeSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-closed');
  list.classList.add('navigation-menu__submenu-list--is-open');
  handleOverflowVisibility(list);
  setTimeout(list.style.marginTop = '0', 300);
};

const openSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-open');
  list.classList.add('navigation-menu__submenu-list--is-closed');
  handleOverflowVisibility(list);
  list.style.marginTop = '20px';
  console.log('открыт')
};


const handleSubMenuToggle = (evt) => {
  // Проверяем, был ли клик на одной из кнопок submenuButtons
  if ([...submenuButtons].includes(evt.target)) {
    const sibling = evt.target.nextElementSibling;
    if (sibling && sibling.classList.contains('navigation-menu__submenu-list')) {
      if (sibling.classList.contains('navigation-menu__submenu-list--is-open')) {
        openSubmenu(sibling);
      } else {
        closeSubmenu(sibling);
      }
    }
  }
};

export const handlenavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
  navMenu.addEventListener('click', handleSubMenuToggle);

};
