const Snow = (canvas, count, options) => {
  const ctx = canvas.getContext('2d');
  const snowflakes = [];

  const add = item => snowflakes.push(item(canvas));

  const update = () => _.forEach(snowflakes, el => el.update());

  const resize = () => {
    ctx.canvas.width = canvas.offsetWidth;
    ctx.canvas.height = canvas.offsetHeight;

    _.forEach(snowflakes, el => el.resized());
  };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    _.forEach(snowflakes, el => el.draw());
  };

  const events = () => {
    window.addEventListener('resize', resize);
  };

  const loop = () => {
    draw();
    update();
    animFrame(loop);
  };

  const init = () => {
    _.times(count, () => add(canvas => SnowItem(canvas, null, options)));
    events();
    loop();
  };

  init(count);
  resize();

  return { add, resize };
};

const defaultOptions = {
  color: 'orange',
  radius: [0.5, 3.0],
  speed: [1, 3],
  wind: [-0.5, 3.0] };


const SnowItem = (canvas, drawFn = null, opts) => {
  const options = { ...defaultOptions, ...opts };
  const { radius, speed, wind, color } = options;
  const params = {
    color,
    x: _.random(0, canvas.offsetWidth),
    y: _.random(-canvas.offsetHeight, 0),
    radius: _.random(...radius),
    speed: _.random(...speed),
    wind: _.random(...wind),
    isResized: false };

  const ctx = canvas.getContext('2d');

  const updateData = () => {
    params.x = _.random(0, canvas.offsetWidth);
    params.y = _.random(-canvas.offsetHeight, 0);
  };

  const resized = () => params.isResized = true;

  const drawDefault = () => {
    ctx.beginPath();
    ctx.arc(params.x, params.y, params.radius, 0, 2 * Math.PI);
    ctx.fillStyle = params.color;
    ctx.fill();
    ctx.closePath();
  };

  const draw = drawFn ?
  () => drawFn(ctx, params) :
  drawDefault;

  const translate = () => {
    params.y += params.speed;
    params.x += params.wind;
  };

  const onDown = () => {
    if (params.y < canvas.offsetHeight) return;

    if (params.isResized) {
      updateData();
      params.isResized = false;
    } else {
      params.y = 0;
      params.x = _.random(0, canvas.offsetWidth);
    }
  };

  const update = () => {
    translate();
    onDown();
  };

  return {
    update,
    resized,
    draw };

};

const el = document.querySelector('.container');
const wrapper = document.querySelector('body');
const canvas = document.getElementById('snow');

const animFrame = window.requestAnimationFrame ||
window.mozRequestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.msRequestAnimationFrame;

Snow(canvas, 150, { color: 'white' });



















const body = document.body;
const endTime = new Date('December 31 2023 23:59:59');
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');


setInterval(updateCountdown, 1000);


function updateCountdown() {
	const startTime = new Date();
	const diff = endTime - startTime;
	const days = Math.floor(diff / 1000 / 60 / 60 / 24);
	const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
	const minutes = Math.floor(diff / 1000 / 60) % 60;
	const seconds = Math.floor(diff / 1000) % 60;
	daysEl.innerHTML = days;
	hoursEl.innerHTML = hours < 10 ? '0'+hours : hours;
	minutesEl.innerHTML = minutes < 10 ? '0'+minutes : minutes;
	secondsEl.innerHTML = seconds < 10 ? '0'+seconds : seconds;
}



// SOCIAL PANEL JS
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});



