import { Canvas } from "../Canvas";

export default class UIButton {
  constructor(x, y, width, height, text, bgColor, txtColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.bgColor = bgColor;
    this.txtColor = txtColor;
  }

  render() {
    Canvas.drawRect(this.x, this.y, this.width, this.height, this.bgColor);
    Canvas.drawText(this.text, this.x + 5, this.y + 5, this.txtColor, {
      font: 'Arial',
      size: 16
    })
  }
}
