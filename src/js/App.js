/* eslint-disable prettier/prettier */
import Board from "./Board";
import Goblin from "./Goblin";

export default class App {
  constructor() {
    this.board = new Board(4);
    this.goblin = new Goblin();
    this.missed = 0;
  }

  init() {
    this.board.generateBoard();
    this.board.drawBoard();
    this.setListener(this);
    this.interval();
  }

  randomPosition() {
    const newPosition = Math.floor(Math.random() * this.board.size);
    if (newPosition !== this.position) {
      this.position = newPosition;
    } else {
      this.randomPosition();
    }
  }

  interval() {
    this.intervalId = setInterval(() => {
      this.randomPosition();
      this.goblin.drawElement(this.position);
    }, 1000);
  }

  gameOver() {
    const popUpBack = document.createElement('div');
    popUpBack.classList.add('popUpBack');
    const popUp = document.createElement('div');
    popUp.classList.add('popUp');
    popUp.textContent = 'Game Over!'
    popUpBack.appendChild(popUp);
    document.children[0].children[1].appendChild(popUpBack);
  }

  setListener(context) {
    this.board.container.addEventListener("click", function handler(event) {
      if (event.target.classList.contains("goblin")) {
        context.board.scoreP.children[0].textContent =
          +context.board.scoreP.children[0].textContent + 1;
        event.target.classList.add("clickedEnemy");
        clearInterval(context.intervalId);
        setTimeout(() => {
          event.target.classList.remove("clickedEnemy");
          event.target.remove();
          context.interval();
        }, 300);
      } else {
        context.missed += 1;
        if (context.missed === 5) {
          clearInterval(context.intervalId);
          context.board.container.removeEventListener("click", handler);
          context.gameOver();
          return;
        }
      }
    }); 
  }
}
