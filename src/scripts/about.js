import '../pages/about.css';
import {ApiGitHub} from "./apiGitHub.js";
import {CommitList} from "./commitList.js";
import {CommitCard} from "./commitCard.js";

import '../../node_modules/swiper/js/swiper.min.js';
import Swiper from 'swiper';

const apiGitHub = new ApiGitHub('https://api.github.com/repos/Atichka/NewsAnalyzer/commits');
const commitCard = new CommitCard();
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

