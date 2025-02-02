import Swiper from 'swiper/bundle';

const changeStandardActivePaginationClass = (customActiveClass) => {
  const bullets = document.querySelectorAll('.hero-swiper__pagination-bullet');
  const standardActive = document.querySelector('.swiper-pagination-bullet-active');
  bullets.forEach((bullet) => {
    bullet.classList.remove(customActiveClass);
  });
  standardActive?.classList.add(customActiveClass);
};

// const updatePaginationPosition = (swiperInstance, update) => {
//   const pagination = document.querySelector('.hero-swiper__pagination');
//   const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
//   const textContainer = activeSlide.querySelector('.hero-swiper__content-wrapper');

//   if (textContainer) {
//     const textContainerHeight = textContainer.offsetHeight;
//     const padding = parseFloat(window.getComputedStyle(activeSlide).paddingBottom);

//     if (update === true) {
//       // Сначала скройте пагинацию
//       pagination.classList.add('hero-swiper__pagination--fade-out');

//       // Через 300 мс обновите позицию и покажите снова
//       setTimeout(() => {
//         pagination.style.bottom = `${textContainerHeight + padding}px`;
//         pagination.classList.remove('hero-swiper__pagination--fade-out');
//       }, 100);
//     } else {
//       // Если `update` не равен `true`, просто обновите позицию
//       pagination.style.bottom = `${textContainerHeight + padding}px`;
//     }
//   }
// };

let isInitialized = false;

let previousBottomPosition = null;

const updatePaginationPosition = (swiperInstance, update) => {
  const pagination = document.querySelector('.hero-swiper__pagination');
  const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
  const textContainer = activeSlide.querySelector('.hero-swiper__content-wrapper');

  if (textContainer) {
    const textContainerHeight = textContainer.offsetHeight;
    const padding = parseFloat(window.getComputedStyle(activeSlide).paddingBottom);
    const currentBottomPosition = textContainerHeight + padding - 1;

    if (update === true) {
      if (previousBottomPosition !== currentBottomPosition) {
        pagination.classList.add('hero-swiper__pagination--fade-out');

        setTimeout(() => {
          pagination.style.bottom = `${currentBottomPosition}px`;
          pagination.classList.remove('hero-swiper__pagination--fade-out');
          previousBottomPosition = currentBottomPosition;
        }, 50);
      }
    } else {
      pagination.style.bottom = `${currentBottomPosition}px`;
      previousBottomPosition = currentBottomPosition;
    }
  }
};

const heroSwiper = new Swiper('.hero-swiper', {
  loop: true,
  init: false,
  autoplay: false,
  keyboard: {
    enabled: false,
  },
  simulateTouch: false,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  breakpoints: {
    1440: {
      allowTouchMove: false,
    }
  },
  pagination: {
    el: '.hero-swiper__pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} hero-swiper__pagination-bullet hero-swiper__pagination-bullet--${index}"
        aria-label="Перейти к слайду ${index + 1}."
        role="button">
        </span>`;
    },
  },
  on: {
    init: function() {
      changeStandardActivePaginationClass('hero-swiper__pagination-bullet--active');
      updatePaginationPosition(this, false);
      isInitialized = true;
    },
    slideChange: function() {
      changeStandardActivePaginationClass('hero-swiper__pagination-bullet--active');
      if (isInitialized) {
        updatePaginationPosition(this, true);
      }
    }
  }
});

heroSwiper.init();
