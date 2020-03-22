class CommitCard {
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
    element.querySelector('.history__date').textContent = `${newDate.toLocaleString("ru", { day: "numeric", month: 'long' })}, ${newDate.toLocaleString("ru", { year: 'numeric' })}`;
    element.querySelector('.history__avatar').style.backgroundImage = 'url(' + avatar_url + ')';
    element.querySelector('.history__name').textContent = name;
    element.querySelector('.history__mail').textContent = email;
    element.querySelector('.history__text').textContent = message;
    element.getElementById("idCard").setAttribute("href", url);
    return element;
  }
}

export {CommitCard};
