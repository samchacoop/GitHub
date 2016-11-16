
int LENGTH = 70;
float x, y, x2, y2, x3, y3;
float secondsRadius, minutesRadius, hoursRadius;
int previousTime = 0;
boolean timeRepeat = false;

void setup() {
  frameRate(1);
  size(300, 300);
  ellipse(150, 150, 300, 300);
  text("12", 150, 50);

  int radius = min(width, height) / 2;
  secondsRadius = radius * 0.12;
  minutesRadius = radius * 0.25;
  hoursRadius = radius * 0.64;


  hoursRadius = radius * 0.50;
}

void draw() {
  background(255);

  //+ norm(minute(), 0, 60)
  //+norm(second(),0,60)
  float mapHour = map(hour(), 0, 24, 0, TWO_PI*2)-HALF_PI;
  float mapMinute = map(minute(), 0, 60, 0, TWO_PI)-HALF_PI;
  float mapSecond = map(second(), 0, 60, 0, TWO_PI)-HALF_PI;
  //print(mapAngle);

  float mapHourColor = map(hour(), 0, 12, 0, 255);
  float mapMinuteColor = map(minute(), 0, 60, 0, 255);
  float mapSecondColor = map(second(), 0, 60, 0, 255);

  fill(mapHourColor, mapMinuteColor, mapSecondColor, 150);
  
  noStroke();
  ellipse(150, 150, 300, 300);

  x = cos(mapHour)*hoursRadius;
  y = sin(mapHour)*hoursRadius;
  float newX = (width/2)+x;
  float newY = (height/2)+y;

  x2 = cos(mapMinute)*minutesRadius;
  y2 = sin(mapMinute)*minutesRadius;
  float newX2 = newX+x2;
  float newY2 = newY+y2;

  x3 = cos(mapSecond)*secondsRadius;
  y3 = sin(mapSecond)*secondsRadius;
  float newX3 = newX2+x3/2;
  float newY3 = newY2+y3/2;

  fill(mapHourColor, mapMinuteColor, mapSecondColor, 150);
  ellipse(newX, newY, LENGTH*1.5, LENGTH*1.5);

  fill(mapHourColor, mapMinuteColor, mapSecondColor, 255);
  ellipse(newX2, newY2, LENGTH/2.5, LENGTH/2.5);
  
  stroke(0);

  strokeWeight(1);
  line(newX2, newY2, newX3, newY3);
  strokeWeight(2);
  line(newX, newY, newX2, newY2);
  strokeWeight(3);
  line(150, 150, newX, newY);
  strokeWeight(1);


  fill(0);
  //text("12", 145, 20);
  //text("6", 145, 290);
  //text("15", newX+30, newY+5);
  //text("45", newX-45, newY+5);
  //text("60", newX2-7,newY2-7);
  text(hour()+":"+minute(), 10, 10);

  if (second()%15==0 && previousTime!=second()) {
    saveFrame(); 
    previousTime = second();
  }
}