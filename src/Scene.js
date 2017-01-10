import Queue from "./Queue";

export default class Scene {
  constructor() {
    this.drawQueue = new Queue();
    this.updateQueue = new Queue();
    this.gameObjects = [];
    this.menus = [];
  }

  uiActive() {
    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].active) {
        this.menus[i].render();
        return true;
      }
    }
    return false;
  }

  addGameObject(gameObj) {
    this.gameObjects.push(gameObj);
  }
}
