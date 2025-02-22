const tabsList = document.querySelector('.tabs__list');
const tabs = document.querySelectorAll('.tabs__button');

// const handleTabsClick = () => {
//   tabsList.addEventListener('click', (evt) => {
//     if (tabsList.contains(evt.target)) {
//       tabs.forEach((tab) => {
//         tab.classList.remove('tabs__button--active');
//       });
//       evt.target.classList.add('tabs__button--active');
//     }
//   });
// };

const handleTabsClick = () => {
  tabsList.addEventListener('click', (evt) => {
    // Проверяем, что клик был по элементу с классом 'tabs__button'
    if (evt.target.classList.contains('tabs__button')) {
      tabs.forEach((tab) => {
        tab.classList.remove('tabs__button--active');
      });
      evt.target.classList.add('tabs__button--active');
    }
  });
};

export const handleTabsInteractions = () => {
  handleTabsClick();
};
