import Game from "./Game";
import Ball from "./dev/Ball";
import Scene from "./Scene"
import { Canvas } from "./Canvas";

let game = new Game('engine', new Scene());
let ball = new Ball(100,100);

game.run();
game.background = 'black';
game.addListener('mousemove', () => {
  console.log("handler");
})

game.addUpdate(() => {
  ball.update();
})

game.addDraw(() => {
  Canvas.drawRect(0, 0, Canvas.width, Canvas.height, game.background);
})

game.addDraw(() => {
  ball.render();
})
