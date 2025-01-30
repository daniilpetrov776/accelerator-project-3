const navMenu = document.querySelector('.navigation-menu');
const navButton = document.querySelector('.nav-button');
const submenuButtons = document.querySelectorAll('.navigation-menu__submenu-button');
const submenuLists = document.querySelectorAll('.navigation-menu__submenu-list');
const overlay = document.querySelector('.page-overlay');

const updateNavMenuItemsTabIndex = () => {
  const navLinks = document.querySelectorAll('.navigation-menu__link');
  navLinks.forEach((link) => {
    if (navMenu.classList.contains('navigation-menu--is-opened')) {
      link.setAttribute('tabindex', '0');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
};

const updatelListLinksTabIndex = (list) => {
  const submenuLinks = list.querySelectorAll('.navigation-menu__submenu-link');
  submenuLinks.forEach((link) => {
    if (list.classList.contains('navigation-menu__submenu-list--is-open')) {
      link.setAttribute('tabindex', '0');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
};

const handleNavMenuTabIndexUpdates = () => {
  submenuLists.forEach((list) => updatelListLinksTabIndex(list));
  updateNavMenuItemsTabIndex();
};


const updateListHeight = (list) => {
  list.style.maxHeight = `${list.scrollHeight}px`;
};

const updateMenuHeight = (element = null) => {
  requestAnimationFrame(() => {
    const additionalHeight = element ? element.scrollHeight : 0;
    navMenu.style.maxHeight = `${navMenu.scrollHeight + 70 + additionalHeight}px`;
  });
};

let overflowTimeout;

const handleOverflowVisibility = (element) => {
  let isOpenClass, overflowVisibleClass;

  if (element.classList.contains('navigation-menu__submenu-list')) {
    isOpenClass = 'navigation-menu__submenu-list--is-open';
    overflowVisibleClass = 'navigation-menu__submenu-list--is-overflow-visible';
  } else if (element.classList.contains('navigation-menu')) {
    isOpenClass = 'navigation-menu--is-opened';
    overflowVisibleClass = 'navigation-menu--is-overflow-visible';
  } else {
    return;
  }

  if (element.classList.contains(isOpenClass)) {
    clearTimeout(overflowTimeout);
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
  updateNavMenuItemsTabIndex();
};

const openMenu = () => {
  navMenu.classList.remove('navigation-menu--is-closed');
  navMenu.classList.add('navigation-menu--is-opened');
  updateMenuHeight();
  handleOverflowVisibility(navMenu);
  updateNavMenuItemsTabIndex();
};

const closeSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-open');
  list.classList.add('navigation-menu__submenu-list--is-closed');
  list.style.maxHeight = 0;
  requestAnimationFrame(() => {
    updateMenuHeight();
    handleOverflowVisibility(list);
    updatelListLinksTabIndex(list);
  });
};

const openSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-closed');
  list.classList.add('navigation-menu__submenu-list--is-open');
  updateListHeight(list);
  requestAnimationFrame(() => {
    updateMenuHeight(list);
    handleOverflowVisibility(list);
    updatelListLinksTabIndex(list);
  });
};

const handleSubMenuToggle = (evt) => {
  const submenubutton = evt.target;
  const sibling = evt.target.nextElementSibling;
  if (sibling && sibling.classList.contains('navigation-menu__submenu-list')) {
    if (sibling.classList.contains('navigation-menu__submenu-list--is-open')) {
      closeSubmenu(sibling);
      submenubutton.classList.remove('navigation-menu__submenu-button--active');
    } else {
      openSubmenu(sibling);
      submenubutton.classList.add('navigation-menu__submenu-button--active');
    }
  }
};

const toggleNavButton = () => {
  navButton.classList.toggle('nav-button--opened');
  overlay.classList.toggle('page-overlay--active');
};


const handleNavButtonClick = () => {
  toggleNavButton();
  if (navMenu.classList.contains('navigation-menu--is-opened')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const handleNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__link')) {
    document.querySelectorAll('.navigation-menu__link').forEach((link) => {
      link.classList.remove('navigation-menu__link--active');
    });
    evt.target.classList.add('navigation-menu__link--active');
  }
};

const handleSubNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__submenu-link')) {
    document.querySelectorAll('.navigation-menu__submenu-link').forEach((link) => {
      link.classList.remove('navigation-menu__submenu-link--active');
    });
    evt.target.classList.add('navigation-menu__submenu-link--active');
  }
};

export const handleNavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
  submenuButtons.forEach((button) => button.addEventListener('click', handleSubMenuToggle));
  navMenu.addEventListener('click', handleNavLinkClick);
  navMenu.addEventListener('click', handleSubNavLinkClick);
  handleNavMenuTabIndexUpdates();
};
