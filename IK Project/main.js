//Credit: https://processing.org/examples/clock.html

var LENGTH = 70;
var x, y, x2, y2, x3, y3, x4, y4;
var milliRadius, secondsRadius, minutesRadius, hoursRadius;
var previousTime = 0;
var timeRepeat = false;

var input, button, sel, sel2;

var hourColor, minuteColor, secondColor, milliColor;

function setup(){
  smooth();
  //frameRate(1);
  createCanvas(windowWidth, windowHeight);
  // ellipse(150, 150, 300, 300);
  // text("12", 150, 50);

  var radius = min(windowWidth, windowHeight) / 1.5;
  milliRadius = radius * 0.0375;
  secondsRadius = radius * 0.075;
  minutesRadius = radius * 0.15;
  hoursRadius = radius * 0.3;	

}

function draw(){


   background(255);

  //+ norm(minute(), 0, 60)
  //+norm(second(),0,60)

  var mapHour = map(hour(), 0, 24, 0, TWO_PI*2)-HALF_PI;
  var mapMinute = map(minute(),0,60,0,TWO_PI)-HALF_PI;
  var mapSecond = map(second(),0,60,0,TWO_PI)-HALF_PI;
  var mapMilli = map(millis(),0,1000,0,TWO_PI)-HALF_PI;

  hourColor = map(hour(),0,12,0,255);
  minuteColor = map(minute(),0,60,0,255);
  secondColor = map(second(),0,60,0,255);
  milliColor = map(millis(),0,1000,0,255);


  x = cos(mapHour)*hoursRadius;
  y = sin(mapHour)*hoursRadius;
  var newX = (windowWidth/2)+x;
  var newY = (windowHeight/2)+y;

  x2 = cos(mapMinute)*minutesRadius;
  y2 = sin(mapMinute)*minutesRadius;
  var newX2 = (newX+x2);
  var newY2 = (newY+y2);

  x3 = cos(mapSecond)*secondsRadius;
  y3 = sin(mapSecond)*secondsRadius;
  var newX3 = newX2+x3;
  var newY3 = newY2+y3;

  x4 = cos(mapMilli)*milliRadius;
  y4 = sin(mapMilli)*milliRadius;
  var newX4 = newX3+x4;
  var newY4 = newY3+y4;
  
  noStroke();

  fill(0,200,hourColor,75);
  ellipse(windowWidth/2, windowHeight/2, windowWidth/2, windowWidth/2);

  fill(255,200,minuteColor, 150);
  ellipse(newX, newY, windowWidth/8, windowWidth/8);

  fill(255, 200, secondColor, 200);
  ellipse(newX2, newY2, windowWidth/16, windowWidth/16);

  fill(0, 200, secondColor, 200);
  ellipse(newX3, newY3, windowWidth/32, windowWidth/32);

  stroke(0);

  strokeWeight(4);
  line(windowWidth/2, windowHeight/2, newX, newY);

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
  var text_size = windowWidth/25;
  textSize(text_size);
  text(hour()%12+":"+minute()+":"+second(), 10, text_size);

  textSize(16);
  text("drag me -->", windowWidth-92, 10)

}

