/* eslint-disable prettier/prettier */
export default class Goblin {
  constructor() {
    this._element = document.createElement("img");
    this._element.src =
      "https://github.com/netology-code/ahj-homeworks/blob/AHJ-50/dom/pic/goblin.png?raw=true";
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
