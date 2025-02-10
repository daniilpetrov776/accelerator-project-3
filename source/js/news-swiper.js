import Swiper from 'swiper';
import { Grid } from 'swiper/modules';

const paginationContainer = document.querySelector('.news-swiper__pagination');

let newsSwiper = null;

const swapSecondAndThirdSlides = () => {
  if (window.innerWidth >= 320 && window.innerWidth < 768) {
    const container = document.querySelector('.news-swiper .swiper-wrapper');
    if (!container) {
      return;
    }

    const slides = Array.from(container.children);
    if (slides.length < 3) {
      return;
    } // Проверяем, что слайдов хотя бы 3

    // Меняем местами 2-й и 3-й слайд
    container.insertBefore(slides[2], slides[1]);
  }
};

const updateSlideHeights = (swiper) => {
  if (window.innerWidth >= 320 && window.innerWidth < 768) {
    const slidesArray = Array.from(swiper.slides);

    swiper.slides.forEach((slide, index) => {
      if (index % 4 === 0 || index % 4 === 1) {
        slide.style.height = '330px';
        slide.style.marginTop = '0';
      } else {
        slide.style.height = '240px';
        slide.style.marginTop = '20px';
      }
    });

    const reorderedSlides = [];

    for (let i = 0; i < slidesArray.length; i += 4) {
      if (slidesArray[i]) {
        reorderedSlides.push({ slide: slidesArray[i], tabindex: i + 1 });
      }
      if (slidesArray[i + 2]) {
        reorderedSlides.push({ slide: slidesArray[i + 2], tabindex: i + 2 });
      }
      if (slidesArray[i + 1]) {
        reorderedSlides.push({ slide: slidesArray[i + 1], tabindex: i + 3 });
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
  // const bullets = paginationContainer.querySelectorAll('.news-swiper__pagination-bullet');
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

  const bullets = document.querySelectorAll('.news-swiper__pagination-bullet');
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
    const bullet = document.querySelector(`.news-swiper__pagination-bullet--${i - 1}`);
    if (bullet) {
      bullet.style.display = 'inline-block';
    }
  });
};

const updateSlideWidths = (swiper) => {
  if (window.innerWidth >= 1440) {
    const slides = swiper.slides;
    const slidesPerGroup = swiper.params.slidesPerGroup;
    if (slides.length > 0) {
      slides.forEach((slide, index) => {
        // Сначала убираем класс у всех слайдов
        slide.classList.remove('news-swiper-slide--bigger');

        // Если индекс слайда кратен slidesPerGroup, значит это первый слайд группы
        if (index % slidesPerGroup === 0) {
          slide.classList.add('news-swiper-slide--bigger');
        }
      });
      swiper.update();
    }
  }
};

export const initNewsSwiper = () => {
  if (!newsSwiper) {
    swapSecondAndThirdSlides();
    newsSwiper = new Swiper('.news-swiper', {
      direction: 'horizontal',
      modules: [Grid],
      init: true,
      navigation: {
        nextEl: '.news-swiper__button-next',
        prevEl: '.news-swiper__button-prev',
      },
      pagination: {
        el: '.news-swiper__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return `<span class="${className} news-swiper__pagination-bullet news-swiper__pagination-bullet--${index}"
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
          spaceBetween: 20,
          grid: {
            rows: 2,
            fill: 'column'
          }
        },
      },
      on: {
        init: function () {
          updateSlideHeights(this);
          updateSlideWidths(this);
          updatePagination(this);
          changeStandardActivePaginationClass('news-swiper__pagination-bullet--active');
        },
        resize: function () {
          updateSlideHeights(this);
          updateSlideWidths(this);
          updatePagination(this);
        },
        slideChange: function() {
          updatePagination(this);
          changeStandardActivePaginationClass('news-swiper__pagination-bullet--active');
        }
      }
    });
  } else {
    if (newsSwiper) {
      newsSwiper.destroy(true, true);
      newsSwiper = null;
    }
  }
};
