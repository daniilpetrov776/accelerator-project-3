import { handleNavMenuControls } from './nav-menu';
import { blockDisabledElements } from './disable';
import { initSwipers } from './swiper';
import { handleModalFormValidation } from './modal';
import { handleFormValidation } from './form';
import { handleTabsInteractions } from './tabs';

handleNavMenuControls();
blockDisabledElements();
initSwipers();
handleTabsInteractions();
handleModalFormValidation();
handleFormValidation();
