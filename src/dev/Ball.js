import { Canvas } from "../Canvas";
import GameObject from "../GameObject"

export default class Ball extends GameObject {
  constructor(x,y) {
    super("pong_ball");
    this.x = x;
    this.y = y;
    this.vX = 3;
    this.vY = 3;
  }

  update() {
    this.x += this.vX;
    this.y += this.vY;
    if (this.y >= Canvas.height || this.y <= 0) {
      this.vY = -this.vY;
    }
    if (this.x >= Canvas.width || this.x <= 0) {
      this.vX = -this.vX;
    }
  }

  render() {
    Canvas.drawCircle(this.x, this.y, 10, 'white');
  }

  reset() {
    this.x = Canvas.width / 2;
    this.y = Canvas.height / 2;
    this.vY = 0;
  }
}
