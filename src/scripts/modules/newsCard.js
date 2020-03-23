class NewsCard {
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

export {NewsCard};
