import '../pages/index.css';
import {ApiCard} from "./apiCard.js";

class CardList {
  constructor(container) {
    this.container = container;
    this.lastCard = 0;
  }

  render(cards) {
    const articles = cards;
    for (let i = this.lastCard; i < Math.min(this.lastCard + 3, articles.length); i++) {
      const article = articles[i];
      this.addCard(article.urlToImage, article.publishedAt.split('T')[0].split("-").reverse().join("."), article.description, article.title, article.source.name);
    }
    this.lastCard = this.lastCard + 3;
    this.check(cards);
  }

  addCard(urlToImage, publishedAt, description, title, link) {
    const { cardElement } = new Card(urlToImage, publishedAt, description, title, link);
    this.container.appendChild(cardElement);
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.lastCard = 0;
  }

  check(cards) {
    if (this.lastCard < cards.length) {
      moreCard.style = 'display: block;';
      moreCard.onclick = () =>  this.render(cards);
    } else {
      moreCard.style = 'display: none;';
    }
  }
}

class Card {
  constructor(urlToImage, publishedAt, description, title, link) {
    this.cardElement = this.create(urlToImage, publishedAt, description, title, link);
  }

  create (urlToImage, publishedAt, description, title, link) {
    const element = document.createRange().createContextualFragment(`<div class="card">
      <div class="card__image"></div>
      <div class="card__text">
        <h3 class="card__date"></h3>
        <h2 class="card__title"></h2>
        <p class="card__paragraph"></p>
        <p class="card__link"></p>
      </div>
    </div>`)
    if (urlToImage != null) {
      element.querySelector('.card__image').style.backgroundImage = 'url(' + urlToImage + ')';
    }
    element.querySelector('.card__date').textContent = publishedAt;
    element.querySelector('.card__paragraph').textContent = description;
    element.querySelector('.card__title').textContent = title;
    element.querySelector('.card__link').textContent = link;
    return element;
  }
}

const buttonSend = document.querySelector('.search__button');
const error = document.querySelector('.seach__error');
const inputSend = document.querySelector('.search__input');
const cardContainer = document.querySelector('.card-list');
const searchResult = document.querySelector('.search-result');
const preloader = document.querySelector('.preloader');
const notFound = document.querySelector('.not-found');
const moreCard = document.querySelector('.search-result__more-cards')
const form = document.querySelector('.search__search-field');
const searchError = document.querySelector('.searchError__title');

const main_url = "http://newsapi.org/v2/everything?";
const to = new Date();
const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000));
const apiKey = "276475815ef54247935ea6bc2810abdb";

const apiCard = new ApiCard(main_url, apiKey);
const cardlist = new CardList(cardContainer);

function sendForm(event) {
  localStorage.clear();
  cardlist.clear();
  event.preventDefault();
  searchResult.style = 'display: none;';
  notFound.style = 'display: none;';
  preloader.style = 'display: block;';

  if (validateInput()) {
    apiCard.getCard(from.toISOString(), to.toISOString(), inputSend.value)
    .then(result => {
      checkResults(result.articles);
      sendData(inputSend.value, result);
      console.log(result);
      preloader.style = 'display: none;';
    })
    .catch(err => {
      console.log(`Ошибка: ${err}`);
      searchError.style = 'display: block;';
    })
  } else {
    preloader.style = 'display: none;';
    searchResult.style = 'display: none;';
  }
}

function validateInput() {
  if (inputSend.value === '') {
    error.textContent = "Нужно ввести ключевое слово";
    preloader.style='display: none;';
    return false;
  }
  else {
    error.textContent = '';
    return true;
  }
}

function sendData (word, data) {
  const res = JSON.stringify(data);
  localStorage.clear();
  localStorage.setItem('res', res);
  localStorage.setItem('query', word);
}

if (localStorage.getItem('res') !== null) {
  inputSend.value = localStorage.getItem('query');
  const cardsData = JSON.parse(localStorage.getItem('res'));
  searchResult.style = 'display: block;';
  checkResults(cardsData.articles);
};

function checkResults(result) {
  if(result.length == 0) {
    localStorage.clear();
    notFound.style='display: block;';
    searchResult.style='display: none;';
  } else {
    notFound.style = 'display: none;';
    searchResult.style = 'display: block;';
    cardlist.render(result);
  }
}

buttonSend.addEventListener('click', sendForm);
inputSend.addEventListener('input', validateInput);
