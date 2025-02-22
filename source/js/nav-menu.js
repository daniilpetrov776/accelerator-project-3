const navMenu = document.querySelector('.navigation-menu');
const navButton = document.querySelector('.nav-button');
const submenuButtons = document.querySelectorAll('.navigation-menu__submenu-button');
const submenuLists = document.querySelectorAll('.navigation-menu__submenu-list');
const overlay = document.querySelector('.page-overlay');

const NAV_MENU_OFFSET = 70;

const updateNavMenuItemsTabIndex = () => {
  const navLinks = document.querySelectorAll('.navigation-menu__link');
  navLinks.forEach((link) => {
    if (navMenu.classList.contains('navigation-menu--is-opened')) {
      link.setAttribute('tabindex', '0');
    } else {
      link.setAttribute('tabindex', '-1');
    }
  });
  submenuButtons.forEach((button) => {
    if (navMenu.classList.contains('navigation-menu--is-opened')) {
      button.setAttribute('tabindex', '0');
    } else {
      button.setAttribute('tabindex', '-1');
    }
  });
};

const updateListLinksTabIndex = () => {
  submenuLists.forEach((list) => {
    const submenuLinks = list.querySelectorAll('.navigation-menu__submenu-link');
    submenuLinks.forEach((link) => {
      if (navMenu.classList.contains('navigation-menu--is-opened') && list.classList.contains('navigation-menu__submenu-list--is-open')) {
        link.setAttribute('tabindex', '0');
      } else {
        link.setAttribute('tabindex', '-1');
      }
    });
  });
};

const handleNavMenuTabIndexUpdates = () => {
  updateListLinksTabIndex();
  updateNavMenuItemsTabIndex();
};

const updateListHeight = (list) => {
  list.style.maxHeight = `${list.scrollHeight}px`;
};

const updateMenuHeight = (element = null) => {
  requestAnimationFrame(() => {
    const additionalHeight = element ? element.scrollHeight : 0;
    navMenu.style.maxHeight = `${navMenu.scrollHeight + NAV_MENU_OFFSET + additionalHeight}px`;
  });
};

const setOverlay = () => {
  overlay.classList.add('page-overlay--active');
};

const removeOverlay = () => {
  overlay.classList.remove('page-overlay--active');
};


const handleOverflowVisibility = (element) => {
  if (element.classList.contains('navigation-menu')) {
    const overflowVisibleClass = 'navigation-menu--is-overflow-visible';
    if (element.classList.contains('navigation-menu--is-opened')) {
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
      }
      element._overflowTimeout = setTimeout(() => {
        element.classList.remove(overflowVisibleClass);
        element._overflowTimeout = null;
      }, 300);
    } else {
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
        element._overflowTimeout = null;
      }
      element.classList.remove(overflowVisibleClass);
    }
  } else if (element.classList.contains('navigation-menu__submenu-list')) {
    const overflowVisibleClass = 'navigation-menu__submenu-list--is-overflow-visible';
    if (element.classList.contains('navigation-menu__submenu-list--is-open')) {
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
      }
      element._overflowTimeout = setTimeout(() => {
        element.classList.add(overflowVisibleClass);
        element._overflowTimeout = null;
      }, 300);
    } else {
      if (element._overflowTimeout) {
        clearTimeout(element._overflowTimeout);
        element._overflowTimeout = null;
      }
      element.classList.remove(overflowVisibleClass);
    }
  }
};

const handleEscKey = (evt) => {
  if (evt.key === 'Escape' && navMenu.classList.contains('navigation-menu--is-opened')) {
    closeMenu();
    removeOverlay();
  }
};

function closeMenu () {
  navMenu.classList.remove('navigation-menu--is-opened');
  navMenu.classList.add('navigation-menu--is-closed');
  navMenu.style.maxHeight = 0;
  navButton.classList.remove('nav-button--opened');
  handleOverflowVisibility(navMenu);
  updateNavMenuItemsTabIndex();
  updateListLinksTabIndex();
  document.removeEventListener('keydown', handleEscKey);
}

const openMenu = () => {
  navMenu.classList.remove('navigation-menu--is-overflow-visible');
  navMenu.classList.remove('navigation-menu--is-closed');
  navMenu.classList.add('navigation-menu--is-opened');
  navButton.classList.add('nav-button--opened');
  updateMenuHeight();
  handleOverflowVisibility(navMenu);
  updateNavMenuItemsTabIndex();
  updateListLinksTabIndex();
  document.addEventListener('keydown', handleEscKey);
};

const closeSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-open');
  list.classList.add('navigation-menu__submenu-list--is-closed');
  list.style.maxHeight = 0;
  requestAnimationFrame(() => {
    updateMenuHeight();
    handleOverflowVisibility(list);
    updateListLinksTabIndex();
  });
};

const openSubmenu = (list) => {
  list.classList.remove('navigation-menu__submenu-list--is-overflow-visible');
  list.classList.remove('navigation-menu__submenu-list--is-closed');
  list.classList.add('navigation-menu__submenu-list--is-open');
  updateListHeight(list);
  requestAnimationFrame(() => {
    updateMenuHeight(list);
    handleOverflowVisibility(list);
    updateListLinksTabIndex();
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

const handleNavButtonClick = () => {
  if (navMenu.classList.contains('navigation-menu--is-opened')) {
    closeMenu();
    removeOverlay();
  } else {
    openMenu();
    setOverlay();
  }
};

const handleNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__link')) {
    document.querySelectorAll('.navigation-menu__link').forEach((link) => {
      link.classList.remove('navigation-menu__link--active');
    });
    evt.target.classList.add('navigation-menu__link--active');
    removeOverlay();
    closeMenu();
  }
};

const handleSubNavLinkClick = (evt) => {
  if (evt.target.classList.contains('navigation-menu__submenu-link')) {
    document.querySelectorAll('.navigation-menu__submenu-link').forEach((link) => {
      link.classList.remove('navigation-menu__submenu-link--active');
    });
    evt.target.classList.add('navigation-menu__submenu-link--active');
    removeOverlay();
    closeMenu();
  }
};

export const handleNavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
  submenuButtons.forEach((button) => button.addEventListener('click', handleSubMenuToggle));
  navMenu.addEventListener('click', handleNavLinkClick);
  navMenu.addEventListener('click', handleSubNavLinkClick);
  overlay.addEventListener('click', closeMenu);
  handleNavMenuTabIndexUpdates();
};
