import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';

let reviewsSwiper = null;

export const initReviewsSwiper = () => {
  if (!reviewsSwiper) {
    reviewsSwiper = new Swiper('.reviews-swiper', {
      direction: 'horizontal',
      modules: [Scrollbar],
      init: true,
      navigation: {
        nextEl: '.reviews__button-next',
        prevEl: '.reviews__button-prev',
      },
      scrollbar: {
        el: '.reviews__scrollbar',
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
          const containerWidth = scrollbar.el.clientWidth;
          const dragWidth = scrollbar.dragEl.clientWidth;
          const maxTranslate = containerWidth - dragWidth;

          const computedStyle = window.getComputedStyle(scrollbar.dragEl);
          const matrix = computedStyle.transform;
          let translateX = 0;
          if (matrix && matrix !== 'none') {
            const matrixValues = matrix.match(/matrix\(([^,]+),[^,]+,[^,]+,[^,]+,([^,]+),/);
            if (matrixValues && matrixValues.length >= 3) {
              translateX = parseFloat(matrixValues[2]);
            }
          }

          let progress = translateX / maxTranslate;
          progress = Math.max(0, Math.min(1, progress));

          const totalWidth = swiper.virtualSize;
          const translate = -progress * (totalWidth - swiper.width);
          swiper.setTranslate(translate);
        },
      },
      breakpoints: {
        1440: {
          slidesPerView: 2,
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
          slidesPerView: 1,
          spaceBetween: 20,
          centeredSlides: false,
          slideToClickedSlide: false,
        },
      },
    });
  } else {
    if (reviewsSwiper) {
      reviewsSwiper.update();
    }
  }
};
