export default class Board {
  constructor(size) {
    this.size = size ** 2;
    this.cells = [];
  }

  generateBoard() {
    for (let i = 0; i < this.size; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.id = i;
      this.cells.push(cell);
    }
  }

  //create board and adding it to a DOM
  drawBoard() {
    this.container = this.createContainer();
    this.scoreP = this.createScore();
    this.cells.forEach((el) => {
      this.container.appendChild(el);
    });
    document.documentElement.children[1].appendChild(this.scoreP);
    document.documentElement.children[1].appendChild(this.container);
  }

  createContainer() {
    const container = document.createElement("div");
    container.classList.add("container");
    return container;
  }

  createScore() {
    const scoreP = document.createElement("p");
    scoreP.classList.add("score");
    const scoreSpan = document.createElement("span");
    scoreSpan.classList.add("score_span");
    scoreSpan.textContent = 0;
    scoreP.textContent = `Счёт: `;
    scoreP.appendChild(scoreSpan);
    return scoreP;
  }
}