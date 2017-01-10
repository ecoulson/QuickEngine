import Game from "./Game";
import Ball from "./dev/Ball";
import Paddle from "./dev/Paddle";
import Scene from "./Scene"
import UIMenu from "./UI/UIScreen";
import UIText from "./UI/UIText";
import UIButton from "./UI/UIButton";
import { Canvas } from "./Canvas";

let game = new Game('engine', new Scene());
let ball = new Ball(100,100);
let paddle = new Paddle(0, 250, 'paddle_1');
let paddle2 = new Paddle(Canvas.width - 10, 250, 'paddle_2');
let winScreen = new UIMenu('black');
let score1 = new UIText('', {
  size: 16,
  font: 'Arial'
}, 'white', 100, 100);
let score2 = new UIText('', {
  size: 16,
  font: 'Arial'
}, 'white', 700, 100);
score1.text = 0;
score2.text = 0;

game.player1Score = 0;
game.player2Score = 0;
game.winScore = 7;
game.hasInit = false;

game.run();
game.currentScene.menus.push(winScreen)
game.background = 'black';

game.addListener('mousedown', (e) => {
  if (winScreen.active) {
    winScreen.active = false;
    game.player1Score = 0;
    game.player2Score = 0;
  }
})

game.addListener('mousemove', (e) => {
  let rect = game.getBoundingRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;

  paddle.mouseInput(mouseY);
})

game.addUpdate(() => {
  ball.update();
  paddle2.aiMove(ball);

  if (!paddle.checkCollision(ball)) {
    game.player2Score++;
  }
  if (!paddle2.checkCollision(ball)) {
    game.player1Score++;
  }
  score1.text = game.player1Score;
  score2.text = game.player2Score;
  if (game.player1Score >= game.winScore || game.player2Score >= game.winScore) {
    initWin();
    game.hasInit = true;
    winScreen.active = true;
  }
})

game.addDraw(() => {
  Canvas.drawRect(0, 0, Canvas.width, Canvas.height, game.background);
})

game.addDraw(() => {
  ball.render();
})

game.addDraw(() => {
  paddle.render();
  paddle2.render();
})

game.addDraw(() => {
  score1.render();
  score2.render();
})

function initWin() {
  if (!game.hasInit) {
    winScreen.addText(new UIText(`Game Over! ${game.player1Score}-${game.player2Score}`, {
      size: 16,
      font: 'Arial'
    }, 'white', Canvas.width / 2, 100));
    winScreen.addButton(new UIButton(
      Canvas.width / 2,
      500,
      250,
      25,
      'Click To Continue',
      'black',
      'white'
    ))
  }
}
