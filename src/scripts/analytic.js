import '../pages/analytic.css';
import {DataGraph} from "./dataGraph.js";

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

// Введенное слово
query.textContent = '«' + localStorage.getItem('query') + '»';

// Всего за неделю
totalRes.textContent = res.totalResults;

// Упоминаний слова в заголовках
let countWordInTitle = 0;
res.articles.forEach(function (item, i) {
  if (res.articles[i].title) {
    if (res.articles[i].title.toLowerCase().includes(word.toLowerCase())) {
      countWordInTitle++;
    }
    return countWordInTitle;
  }
});

totalPhraz.textContent = countWordInTitle;

// Упоминаний слова в тексте
let countWordInDist = 0;
res.articles.forEach(function (item, i) {
  if (res.articles[i].description) {
    if (res.articles[i].description.toLowerCase().includes(word.toLowerCase())) {
      countWordInDist++;
    }
    return countWordInDist;
  }
});

month.textContent = "(" + searchMonth(res.articles) + ")";

// Поиск за какой месяц
function searchMonth(res) {
  const date = new Date(res[0].publishedAt.slice(0, 10));
  return months[date.getMonth()];
}

const analitic = new DataGraph(res);
const datesShort = analitic.getDates(nowDate, DAY_IN_MS);
analitic.renderDatesGraph(datesShort);
const cardsDates = analitic.cardDates();
analitic.renderGraph(cardsDates, datesShort);
