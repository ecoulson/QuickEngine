import { Canvas } from "../Canvas";

export default class UIScreen {
  constructor(bg) {
    this.background = bg;
    this.buttons = [];
    this.text = [];
    this.active = false;
  }

  displayScreen() {
    this.active = true;
  }

  hideScreen() {
    this.active = false;
  }

  render() {
    if (this.active) {
      Canvas.drawRect(0,0,Canvas.width, Canvas.height, this.background);
      for (let i in this.buttons) {
        this.buttons[i].render();
      }
      for (let i in this.text) {
        this.text[i].render();
      }
    }
  }

  addButton(button) {
    this.buttons.push(button);
  }

  addText(text) {
    this.text.push(text);
  }


}
