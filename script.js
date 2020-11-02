const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let selectedColor = 'red';
let red = 255;
let green = 200;
let blue = 0;
let radius = 40;

let isIncrease = false;
let isMouseDown = false;

let x = 0;
let y = 0;

canvas.addEventListener('mousedown', () => {
  isMouseDown = true;
});

canvas.addEventListener('mouseup', () => {
  isMouseDown = false;
  x = 0;
  y = 0;
});

const changeColor = () => {
  switch (selectedColor) {
    case 'green': {
      green -= 3;
      blue += 3;
      if (green <= 0) {
        selectedColor = 'blue';
      }
      break;
    }
    case 'blue': {
      blue -= 3;
      red += 3;
      if (blue <= 0) {
        selectedColor = 'red';
      }
      break;
    }
    default:
      red -= 3;
      green += 3;
      if (red <= 0) {
        selectedColor = 'green';
      }
  }
  ctx.fillStyle = `rgb(${red},${green},${blue})`;
};

const changeBrushSize = () => {
  if (isIncrease) {
    radius += 0.2;
  } else {
    radius -= 0.2;
  }

  if (radius > 40) {
    isIncrease = false;
  } else if (radius < 1) {
    isIncrease = true;
  }
};

const paint = (e) => {
  ctx.beginPath();

  if (x && y) {
    ctx.moveTo(x, y);
    ctx.lineTo(e.pageX, e.pageY);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = `rgb(${red},${green},${blue})`;
    ctx.stroke();
    ctx.arc(e.pageX, e.pageY, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  x = e.pageX;
  y = e.pageY;
  ctx.arc(e.pageX, e.pageY, radius, 0, 2 * Math.PI);
  ctx.fill();
};
canvas.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    changeBrushSize();
    changeColor();
    paint(e);
  }
});
