import '../pages/about.css';
import {CommitList} from "./modules/commitList.js";
import {apiGitHub, commitCard} from "./constants/constants.js"

import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';

const commitsList = new CommitList(document.querySelector('.history__swiper-wrapper'), commitCard);

setTimeout(function () {
  swiper.update();
}, 1000);

apiGitHub.getCommits()
  .then(result => {
    console.log(result);
    return commitsList.render(result);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })

const swiper = new Swiper('.swiper-container', {
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

