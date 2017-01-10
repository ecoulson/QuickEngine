import { Canvas } from "./Canvas";

export default class Game {
  constructor(id, scene) {
    this.x = 1;
    this.currentScene = scene;
  }

  render(dt) {
    Canvas.clear();
    for (let i = 0; i < this.currentScene.drawQueue.size(); i++) {
      let cb = this.currentScene.drawQueue.remove();
      cb();
      this.currentScene.drawQueue.add(cb);
    }
  }

  update(dt) {
    for (let i = 0; i < this.currentScene.updateQueue.size(); i++) {
      let cb = this.currentScene.updateQueue.remove();
      cb();
      this.currentScene.updateQueue.add(cb);
    }
  }

  run() {
    let last = timestamp();
    let now;
    let dt = 0;
    let step = 1/60;
    let self = this;
    let fpsmeter = new FPSMeter({ decimals: 0, graph: true, theme: 'dark', left: '5px' });

    function timestamp() {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    function frame() {
      fpsmeter.tickStart();
      now = timestamp();
      dt = dt + Math.min(1, (now - last) / 1000);
      while(dt > step) {
        dt = dt - step;
        self.update(step);
      }
      self.render(dt);
      last = now;
      requestAnimationFrame(frame);
      fpsmeter.tick();
    }

    requestAnimationFrame(frame);
  }

  stop() {

  }

  addDraw(cb) {
    this.currentScene.drawQueue.add(cb);
  }

  addUpdate(cb) {
    this.currentScene.updateQueue.add(cb);
  }

  addListener(listener, handler) {
    Canvas.getCanvas().addEventListener(listener,handler);
  }
}
