import Swiper from 'swiper/bundle';
import { Mousewheel, FreeMode } from 'swiper/modules';
// import'swiper/css/bundle';

let tabsSwiper = null;

export const initTabsSwiper = () => {
  if (!tabsSwiper) {
    tabsSwiper = new Swiper('.news__tabs', {
      direction: 'horizontal',
      modules: [Mousewheel, FreeMode],
      init: true,
      watchOverflow: true,
      mousewheel: true,
      freeMode: true,
      slidesPerView: 'auto',
      spaceBetween: 12,
      breakpoints: {
        1440: {
          spaceBetween: 0,
        },
        768: {
          spaceBetween: 10,
        },
        320: {

        },
      },
    });
  }
};
