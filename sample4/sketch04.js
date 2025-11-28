let t0;

function setup() {
  createCanvas(480, 320);    // GIF 용량 줄이기 위해 축소
  rectMode(CORNER);
  colorMode(RGB);            // 팔레트 단순화
  t0 = millis();
}

function draw() {
  let tSec = (millis() - t0) * 0.001;
  let cycle = (tSec % 10) / 10.0; // 0~1
  let fc = frameCount;

  drawSky(cycle);
  drawSun(cycle, tSec);
  drawMountains(tSec, fc);
  drawGround(tSec);
  drawRoad(cycle);
  drawTrees(tSec);
}

// ==================== SKY ====================
function drawSky(cycle) {
  let dawn    = color(40, 60, 110);
  let morning = color(120, 170, 255);
  let noonC   = color(135, 206, 235);
  let sunset  = color(255, 140, 80);
  let dusk    = color(40, 20, 60);

  let c;
  if (cycle < 0.25) c = lerpColor(dawn, morning, cycle / 0.25);
  else if (cycle < 0.5) c = lerpColor(morning, noonC, (cycle - 0.25) / 0.25);
  else if (cycle < 0.75) c = lerpColor(noonC, sunset, (cycle - 0.5) / 0.25);
  else c = lerpColor(sunset, dusk, (cycle - 0.75) / 0.25);

  background(c);
}

// ==================== SUN ====================
function drawSun(cycle, tSec) {
  let centerX = width / 2;
  let centerY = 300;
  let r = 260;

  // 동→서 반원
  let ang = map(cycle, 0, 1, PI, TWO_PI);
  let sunX = centerX + cos(ang) * r;
  let sunY = centerY + sin(ang) * r;

  // 색상 변화(아침→정오→노을)
  let colMorning = color(255, 200, 120);
  let colNoon    = color(255, 255, 240);
  let colSunset  = color(255, 120, 60);

  let sc = (cycle < 0.5)
    ? lerpColor(colMorning, colNoon, cycle / 0.5)
    : lerpColor(colNoon, colSunset, (cycle - 0.5) / 0.5);

  // 크기 변화
  let s = 60 + sin(tSec * 1.5) * 4;

  noStroke();
  fill(sc);
  circle(sunX, sunY, s);

  // ==================== MINIMAL RAYS ====================
  // 광선 길이 고정 + 무애니메이션 = 팔레트 절약
  stroke(sc);
  strokeWeight(1.5);

  let ray = 8;  // 최소 고정값

  line(sunX, sunY - 35, sunX, sunY - 35 - ray);
  line(sunX + 25, sunY - 20, sunX + 25 + ray, sunY - 20 - ray);
  line(sunX + 30, sunY,       sunX + 30 + ray, sunY);
  line(sunX + 25, sunY + 20,  sunX + 25 + ray, sunY + 20 + ray);
  line(sunX,      sunY + 35,  sunX,            sunY + 35 + ray);
  line(sunX - 25, sunY + 20,  sunX - 25 - ray, sunY + 20 + ray);
  line(sunX - 30, sunY,       sunX - 30 - ray, sunY);
  line(sunX - 25, sunY - 20,  sunX - 25 - ray, sunY - 20 - ray);
}

// ==================== MOUNTAINS ====================
function drawMountains(tSec, fc) {
  let shade = 100 + sin(tSec * 0.3) * 8 + sin(fc * 0.01) * 2;

  fill(shade - 20, 120, 90);
  triangle(80, 260, 200, 100, 350, 260);

  fill(shade - 35, 110, 80);
  triangle(250, 260, 380, 130, 480, 260);
}

// ==================== GROUND ====================
function drawGround(tSec) {
  fill(50, 160, 60 + sin(tSec * 0.2) * 4);
  rect(0, 260, width, 60);
}

// ==================== ROAD ====================
function drawRoad(cycle) {
  let c1 = color(130, 90, 60);
  let c2 = color(90, 60, 40);
  fill(lerpColor(c1, c2, cycle));
  quad(180, 260, 300, 260, 350, 320, 120, 320);
}

// ==================== TREES ====================
function drawTrees(tSec) {
  let sway1 = sin(tSec * 2) * 3; // 진폭 감소
  let sway2 = cos(tSec * 1.6) * 2;

  // left
  fill(80, 50, 20);
  rect(60, 200, 15, 60);
  fill(20, 120, 50);
  circle(55 + sway1, 200, 30);
  circle(70 + sway2, 185, 30);
  circle(85 + sway1, 200, 30);

  // right
  fill(80, 50, 20);
  rect(390, 200, 15, 60);
  fill(20, 120, 50);
  circle(385 + sway1, 200, 30);
  circle(400 + sway2, 185, 30);
  circle(415 + sway1, 200, 30);
}

// ================ GIF (8fps 이하 권장) ================
function keyPressed() {
  if (key === 'g' || key === 'G') {
    saveGif("과제4", 10, 6); 
  }
}
