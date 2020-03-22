import {NewsCard} from "./newsCard.js";

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
    const { cardElement } = new NewsCard(urlToImage, publishedAt, description, title, link);
    this.container.appendChild(cardElement);
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
    this.lastCard = 0;
  }

  check(cards) {
    const moreCard = document.querySelector('.search-result__more-cards')
    if (this.lastCard < cards.length) {
      moreCard.style = 'display: block;';
      moreCard.onclick = () =>  this.render(cards);
    } else {
      moreCard.style = 'display: none;';
    }
  }
}

export {CardList};
