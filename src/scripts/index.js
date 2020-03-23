import '../pages/index.css';
import {ApiCard} from "./apiCard.js";
import {CardList} from "./cardList.js";
import { NewsCard } from './newsCard';

const buttonSend = document.querySelector('.search__button');
const error = document.querySelector('.seach__error');
const inputSend = document.querySelector('.search__input');
const cardContainer = document.querySelector('.card-list');
const searchResult = document.querySelector('.search-result');
const preloader = document.querySelector('.preloader');
const notFound = document.querySelector('.not-found');
const form = document.querySelector('.search__search-field');
const searchError = document.querySelector('.searchError__title');

const main_url = "http://newsapi.org/v2/everything?";
const to = new Date();
const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000));
const apiKey = "276475815ef54247935ea6bc2810abdb";

const apiCard = new ApiCard(main_url, apiKey);
const card = new NewsCard();
const cardlist = new CardList(cardContainer, card);

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
      preloader.style = 'display: none;';
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
