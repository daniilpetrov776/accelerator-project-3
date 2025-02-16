import { initHeroSwiper } from './hero-swiper';
import { initProgramsSwiper } from './programs-swiper';
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
      initNewsSwiper();
      handleFaqControls();
      initReviewsSwiper();
    }, 200); // Задержка в миллисекундах (например, 200 мс)
  });
};

export const initSwipers = () => {
  initHeroSwiper();
  initProgramsSwiper();
  initNewsSwiper();
  handleFaqControls();
  initReviewsSwiper();
  handleResizeEvent();
};
