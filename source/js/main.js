import { handleNavMenuControls } from './nav-menu';
import { blockDisabledElements } from './disable';
import { initSwipers } from './swiper';
import { handleModalFormValidation } from './modal';
import { handleFormValidation } from './form';

handleNavMenuControls();
blockDisabledElements();
initSwipers();
handleModalFormValidation();
handleFormValidation();
