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
  const bullets = paginationContainer.querySelectorAll('.news-swiper__pagination-bullet');
  const standardActive = paginationContainer.querySelector('.swiper-pagination-bullet-active');
  bullets.forEach((bullet) => {
    bullet.classList.remove(customActiveClass);
  });
  standardActive?.classList.add(customActiveClass);
};

const updatePagination = (swiper) => {
  const totalSlides = swiper.slides.length;
  const slidesPerGroup = swiper.params.slidesPerGroup;
  const totalGroups = Math.ceil(totalSlides / slidesPerGroup);
  const currentGroup = Math.floor(swiper.activeIndex / slidesPerGroup) + 1;

  const bullets = document.querySelectorAll('.news-swiper__pagination-bullet');

  bullets.forEach((bullet) => (bullet.style.display = 'none')); // Скрываем все кнопки

  let visibleIndexes = [];

  if (totalGroups <= 4) {
    visibleIndexes = Array.from({ length: totalGroups }, (_, i) => i + 1);
  } else if (currentGroup <= 3) {
    visibleIndexes = [1, 2, 3, 4];
  } else if (currentGroup >= totalGroups - 2) {
    visibleIndexes = [totalGroups - 3, totalGroups - 2, totalGroups - 1, totalGroups];
  } else {
    visibleIndexes = [currentGroup - 1, currentGroup, currentGroup + 1, currentGroup + 2];
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
    if (slides.length > 0) {
      slides.forEach((slide, index) => {
        // Сначала удаляем класс у всех
        slide.classList.remove('news-swiper-slide--bigger');

        // Добавляем класс "bigger" к первому слайду каждой группы из трех
        if (index % 3 === 0) {
          slide.classList.add('news-swiper-slide--bigger');
        }
      });
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
          changeStandardActivePaginationClass('news-swiper__pagination-bullet--active');
          updateSlideWidths(this);
          updatePagination(this);
        },
        resize: function () {
          updateSlideHeights(this);
          updateSlideWidths(this);
          updatePagination(this);
        },
        slideChange: function() {
          changeStandardActivePaginationClass('news-swiper__pagination-bullet--active');
          updatePagination(this);
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
