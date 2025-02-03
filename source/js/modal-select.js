const modal = document.querySelector('.modal');
const modalSelect = modal.querySelector('.select-input');
const selectOptions = modal.querySelector('.select__options');
const fakeSelect = modal.querySelector('.select-element');
const selectOptionItems = modal.querySelectorAll('.select__option');
const form = modal.querySelector('.modal__form');

const openSelect = () => {
  selectOptions.classList.add('select__options--is-open');
};

const closeSelect = () => {
  selectOptions.classList.remove('select__options--is-open');
};

const setSelectFocus = () => {
  modalSelect.focus();
  console.log('focus')
};

const setSelectValue = (evt) => {
  // console.log(evt.target)
  if (evt.target.classList.contains('select__option')) {
    // console.log('asda');
    modalSelect.setAttribute('value', evt.target.textContent);
    closeSelect();
  }
};

// const setSelectValue = (evt) => {
//   console.log(evt.target)
//   // Ищем ближайшего родителя с классом .select__option
//   const option = evt.target.closest('.select__option');
//   // Если клик был не по опции или по элементу вне списка, выходим
//   if (!option) {
//     return;
//   }
//   // Устанавливаем значение инпута. Можно использовать modalSelect.value, что предпочтительнее.
//   modalSelect.value = option.textContent.trim();
//   closeSelect();
// };

const setupSelectListeners = () => {
  modalSelect.addEventListener('focus', openSelect);
  // modalSelect.addEventListener('focusout', closeSelect);
  fakeSelect.addEventListener('click', setSelectFocus);
  modalSelect.addEventListener('focusout', () => {
    setTimeout(() => {
      closeSelect();
    }, 100); // Небольшая задержка, чтобы дать время клику по опции
  });
  form.addEventListener('click', setSelectValue);
};

export const handleSelectOptionsVisibility = () => {
  setupSelectListeners();
};
