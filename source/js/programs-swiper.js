import Swiper from 'swiper';

let programsSwiper = null;

export const initProgramsSwiper = () => {
  if (!programsSwiper) {
    programsSwiper = new Swiper('.programs-swiper', {
      direction: 'horizontal',
      slidesPerView: 3,
      spaceBetween: 32,
      init: true,
      navigation: {
        nextEl: '.programs__button-next',
        prevEl: '.programs__button-next',
      },
      scrollbar: {
        el: '.programs__scrollbar',
        draggable: true, // разрешить перетаскивание
        snapOnRelease: true, // привязка к слайдам при отпускании
        dragSize: 'auto', // размер "хвата" скроллбара
      },
      breakpoints: {
        1440: {
          slidesPerView: 3,
          spaceBetween: 32,
          centeredSlides: false,
          slideToClickedSlide: false,
        },
        768: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: false,
          slideToClickedSlide: false,
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
      programsSwiper.destroy(true, true);
      programsSwiper = null;
    }
  }
};
