class ApiGitHub {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getCommits() {
    this.request = fetch(this.baseUrl)
    .then(res => {
      if (res.ok) {
        return Promise.resolve(res.json());
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    return this.request;
  }
}

export {ApiGitHub};
