function setup() {
  createCanvas(600, 400);
  noLoop(); // 정적 렌더링
}

function draw() {
  background(245);

  // ----- 팔레트(필요시 조정) -----
  let skin = color(245, 218, 195);   // 피부 톤
  let hair = color(25, 25, 25);      // 머리색(짙은 검정)
  let shirt = color(190, 40, 40);    // 빨간 티셔츠
  let metal = color(170);            // 안경 테 색
  let eyeWhite = color(255);
  let iris = color(80, 110, 150);    // 눈동자(회청색 느낌)
  let lip = color(220, 160, 150);    // 연한 입술 색

  // 중심/얼굴 크기
  let cx = width / 2;
  let cy = 180;
  let faceW = 190;
  let faceH = 230;

  // ----- 목 & 티셔츠 -----
  noStroke();
  fill(skin);
  rect(cx - 28, cy + faceH * 0.36, 56, 40, 10); // 목
  fill(shirt);
  // 어깨 둥근 사각형
  quad(
    cx - 130, cy + faceH * 0.36 + 40, // 어깨 왼쪽
    cx + 130, cy + faceH * 0.36 + 40, // 어깨 오른쪽
    cx + 160,  cy + faceH * 0.36 + 150, // 허리 오른쪽
    cx - 160,  cy + faceH * 0.36 + 150  // 허리 왼쪽
  );
  // 라운드넥
  fill(240);
  arc(cx, cy + faceH * 0.36 + 36, 120, 60, radians(0), radians(180));

  // ----- 머리(짧은 일자 앞머리 + 측면) -----
  // 측면 볼륨
  noStroke();
  fill(hair);
  ellipse(cx - faceW*0.47, cy - 10, 70, 150);
  ellipse(cx + faceW*0.47, cy - 10, 70, 150);
  // 윗머리 캡
  arc(cx, cy - faceH*0.38, faceW*1.05, 120, radians(180), radians(360));
  // 앞머리(일자 느낌)
  rect(cx - faceW*0.5, cy - faceH*0.42, faceW, 45, 8);

  // ----- 얼굴 & 귀 -----
  stroke(0);
  strokeWeight(2);
  fill(skin);
  ellipse(cx, cy, faceW, faceH); // 얼굴 타원

  noStroke();
  fill(skin);
  ellipse(cx - faceW*0.55, cy + 5, 26, 42); // 왼 귀
  ellipse(cx + faceW*0.55, cy + 5, 26, 42); // 오른 귀

  // ----- 눈썹(짙고 짧게) -----
  noFill();
  stroke(40);
  strokeWeight(3);
  arc(cx - 55, cy - 30, 70, 28, radians(200), radians(340));
  arc(cx + 55, cy - 30, 70, 28, radians(200), radians(340));

  // ----- 눈 -----
  let eyeY = cy - 8;
  let eyeW = 56, eyeH = 28, offsetX = 55;

  stroke(0);
  strokeWeight(2);
  fill(eyeWhite);
  ellipse(cx - offsetX, eyeY, eyeW, eyeH);
  ellipse(cx + offsetX, eyeY, eyeW, eyeH);

  noStroke();
  fill(iris);
  circle(cx - offsetX, eyeY, 16);
  circle(cx + offsetX, eyeY, 16);
  fill(0);
  circle(cx - offsetX, eyeY, 8);
  circle(cx + offsetX, eyeY, 8);
  fill(255);
  circle(cx - offsetX - 3, eyeY - 3, 4);
  circle(cx + offsetX - 3, eyeY - 3, 4);

  // ----- 코(심플) -----
  stroke(90, 70, 60);
  strokeWeight(2);
  line(cx, cy + 0, cx - 4, cy + 28);
  noFill();
  arc(cx, cy + 28, 22, 12, radians(20), radians(160));

  // ----- 입(연한 직선+아크) -----
  stroke(120, 60, 70);
  strokeWeight(2);
  noFill();
  arc(cx, cy + 58, 52, 20, radians(200), radians(340));
  noStroke();
  fill(lip);
  arc(cx, cy + 60, 52, 16, radians(20), radians(160));

  // ----- 안경(둥근 메탈 프레임) -----
  noFill();
  stroke(metal);
  strokeWeight(3);
  ellipse(cx - offsetX, eyeY, eyeW + 10, eyeH + 12);
  ellipse(cx + offsetX, eyeY, eyeW + 10, eyeH + 12);
  line(cx - offsetX + (eyeW+10)/2, eyeY, cx + offsetX - (eyeW+10)/2, eyeY); // 브릿지
  // 다리(귀 방향)
  line(cx - offsetX - (eyeW+10)/2, eyeY, cx - faceW*0.55 + 10, cy + 4);
  line(cx + offsetX + (eyeW+10)/2, eyeY, cx + faceW*0.55 - 10, cy + 4);

  // ----- 볼 살짝 -----
  noStroke();
  fill(255, 140, 140, 60);
  ellipse(cx - offsetX, cy + 36, 24, 16);
  ellipse(cx + offsetX, cy + 36, 24, 16);
}
