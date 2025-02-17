import { initHeroSwiper } from './hero-swiper';
import { initProgramsSwiper } from './programs-swiper';
import { initTabsSwiper } from './tabs-swiper';
import { initNewsSwiper } from './news-swiper';
import { handleFaqControls } from './accordeon';
import { initReviewsSwiper } from './reviews-swiper';

let resizeTimeout;

const handleResizeEvent = () => {
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout); // Очищаем предыдущий таймер
    resizeTimeout = setTimeout(() => {
      initHeroSwiper();
      initProgramsSwiper();
      initTabsSwiper();
      initNewsSwiper();
      handleFaqControls();
      initReviewsSwiper();
    }, 200); // Задержка в миллисекундах (например, 200 мс)
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
