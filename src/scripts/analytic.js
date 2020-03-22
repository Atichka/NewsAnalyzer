import '../pages/analytic.css';

class Analytic {
  constructor(res) {
    this.res = res;
  }

  getDates(nowDate, DAY_IN_MS) {
    const dates = [nowDate];
    function add(dates) {
      for (let i = 1; i < 7; i++) {
        dates.unshift(new Date(nowDate - DAY_IN_MS * i));
      }
    };
    add(dates)

    // Изменение формата даты
    const datesShort = dates.map(function (item) {
      item = `${item.toLocaleString("ru", { day: "numeric" })}, ${item.toLocaleString("ru", { weekday: 'short' })}`;
      return item;
    })
    return datesShort;
  }

  // Заполнение дней недели в табличку
  renderDatesGraph(datesShort) {
    const datesGraph = document.querySelectorAll('.analytic__table-label');
    datesGraph.forEach(function (i, item) {
      i.textContent = datesShort[item];
    });
  }

  cardDates() {
    this.res.articles.forEach(function (item, i) {
      item.publishedAt = new Date(item.publishedAt)
    });


    const cardsDates = this.res.articles.map(function (item) {
      item.publishedAt = `${item.publishedAt.toLocaleString("ru", { day: "numeric" })}, ${item.publishedAt.toLocaleString("ru", { weekday: 'short' })}`
      return item.publishedAt
    })
    return cardsDates;
  }

  renderGraph(cardsDates, datesShort) {
    const graphsTexts = document.querySelectorAll('.analytic__table-graph-label');
    const graphs = document.querySelectorAll('.analytic__table-graph');

    //Разбиение на 7 строк
    function addGraph() {

      for (let i = 0; i < 7; i++) {
        const a = cardsDates.filter(function (item) {
          return item === datesShort[i]
        })

        graphsTexts[i].textContent = a.length;
        graphs[i].style.width = `${a.length}%`;
        graphs[i].style.background = '#2F71E5';
      }
    }
    addGraph();
  }

}

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

const analitic = new Analytic(res);
const datesShort = analitic.getDates(nowDate, DAY_IN_MS);
analitic.renderDatesGraph(datesShort);
const cardsDates = analitic.cardDates();
analitic.renderGraph(cardsDates, datesShort);
