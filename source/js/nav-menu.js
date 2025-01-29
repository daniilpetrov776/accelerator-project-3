const navMenu = document.querySelector('.navigation-menu');
const navButton = document.querySelector('.nav-button');
const submenuButtons = document.querySelectorAll('.navigation-menu__submenu-button');
// const submenuList = navMenu.querySelectorAll('.navigation-menu__submenu-list');

const updateElementHeight = (element) => {
  element.style.maxHeight = `${element.scrollHeight}px`;
};

let overflowTimeout;

// const handleOverflowVisibility = (list) => {
//   if (list.classList.contains('navigation-menu__submenu-list--is-open')) {
//     overflowTimeout = setTimeout(() => {
//       list.classList.add('navigation-menu__submenu-list--is-overflow-visible');
//     }, 300);
//   } else {
//     clearTimeout(overflowTimeout);
//     list.classList.remove('navigation-menu__submenu-list--is-overflow-visible');
//   }
// };

const handleOverflowVisibility = (element) => {
  let isOpenClass, overflowVisibleClass;

  if (element.classList.contains('navigation-menu__submenu-list')) {
    // Элемент - это подменю
    isOpenClass = 'navigation-menu__submenu-list--is-open';
    overflowVisibleClass = 'navigation-menu__submenu-list--is-overflow-visible';
  } else if (element.classList.contains('navigation-menu')) {
    // Элемент - это основное меню
    isOpenClass = 'navigation-menu--is-opened';
    overflowVisibleClass = 'navigation-menu--is-overflow-visible';
  } else {
    return; // Если не подпадает под известные классы, выходим из функции
  }

  if (element.classList.contains(isOpenClass)) {
    overflowTimeout = setTimeout(() => {
      element.classList.add(overflowVisibleClass);
    }, 300);
  } else {
    clearTimeout(overflowTimeout);
    element.classList.remove(overflowVisibleClass);
  }
};

const closeMenu = () => {
  navMenu.classList.remove('navigation-menu--is-opened');
  navMenu.classList.add('navigation-menu--is-closed');
  navMenu.style.maxHeight = 0;
  handleOverflowVisibility(navMenu);
};

const openMenu = () => {
  navMenu.classList.remove('navigation-menu--is-closed');
  navMenu.classList.add('navigation-menu--is-opened');
  updateElementHeight(navMenu);
  handleOverflowVisibility(navMenu);
};

const closeSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-open');
  list.classList.add('navigation-menu__submenu-list--is-closed');
  list.style.maxHeight = 0;
  handleOverflowVisibility(list);
};

const openSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-closed');
  list.classList.add('navigation-menu__submenu-list--is-open');
  updateElementHeight(list);
  handleOverflowVisibility(list);
};

const handleSubMenuToggle = (evt) => {
  const sibling = evt.target.nextElementSibling;
  if (sibling && sibling.classList.contains('navigation-menu__submenu-list')) {
    if (sibling.classList.contains('navigation-menu__submenu-list--is-open')) {
      closeSubmenu(sibling);
    } else {
      openSubmenu(sibling);
    }
  }
};

const toggleNavButton = () => {
  navButton.classList.toggle('nav-button--opened');
};


const handleNavButtonClick = () => {
  toggleNavButton();
  if (navMenu.classList.contains('navigation-menu--is-opened')) {
    closeMenu();
  } else {
    openMenu();
  }
};

export const handlenavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
  submenuButtons.forEach((button) => button.addEventListener('click', handleSubMenuToggle));
};
