import { Canvas } from "../Canvas";

export default class UIText {
  constructor(text, styleOpt, color, x, y) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.style = styleOpt;
    this.color = color;
  }

  render() {
    Canvas.drawText(this.text, this.x, this.y, this.color, this.style);
  }
}
