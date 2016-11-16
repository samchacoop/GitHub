//Samuel Cooper / Sadie Donnelly
float x, y, x2, y2, x3, y3, x4, y4;
float milliRadius, secondsRadius, minutesRadius, hoursRadius;
int timeAmt;

void setup(){
 frameRate(30);
 size(400,400); 
 
 float radius = min(width, height) / 1.5;
  milliRadius = radius * 0.04;
  secondsRadius = radius * 0.08;
  minutesRadius = radius * 0.15;
  hoursRadius = radius * 0.3;  
  
  timeAmt = 5;
  
}

void draw(){
background(255);  
  
int hoursPassed = int(frameCount/(3600*30));
int minutesPassed = int(frameCount/(60*30));
int secondsPassed = frameCount/30;
int millisPassed = frameCount*100/30;


if(timeAmt == minutesPassed) {
  noLoop();
} else {
  float mapHour = map(hoursPassed, 0, 12, 0, TWO_PI)-HALF_PI;
  float mapMinute = map(minutesPassed,0,60,0,TWO_PI)-HALF_PI;
  float mapSecond = map(secondsPassed,0,60,0,TWO_PI)-HALF_PI;
  float mapMilli = map(millisPassed,0,100,0,TWO_PI)-HALF_PI;
  
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
  float newX3 = newX2+x3;
  float newY3 = newY2+y3;

  x4 = cos(mapMilli)*milliRadius;
  y4 = sin(mapMilli)*milliRadius;
  float newX4 = newX3+x4;
  float newY4 = newY3+y4;
  
   noStroke();

  fill(255,200,0,75);
  ellipse(width/2, height/2, width/2, width/2);

  fill(255,200,10, 150);
  ellipse(newX, newY, width/4, width/4);

  fill(255, 200, 100, 200);
  ellipse(newX2, newY2, width/8, width/8);

  fill(255, 200, 255, 255);
  ellipse(newX3, newY3, width/16, width/16);

  stroke(0);

  strokeWeight(4);
  line(width/2, height/2, newX, newY);

  strokeWeight(3);
  line(newX, newY, newX2, newY2);

  strokeWeight(2);
  line(newX2, newY2, newX3, newY3);

  strokeWeight(1);
  line(newX3, newY3, newX4, newY4);

  //text("12", 145, 20);
  //text("6", 145, 290);
  //text("15", newX+30, newY+5);
  //text("45", newX-45, newY+5);
  //text("60", newX2-7,newY2-7);

  fill(0);

  text(timeAmt+" "+"Minute"+ " Countdown",10,10);
  text(hoursPassed+":" +minutesPassed+":"+secondsPassed%60, 10, 22);

}

}