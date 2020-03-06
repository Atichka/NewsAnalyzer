import '../pages/about.css';

import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';

var mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  spaceBetween: 16,
  fadeEffect: {
      crossFade: 'true'
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.history__button-next',
    prevEl: '.history__button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
