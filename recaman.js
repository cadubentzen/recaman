const canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const ctx = canvas.getContext('2d');

const { width, height } = canvas;

function drawMiddleLine() {
  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
}

let colors = [{r: 0, g: 0, b: 0}];
let sequence = [0];

function generateRecamanSequence(number) {
  if (number < sequence.length) {
    colors.length = number;
    sequence.length = number;
    return;
  }

  for (let hop = sequence.length; hop < number; ++hop) {
    // console.log(sequence[sequence.length - 1]);
    let next = sequence[sequence.length - 1] - hop;
    if (next < 0 || sequence.includes(next)) {
      next = sequence[sequence.length - 1] + hop;
    }
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    colors.push({r, g, b});
    sequence.push(next);
  }

  console.log(colors);
}

function drawArc(start, end, color, margin, stepWidth, antiClockwise) {
  const x = margin + (start + end) * stepWidth / 2;
  const radius = Math.abs(end - start) * stepWidth / 2;

  const {r, g, b} = color;
  ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
  // ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.arc(x, height / 2, radius, 0, Math.PI, antiClockwise);
  // ctx.stroke();
  ctx.fill();
}

const lastElem = document.getElementById('last');
const numberElem = document.getElementById('number');

function drawRecamanSequence(number) {
  number = number || 2;
  numberElem.value = number;
  window.location.hash = number;

  ctx.fillStyle = 'purple';
  ctx.fillRect(0, 0, width, height);

  generateRecamanSequence(number);
  const maxOfSequence = Math.max(...sequence);

  lastElem.innerText = `${sequence[sequence.length - 1]}`;

  const margin = width / 40;
  const stepWidth = (width - 2 * margin) / (maxOfSequence + 1);

  for (let i = sequence.length - 1, antiClockwise = (sequence.length % 2 != 0); i > 0; --i, antiClockwise = !antiClockwise)
    drawArc(sequence[i - 1], sequence[i], colors[i - 1], margin, stepWidth, antiClockwise);
}

