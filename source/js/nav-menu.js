// const navMenu = document.querySelector('.navigation-menu');
const navButton = document.querySelector('.nav-button');


const handleNavButtonClick = () => {
  navButton.classList.toggle('nav-button--opened');
};

export const handlenavMenuControls = () => {
  navButton.addEventListener('click', handleNavButtonClick);
};
