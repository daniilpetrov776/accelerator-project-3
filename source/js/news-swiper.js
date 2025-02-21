import Swiper from 'swiper';
import 'swiper/css/grid';
import { Grid } from 'swiper/modules';

const paginationContainer = document.querySelector('.news__pagination');

let newsSwiper = null;
let lastSavedCurrentGroup = 0;

const updateSlideHeights = (swiper) => {
  if (window.innerWidth >= 320 && window.innerWidth < 768) {
    swiper.slides.forEach((slide, index) => {
      const isOdd = index % 2 !== 0;

      slide.style.height = isOdd ? '240px' : '330px';
      slide.style.marginTop = isOdd ? '20px' : '0';
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
  const totalSlides = swiper.slides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup;
  let totalGroups;

  const groups = Math.ceil(totalSlides / slidesPerGroup);
  if (window.matchMedia('(max-width: 1439px)').matches) {
    totalGroups = Math.ceil(groups / 2);
  } else {
    totalGroups = groups;
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

    if (start + 3 > totalGroups) {
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
          changeStandardActivePaginationClass('news__pagination-bullet--active');
          updatePagination(this);
          lastSavedCurrentGroup = this.activeIndex;
        }
      }
    });
  }
};

