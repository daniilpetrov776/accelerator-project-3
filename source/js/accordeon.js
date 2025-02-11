const accordionButtons = document.querySelectorAll('.accordeon-button');

const toggleAccordion = (button, parentContainer) => {
  const contentItem = parentContainer;
  const content = contentItem.querySelector('p');

  const isDisabled = button.classList.contains('accordeon-button--disabled') || button.hasAttribute('disabled');
  const isActive = button.classList.contains('accordeon-button--active') || contentItem.classList.contains('faq-accordeon__item--is-open');

  if (isDisabled) {
    return;
  }

  if (isActive) {
    button.classList.remove('accordeon-button--active');
    contentItem.classList.remove('faq-accordeon__item--is-open');
    content.style.maxHeight = '0';
  } else {
    button.classList.add('accordeon-button--active');
    contentItem.classList.add('faq-accordeon__item--is-open');
    content.style.maxHeight = `${content.scrollHeight}px`;
  }
};

const handleAccButtons = () => {
  accordionButtons.forEach((button) => {
    const parentContainer = button.closest('li');
    button.addEventListener('click', () => {
      toggleAccordion(button, parentContainer);
    });

    parentContainer.addEventListener('click', (evt) => {
      if (evt.target === button) {
        return;
      }
      toggleAccordion(button, parentContainer);
    });
  });
};

const setContentMaxHeight = () => {
  const openItems = document.querySelectorAll('.faq-accordeon__item--is-open');

  openItems.forEach((item) => {
    const content = item.querySelector('p');
    if (content) {
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
};


export const handleFaqControls = () => {
  setContentMaxHeight();
  handleAccButtons();
};
