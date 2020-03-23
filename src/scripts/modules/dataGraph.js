import {weekday} from "../constants/constants.js";

class DataGraph {
  constructor(res) {
    this.res = res;
  }

  getDates(nowDate, DAY_IN_MS) {
    const dates = [nowDate];
    function add(dates) {
      for (let i = 0; i < weekday; i++) {
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

    function addGraph() {

      for (let i = 0; i < weekday; i++) {
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

export {DataGraph}
