let cx = 300;
let cy = 180;
let faceW = 190;
let faceH = 230;

let shirtR = 190, shirtG = 40, shirtB = 40;
let showGlasses = true;
let bigSmile = false;

let eyeW = 56, eyeH = 28, eyeOffsetX = 55;
let blink = 0;
let blinkTarget = 0;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(245);
  drawCharacter(cx, cy);
  
  if (blink < blinkTarget) {
  blink += 0.1;   // 점점 감기게
}
else if (blink > blinkTarget) {
  blink -= 0.1;   // 점점 뜨게
}
}

// -------------------- 캐릭터 그리기 --------------------
function drawCharacter(xc, yc) {
  // 색상
  let skin = color(245, 218, 195);
  let hair = color(25, 25, 25);
  let metal = color(170);
  let eyeWhite = color(255);
  let iris = color(80, 110, 150);
  let lip = color(220, 160, 150);
  let shirt = color(shirtR, shirtG, shirtB);

  // ===== 목 =====
  noStroke();
  fill(skin);
  rect(xc - 28, yc + faceH * 0.36, 56, 40, 10);

  // ===== 몸통 =====
  fill(shirt);
  let topY = yc + faceH * 0.36 + 35;
  let bottomY = topY + 115;
  let topHalf = 85;
  let bottomHalf = 130;

  quad(
    xc - topHalf,    topY,
    xc + topHalf,    topY,
    xc + bottomHalf, bottomY,
    xc - bottomHalf, bottomY
  );

  // 라운드넥
  fill(240);
  arc(xc, topY, 120, 60, radians(0), radians(180));

  // ===== 팔 흔들기 =====
  // 오른팔 (움직이는 팔)
  let armAngle = radians(-100) + sin(frameCount * 0.1) * radians(70); // 흔들기 각도
  push();
  translate(xc + topHalf, topY + 10); // 어깨 기준 회전
  rotate(armAngle);
  fill(shirt);
  rect(0, 0, 25, 90, 10); // 팔통
  fill(skin);
  ellipse(12, 90, 28, 28); // 손
  pop();

  // 왼팔 (고정)
  push();
  translate(xc - topHalf - 25, topY + 10);
  rotate(radians(15));
  fill(shirt);
  rect(0, 0, 25, 90, 10);
  fill(skin);
  ellipse(12, 90, 28, 28);
  pop();

  // ===== 머리 =====
  noStroke();
  fill(hair);
  ellipse(xc - faceW*0.47, yc - 10, 70, 150);
  ellipse(xc + faceW*0.47, yc - 10, 70, 150);
  arc(xc, yc - faceH*0.38, faceW*1.05, 120, radians(180), radians(360));
  rect(xc - faceW*0.5, yc - faceH*0.42, faceW, 45, 8);

  // ===== 얼굴 =====
  stroke(0);
  strokeWeight(2);
  fill(skin);
  ellipse(xc, yc, faceW, faceH);
  noStroke();
  fill(skin);
  ellipse(xc - faceW*0.55, yc + 5, 26, 42);
  ellipse(xc + faceW*0.55, yc + 5, 26, 42);

  // ===== 눈썹 =====
  noFill();
  stroke(40);
  strokeWeight(3);
  arc(xc - 55, yc - 30, 70, 28, radians(200), radians(340));
  arc(xc + 55, yc - 30, 70, 28, radians(200), radians(340));

  // ===== 눈 =====
  let lookX = map(mouseX, 0, width, -6, 6);
  let lookY = map(mouseY, 0, height, -4, 4);
  let eyeHNow = eyeH * (1 - 0.75 * blink);
  if (eyeHNow < 4) eyeHNow = 4;

  stroke(0);
  strokeWeight(2);
  fill(eyeWhite);
  ellipse(xc - eyeOffsetX, yc - 8, eyeW, eyeHNow);
  ellipse(xc + eyeOffsetX, yc - 8, eyeW, eyeHNow);

  noStroke();
  fill(iris);
  circle(xc - eyeOffsetX + lookX, yc - 8 + lookY, 16 * (eyeHNow / eyeH));
  circle(xc + eyeOffsetX + lookX, yc - 8 + lookY, 16 * (eyeHNow / eyeH));
  fill(0);
  circle(xc - eyeOffsetX + lookX, yc - 8 + lookY, 8 * (eyeHNow / eyeH));
  circle(xc + eyeOffsetX + lookX, yc - 8 + lookY, 8 * (eyeHNow / eyeH));
  fill(255);
  circle(xc - eyeOffsetX + lookX - 3, yc - 8 + lookY - 3, 4 * (eyeHNow / eyeH));
  circle(xc + eyeOffsetX + lookX - 3, yc - 8 + lookY - 3, 4 * (eyeHNow / eyeH));

  // ===== 코 =====
  stroke(90, 70, 60);
  strokeWeight(2);
  line(xc, yc + 0, xc - 4, yc + 28);
  noFill();
  arc(xc, yc + 28, 22, 12, radians(20), radians(160));

  // ===== 입 =====
  let smileW = bigSmile ? 70 : 52;
  let smileH = bigSmile ? 26 : 20;
  stroke(120, 60, 70);
  strokeWeight(2);
  noFill();
  arc(xc, yc + 58, smileW, smileH, radians(200), radians(340));
  noStroke();
  fill(lip);
  arc(xc, yc + 60, smileW, smileH - 4, radians(20), radians(160));

  // ===== 안경 =====
  if (showGlasses) {
    noFill();
    stroke(metal);
    strokeWeight(3);
    ellipse(xc - eyeOffsetX, yc - 8, eyeW + 10, eyeH + 12);
    ellipse(xc + eyeOffsetX, yc - 8, eyeW + 10, eyeH + 12);
    line(xc - eyeOffsetX + (eyeW+10)/2, yc - 8, xc + eyeOffsetX - (eyeW+10)/2, yc - 8);
    line(xc - eyeOffsetX - (eyeW+10)/2, yc - 8, xc - faceW*0.55 + 10, yc + 4);
    line(xc + eyeOffsetX + (eyeW+10)/2, yc - 8, xc + faceW*0.55 - 10, yc + 4);
  }

  // ===== 볼터치 =====
  noStroke();
  fill(255, 140, 140, 60);
  ellipse(xc - eyeOffsetX, yc + 36, 24, 16);
  ellipse(xc + eyeOffsetX, yc + 36, 24, 16);
}

// -------------------- 마우스 인터랙션 --------------------
function mousePressed() {
  blinkTarget = 1;
}
function mouseReleased() {
  blinkTarget = 0;
}

// -------------------- 키보드 인터랙션 --------------------
function keyPressed() {
  if (keyCode === LEFT_ARROW)  cx = max(120, cx - 8);
  if (keyCode === RIGHT_ARROW) cx = min(width - 120, cx + 8);
  if (keyCode === UP_ARROW)    cy = max(120, cy - 8);
  if (keyCode === DOWN_ARROW)  cy = min(height - 120, cy + 8);

  if (key === ' ') bigSmile = !bigSmile;
  if (key === 'g' || key === 'G') showGlasses = !showGlasses;
  if (key === 'c' || key === 'C') {
    shirtR = int(random(40, 230));
    shirtG = int(random(40, 230));
    shirtB = int(random(40, 230));
  }
  if (key === 's' || key === 'S') {
    saveGif('mySketch', 10);
  }
}
