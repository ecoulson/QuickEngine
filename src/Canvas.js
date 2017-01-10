class CanvasObj {
  constructor(id) {
    let cvs = document.getElementById(id);
    let ctx = cvs.getContext('2d');
    this.width = cvs.width;
    this.height = cvs.height;

    this.getContext = function () {
      return ctx;
    }

    this.getCanvas = function () {
      return cvs;
    }
  }

  getBoundingRect() {
    return this.getCanvas().getBoundingClientRect();
  }

  clear() {
    let ctx = this.getContext();
    ctx.clearRect(0, 0, this.width, this.height);
  }

  drawRect(x, y, width, height, color) {
    let ctx = this.getCanvas().getContext('2d');
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.closePath();
  }

  drawCircle(x, y, radius, color) {
    let ctx = this.getContext();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2, true);
    ctx.fill();
    ctx.closePath();
  }

  drawText(text, x, y, color, style) {
    let ctx = this.getContext();
    ctx.fillStyle = color;
    ctx.font = `${style.size}px ${style.font}`;
    ctx.fillText(text, x, y);
  }

  drawFullImage(image, x, y) {
    let ctx = this.getContext();
    ctx.drawImage(image, x, y)
  }
}

export let Canvas = new CanvasObj('engine');
