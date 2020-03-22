import {CommitCard} from "./commitCard.js";

class CommitList {
  constructor(container) {
    this.container = container;
  }

  render(commits) {
    for(let i = 0; i < 20; i++) {
      if(commits[i].author != null) {
        this.addCommit(commits[i].commit.author.date, commits[i].committer.avatar_url, commits[i].commit.author.name, commits[i].commit.author.email, commits[i].commit.message, commits[i].html_url);
      }
    }
  }

  addCommit(date, avatar_url, name, email, message, url) {
    const { commitElement } = new CommitCard(date, avatar_url, name, email, message, url);
    this.container.appendChild(commitElement);
  }
}

export {CommitList}
