import {NewsCard} from '../modules/newsCard.js';
import {ApiGitHub} from "../api/apiGitHub.js";
import {CommitCard} from "../modules/commitCard.js";

const buttonSend = document.querySelector('.search__button');
const error = document.querySelector('.seach__error');
const inputSend = document.querySelector('.search__input');
const cardContainer = document.querySelector('.card-list');
const searchResult = document.querySelector('.search-result');
const preloader = document.querySelector('.preloader');
const notFound = document.querySelector('.not-found');
const searchError = document.querySelector('.searchError__title');

const main_url = "http://newsapi.org/v2/everything?";
const to = new Date();
const from = new Date(to.getTime() - (7 * 24 * 60 * 60 * 1000));
const apiKey = "276475815ef54247935ea6bc2810abdb";
const card = new NewsCard();

const apiGitHub = new ApiGitHub('https://api.github.com/repos/Atichka/NewsAnalyzer/commits');
const commitCard = new CommitCard();

const query = document.querySelector('.analytic__week-query');
const res = JSON.parse(localStorage.getItem('res'));
const totalRes = document.querySelector('.analytic__week-sum');
const totalPhraz = document.querySelector('.analytic__phraz-sum');
const month = document.querySelector('.analytic__month');
const word = localStorage.getItem('query');
const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const nowDate = new Date();
// Миллисекунд в дне
const DAY_IN_MS = 86400000;

export {DAY_IN_MS, nowDate, months, word, month, totalPhraz, totalRes, res, query, commitCard, apiGitHub, card, buttonSend, error, inputSend, cardContainer, searchResult, preloader, notFound, searchError, main_url, to, from, apiKey}
