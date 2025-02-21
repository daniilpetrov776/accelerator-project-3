import { initHeroSwiper } from './hero-swiper';
import { initProgramsSwiper } from './programs-swiper';
import { initTabsSwiper } from './tabs-swiper';
import { initNewsSwiper } from './news-swiper';
import { handleFaqControls } from './accordeon';
import { initReviewsSwiper } from './reviews-swiper';

let resizeTimeout;

const handleResizeEvent = () => {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initHeroSwiper();
      initProgramsSwiper();
      initTabsSwiper();
      initNewsSwiper();
      handleFaqControls();
      initReviewsSwiper();
    }, 200);
  });
};

export const initSwipers = () => {
  initHeroSwiper();
  initProgramsSwiper();
  initTabsSwiper();
  initNewsSwiper();
  handleFaqControls();
  initReviewsSwiper();
  handleResizeEvent();
};
