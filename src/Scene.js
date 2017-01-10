import Queue from "./Queue";

export default class Scene {
  constructor() {
    this.drawQueue = new Queue();
    this.updateQueue = new Queue();
    this.eventEmitter;
    this.gameObjects = [];
  }

  addGameObject(gameObj) {
    this.gameObjects.push(gameObj);
  }
}
