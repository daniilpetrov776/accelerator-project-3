import { handleSelectOptionsVisibility } from './modal-select';
import { formatPhoneNumber, validateInput, validatePhone, validateName } from './utils';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.page-overlay');
const modalOpenButton = document.querySelector('.about__button');
const modalCloseButton = document.querySelector('.modal__close-button');
const form = modal.querySelector('.modal__form');
const formInputs = form.querySelectorAll('.modal__input');
const nameInput = form.querySelector('.modal__input--name');
const phoneInput = form.querySelector('.modal__input--phone');

const clearFormFields = () => {
  window.addEventListener('beforeunload', () => {
    if (form) {
      form.reset();
    }
  });
};

const openModal = () => {
  modal.classList.add('modal--is-open');
  overlay.classList.add('page-overlay--active');
};

const closeModal = () => {
  modal.classList.remove('modal--is-open');
  overlay.classList.remove('page-overlay--active');
};

const onFormSubmit = (evt) => {
  let isFormValid = true;
  let firstInvalidInput = null;

  formInputs.forEach((input) => {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');

    if (!input.validity.valid) {
      input.classList.add('modal__input--error');
      isFormValid = false;
    }
  });

  if (!validateInput(phoneInput, validatePhone, 'Пожалуйста, введите номер телефона в указанном формате: +7 (000)-000-00-00.')) {
    isFormValid = false;
    if (!firstInvalidInput) {
      firstInvalidInput = phoneInput;
    }
  }
  if (!validateInput(nameInput, validatePhone, 'Пожалуйста, укажите имя в латинице или кирилице без цифр.')) {
    isFormValid = false;
    if (!firstInvalidInput) {
      firstInvalidInput = phoneInput;
    }
  }

  if (firstInvalidInput) {
    firstInvalidInput.reportValidity();
  }

  formInputs.forEach((input) => {
    if (!input.value) {
      input.classList.add('modal__input--error');
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    evt.preventDefault();
  }

};

const handleInputEvent = (evt) => {
  const input = evt.target;

  if (input.value.length === 0) {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
    return;
  }

  if (input === nameInput && validateName(input.value)) {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
  } else if (input === phoneInput && validatePhone(input.value)) {
    input.classList.remove('modal__input--error');
    input.setCustomValidity('');
  }
};

const addInputListeners = (input, events, handler) => {
  events.forEach((event) => input.addEventListener(event, handler));
};

const setupSubmitHandler = () => {
  form.addEventListener('submit', onFormSubmit);
};


const handleInputsChange = () => {
  formInputs.forEach((input) => {
    addInputListeners(input, ['input', 'focus', 'change'], handleInputEvent);
  });
};

const attachFormListeners = () => {
  handleInputsChange();
  clearFormFields();
};


const handleModalVisibility = () => {
  modalOpenButton.addEventListener('click', openModal);
  modalCloseButton.addEventListener('click', closeModal);
};

export const handleFormValidation = () => {
  handleModalVisibility();
  setupSubmitHandler();
  attachFormListeners();
  formatPhoneNumber(phoneInput);
  handleSelectOptionsVisibility();
};
