import '../pages/about.css';
import {ApiGitHub} from "./apiGitHub.js";

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

class Commit {
  constructor(date, avatar_url, name, email, message, url) {
    this.commitElement = this.create(date, avatar_url, name, email, message, url);
  }

  create(date, avatar_url, name, email, message, url) {
    const element = document.createRange().createContextualFragment(`
    <a class="swiper-slide history__swiper-slide" id="idCard" href="#">
      <p class="history__date"></p>
      <div class="history__main">
        <img class="history__avatar")>
        <div class="history__head">
          <p class="history__name"></p>
          <p class="history__mail"></p>
        </div>
      </div>
      <p class="history__text"></p>
    </a>`)
    const newDate = new Date(date);
    element.querySelector('.history__date').textContent = newDate.getDate() + " " + months[newDate.getMonth()] + ", " + newDate.getFullYear();
    element.querySelector('.history__avatar').style.backgroundImage = 'url(' + avatar_url + ')';
    element.querySelector('.history__name').textContent = name;
    element.querySelector('.history__mail').textContent = email;
    element.querySelector('.history__text').textContent = message;
    element.getElementById("idCard").setAttribute("href", url);
    return element;
  }
}

class CommitList {
  constructor(container) {
    this.container = container;
  }

  render(commits) {
    for(let i = 0; i < 20; i++) {
      if(commits[i].committer != null) {
        this.addCommit(commits[i].commit.author.date, commits[i].committer.avatar_url, commits[i].commit.author.name, commits[i].commit.author.email, commits[i].commit.message, commits[i].html_url);
      } else {
        this.addCommit(commits[i].commit.author.date, commits[i].commit.author.name, commits[i].commit.author.email, commits[i].commit.message, commits[i].html_url);
      }
    }
  }

  addCommit(date, avatar_url, name, email, message, url) {
    const { commitElement } = new Commit(date, avatar_url, name, email, message, url);
    this.container.appendChild(commitElement);
  }
}

const apiGitHub = new ApiGitHub('https://api.github.com/repos/Atichka/NewsAnalyzer/commits');
const commitsList = new CommitList(document.querySelector('.history__swiper-wrapper'));
let months = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

apiGitHub.getCommits()
  .then(result => {
    console.log(result);
    return commitsList.render(result);
  })
  .catch(err => {
    console.log(`Ошибка: ${err}`);
  })

