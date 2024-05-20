/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Board.js
class Board {
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
    this.cells.forEach(el => {
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
;// CONCATENATED MODULE: ./src/js/Goblin.js
/* eslint-disable prettier/prettier */
class Goblin {
  constructor() {
    this._element = document.createElement("img");
    this._element.src = "https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/dom/pic/goblin.png?raw=true";
    this._element.className = "goblin";
  }
  drawElement(position) {
    const randomCell = document.getElementById(position);
    randomCell.append(this.element);
  }
  get element() {
    return this._element;
  }
}
;// CONCATENATED MODULE: ./src/js/App.js
/* eslint-disable prettier/prettier */


class App {
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
    popUp.textContent = 'Game Over!';
    popUpBack.appendChild(popUp);
    document.children[0].children[1].appendChild(popUpBack);
  }
  setListener(context) {
    this.board.container.addEventListener("click", function handler(event) {
      if (event.target.classList.contains("goblin")) {
        context.board.scoreP.children[0].textContent = +context.board.scoreP.children[0].textContent + 1;
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
;// CONCATENATED MODULE: ./src/index.js


const app = new App();
app.init();
/******/ })()
;