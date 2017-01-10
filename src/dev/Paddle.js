import { Canvas } from "../Canvas";
import GameObject from "../GameObject"

export default class Paddle extends GameObject {
  constructor(x,y,name) {
    super(name);
    this.height = 100;
    this.width = 10;
    this.x = x;
    this.y = y;
    this.speed = 2.5;
  }

  render() {
    Canvas.drawRect(this.x, this.y, this.width, this.height, 'white');
  }

  mouseInput(y) {
    this.y = y - (this.height / 2);
  }

  aiMove(gameObj) {
    var paddleCenterY = this.y + (this.height/2);
    if (paddleCenterY < gameObj.y - 35) {
      this.y += this.speed;
    } else if (paddleCenterY > gameObj.y + 35) {
      this.y -= this.speed;
    }
  }

  checkCollision(gameObj) {
    if (this.name.includes('1')) {
      if (gameObj.x < this.x) {
        if(gameObj.y > this.y && gameObj.y < this.y + this.height) {
          gameObj.vX = gameObj.vX;
          let dY = gameObj.y - (this.y + this.height / 2);
          gameObj.vY = dY * 0.1111;
          return true;
        } else {
          gameObj.reset();
          return false;
        }
      } else {
        return true;
      }
    } else {
      if (gameObj.x > this.x) {
        if(gameObj.y > this.y && gameObj.y < this.y + this.height) {
          gameObj.vX = gameObj.vX;
          let dY = gameObj.y - (this.y + this.height / 2);
          gameObj.vY = dY * 0.1111;
          return true;
        } else {
          gameObj.reset();
          return false;
        }
      } else {
        return true;
      }
    }
  }

  update() {

  }
}
