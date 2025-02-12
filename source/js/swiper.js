import { initHeroSwiper } from './hero-swiper';
import { initProgramsSwiper } from './programs-swiper';
import { initNewsSwiper } from './news-swiper';
import { handleFaqControls } from './accordeon';
import { initReviewsSwiper } from './reviews-swiper';

export const initSwipers = () => {
  initHeroSwiper();
  initProgramsSwiper();
  initNewsSwiper();
  handleFaqControls();
  initReviewsSwiper();
};
