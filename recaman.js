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

let sequence = [0];

function generateRecamanSequence(number) {
  if (number < sequence.length) {
    sequence.length = number;
    return;
  }

  for (let hop = sequence.length; hop < number; ++hop) {
    // console.log(sequence[sequence.length - 1]);
    let next = sequence[sequence.length - 1] - hop;
    if (next < 0 || sequence.includes(next)) {
      next = sequence[sequence.length - 1] + hop;
    }
    sequence.push(next);
  }
}

function drawArc(start, end, margin, stepWidth, antiClockwise) {
  const x = margin + (start + end) * stepWidth / 2;
  const radius = Math.abs(end - start) * stepWidth / 2;

  ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  ctx.arc(x, height / 2, radius, 0, Math.PI, antiClockwise);
  ctx.stroke();
}

const lastElem = document.getElementById('last');

function drawRecamanSequence(number) {
  ctx.fillStyle = 'purple';
  ctx.fillRect(0, 0, width, height);

  generateRecamanSequence(number);
  const maxOfSequence = Math.max(...sequence);

  lastElem.innerText = `${sequence[sequence.length - 1]}`;

  const margin = width / 40;
  const stepWidth = (width - 2 * margin) / (maxOfSequence + 1);

  for (let i = 1, antiClockwise = false; i < sequence.length; ++i, antiClockwise = !antiClockwise)
    drawArc(sequence[i - 1], sequence[i], margin, stepWidth, antiClockwise);
}

const numberElem = document.getElementById('number');

drawRecamanSequence(10);
