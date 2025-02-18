import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

let programsSwiper = null;

export const initProgramsSwiper = () => {
  if (!programsSwiper) {
    programsSwiper = new Swiper('.programs-swiper', {
      direction: 'horizontal',
      modules: [Scrollbar],
      slidesPerView: 3,
      spaceBetween: 32,
      init: true,
      navigation: {
        nextEl: '.programs__button-next',
        prevEl: '.programs__button-prev',
      },
      scrollbar: {
        el: '.programs__scrollbar',
        draggable: true,
        snapOnRelease: true,
        dragSize: 'auto',
      },
      on: {
        slideChange: function () {
          const scrollbar = this.scrollbar;
          const progress = this.progress;
          const containerWidth = scrollbar.el.clientWidth;
          const dragWidth = scrollbar.dragEl.clientWidth;
          const maxTranslate = containerWidth - dragWidth;
          scrollbar.dragEl.style.transform = `translate3d(${progress * maxTranslate}px, 0, 0)`;
        },
        scrollbarDragMove: function (swiper) {
          const scrollbar = swiper.scrollbar;
          const computedStyle = window.getComputedStyle(scrollbar.dragEl);
          const matrix = computedStyle.transform;
          let translateX = 0;
          if (matrix && matrix !== 'none') {
            // Получаем значение translateX из матрицы вида "matrix(a, b, c, d, tx, ty)"
            const matrixValues = matrix.match(/matrix\(([^,]+),[^,]+,[^,]+,[^,]+,([^,]+),/);
            if (matrixValues && matrixValues.length >= 3) {
              translateX = parseFloat(matrixValues[2]);
            }
          }
          const containerWidth = scrollbar.el.clientWidth;
          const dragWidth = scrollbar.dragEl.clientWidth;
          const maxTranslate = containerWidth - dragWidth;
          let progress = translateX / maxTranslate;
          progress = Math.max(0, Math.min(1, progress));
          const slideIndex = Math.round(progress * (swiper.slides.length - 1));
          swiper.slideTo(slideIndex, 300, false);
        },
      },
      breakpoints: {
        1440: {
          slidesPerView: 'auto',
          spaceBetween: 32,
          centeredSlides: false,
          slideToClickedSlide: false,
          simulateTouch: false,
          scrollbar: {
            dragSize: 394,
          }
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: false,
          slideToClickedSlide: false,
          scrollbar: {
            dragSize: 326,
          }
        },
        320: {
          slidesPerView: 'auto',
          spaceBetween: 10,
          centeredSlides: false,
          slideToClickedSlide: false,
        },
      },
    });
  } else {
    if (programsSwiper) {
      programsSwiper.update();
    }
  }
};
