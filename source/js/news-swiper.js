import Swiper from 'swiper';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';

const paginationContainer = document.querySelector('.news__pagination');

let newsSwiper = null;
// let currentBreakpoint = null;
// const originalSlides = [];

// const swapSecondAndThirdSlides = () => {
//   if (window.innerWidth >= 320 && window.innerWidth < 768) {
//     const container = document.querySelector('.news-swiper .swiper-wrapper');
//     if (!container) {
//       return;
//     }

//     const swiperSslides = Array.from(container.children);
//     if (swiperSslides.length < 3) {
//       return;
//     } // Проверяем, что слайдов хотя бы 3

//     // Меняем местами 2-й и 3-й слайд
//     container.insertBefore(swiperSslides[2], swiperSslides[1]);
//   }
// };

// const saveSlidesOrder = (swiper) => {
//   originalSlides = Array.from(swiper.slides).map((slide) => slide.cloneNode(true));
// };

// const getBreakpoint = () => {
//   if (window.innerWidth >= 1440) {
//     return 'desktop';
//   }
//   if (window.innerWidth >= 320 && window.innerWidth < 768) {
//     return 'mobile';
//   }
//   return 'tablet';
// };

const updateSlideHeights = (swiper) => {
  if (window.innerWidth >= 320 && window.innerWidth < 768) {
    swiper.slides.forEach((slide, index) => {
      const isOdd = index % 2 !== 0;

      slide.style.height = isOdd ? '240px' : '330px';
      slide.style.marginTop = isOdd ? '20px' : '0';
    });

    const reorderedSlides = [];
    const slidesArray = Array.from(swiper.slides);

    for (let i = 0; i < slidesArray.length; i += 4) {
      if (slidesArray[i]) {
        reorderedSlides.push({ slide: slidesArray[i], tabindex: i + 1 });
      }
      if (slidesArray[i + 1]) {
        reorderedSlides.push({ slide: slidesArray[i + 1], tabindex: i + 2 });
      }
      if (slidesArray[i + 2]) {
        reorderedSlides.push({ slide: slidesArray[i + 2], tabindex: i + 3 });
      }
      if (slidesArray[i + 3]) {
        reorderedSlides.push({ slide: slidesArray[i + 3], tabindex: i + 4 });
      }
    }

    reorderedSlides.forEach(({ slide, tabindex }) => {
      slide.setAttribute('tabindex', tabindex);
    });
  }
};

const changeStandardActivePaginationClass = (customActiveClass) => {
  const bullets = paginationContainer.querySelectorAll('.swiper-pagination-bullet');
  const standardActive = paginationContainer.querySelector('.swiper-pagination-bullet-active');
  bullets.forEach((bullet) => {
    bullet.classList.remove(customActiveClass);
  });
  standardActive?.classList.add(customActiveClass);
};

const updatePagination = (swiper) => {
  let totalGroups;
  const totalSlides = swiper.slides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup;
  if (window.innerWidth < 1440) {
    totalGroups = (Math.ceil(totalSlides / slidesPerGroup) / 2);
  } else {
    totalGroups = Math.ceil(totalSlides / slidesPerGroup);
  }
  const currentGroup = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;

  const prevGroup = (typeof swiper.prevGroup !== 'undefined') ? swiper.prevGroup : currentGroup;
  const direction = currentGroup > prevGroup ? 'forward' : 'backward';
  swiper.prevGroup = currentGroup;

  const bullets = document.querySelectorAll('.news__pagination-bullet');
  bullets.forEach((bullet) => {
    bullet.style.display = 'none';
  });

  let visibleIndexes = [];

  if (totalGroups <= 4) {
    visibleIndexes = Array.from({ length: totalGroups }, (_, i) => i + 1);
  } else {
    let start;
    if (direction === 'forward') {
      start = currentGroup - 2;
    } else {
      start = currentGroup - 1;
    }

    if (start < 1) {
      start = 1;
    }
    if (start + 3 >= totalGroups) {
      start = Math.max(1, totalGroups - 3);
    }

    visibleIndexes = [start, start + 1, start + 2, start + 3];
  }

  visibleIndexes.forEach((i) => {
    const bullet = document.querySelector(`.news__pagination-bullet--${i - 1}`);
    if (bullet) {
      bullet.style.display = 'inline-block';
    }
  });
};

let lastSavedCurrentGroup = 0;

const updateSlideWidths = (swiper) => {
  if (window.innerWidth >= 1440) {
    const slides = swiper.slides;
    const slidesPerGroup = swiper.params.slidesPerGroup;
    if (slides.length > 0) {
      slides.forEach((slide, index) => {

        slide.classList.remove('news-swiper-slide--bigger');

        if (index % slidesPerGroup === 0) {
          slide.classList.add('news-swiper-slide--bigger');
        }
      });
      swiper.update();
    }
  }
};

// const restoreSlides = () => {
//   const container = document.querySelector('.news-swiper .swiper-wrapper');
//   if (!container || originalSlides.length === 0) {
//     return;
//   }

//   // Удаляем все текущие слайды
//   container.innerHTML = '';

//   // Восстанавливаем исходный порядок из сохраненных слайдов
//   originalSlides.forEach((slide) => {
//     container.appendChild(slide.cloneNode(true)); // Клонируем для избежания ссылочных зависимостей
//   });

//   // Обновляем структуру свайпера
//   if (newsSwiper) {
//     newsSwiper.updateSlides(); // Обновляем внутреннюю коллекцию слайдов
//     newsSwiper.slideTo(0); // Сбрасываем позицию
//     newsSwiper.updateProgress(); // Обновляем прогресс
//     newsSwiper.updateSize(); // Пересчитываем размеры
//     newsSwiper.updateSlidesClasses(); // Обновляем CSS-классы

//     // Дополнительные обновления из обработчиков
//     updateSlideHeights(newsSwiper);
//     updateSlideWidths(newsSwiper);
//     updatePagination(newsSwiper);
//   }
// };

// const handleResponsiveSlides = (swiper) => {
//   const newBreakpoint = getBreakpoint();
//   if (newBreakpoint !== currentBreakpoint) {
//     if (newBreakpoint === 'desktop') {
//       restoreSlides();
//       swiper.update();
//     } else if (newBreakpoint === 'tablet') {
//       swapSecondAndThirdSlides();
//       swiper.update();
//     }
//     currentBreakpoint = newBreakpoint;
//   }
// };


export const initNewsSwiper = () => {
  if (!newsSwiper) {
    newsSwiper = new Swiper('.news-swiper', {
      direction: 'horizontal',
      modules: [Grid],
      init: true,
      initialSlide: lastSavedCurrentGroup,
      navigation: {
        nextEl: '.news__button-next',
        prevEl: '.news__button-prev',
      },
      pagination: {
        el: '.news__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} news__pagination-bullet news__pagination-bullet--${index}"
            aria-label="Перейти к слайду ${index + 1}."
            role="button"
            data-order="${index + 1}"
            >
            </span>`;
        },
      },
      breakpoints: {
        1440: {
          slidesPerView: 'auto',
          spaceBetween: 32,
          slidesPerGroup: 3,
          simulateTouch: false,
          height: 400,
          grid: {
            rows: 1,
            fill: 'column'
          }
        },
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: 30,
          grid: {
            rows: 2,
            columns: 2,
            fill: 'row'
          }
        },
        320: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: 20,
          grid: {
            rows: 2,
            fill: 'column'
          }
        },
      },
      on: {
        init: function () {
          // saveSlidesOrder(this);
          // handleResponsiveSlides(this);
          updateSlideWidths(this);
          updatePagination(this);
          changeStandardActivePaginationClass('news__pagination-bullet--active');
          updateSlideHeights(this);
        },
        resize: function () {
          this.destroy();
          newsSwiper = null;
        },
        slideChange: function() {
          updatePagination(this);
          changeStandardActivePaginationClass('news__pagination-bullet--active');
          lastSavedCurrentGroup = this.activeIndex;
        }
      }
    });
  }
};

