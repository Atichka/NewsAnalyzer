class CommitList {
  constructor(container, commitElement) {
    this.container = container;
    this.commitElement = commitElement;
  }

  render(commits) {
    for(let i = 0; i < 20; i++) {
      if(commits[i].author != null) {
        this.addCommit(commits[i].commit.author.date, commits[i].committer.avatar_url, commits[i].commit.author.name, commits[i].commit.author.email, commits[i].commit.message, commits[i].html_url);
      }
    }
  }

  addCommit(date, avatar_url, name, email, message, url) {
    const commit = this.commitElement.create(date, avatar_url, name, email, message, url);
    this.container.appendChild(commit);
  }
}

export {CommitList}
