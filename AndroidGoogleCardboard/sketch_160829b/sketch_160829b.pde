//Scott Little 2015, GPLv3
//pBoard is Processing for Cardboard

import android.os.Bundle; //for preventing sleep
import android.view.WindowManager;
import ketai.sensors.*; //ketai library for sensors
KetaiSensor sensor;

float ax,ay,az,mx,my,mz; //sensor variables
float eyex = 50; //camera variables
float eyey = 50;
float eyez = 0;
float panx = 0;
float pany = 0;
PGraphics lv; //left viewport
PGraphics rv; //right viewport
PShape s; //the object to be displayed

//********************************************************************
// The following code is required to prevent sleep.
//********************************************************************
void onCreate(Bundle savedInstanceState) {
super.onCreate(savedInstanceState);
// fix so screen doesn't go to sleep when app is active
getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
}
//********************************************************************

void setup() {
sensor = new KetaiSensor(this);
sensor.start();

size(displayWidth,displayHeight,P3D); //used to set P3D renderer
orientation(LANDSCAPE); //causes crashing if not started in this orientation

lv = createGraphics(displayWidth/2,displayHeight,P3D); //size of left viewport
rv = createGraphics(displayWidth/2,displayHeight,P3D);

PImage img = loadImage("jake.jpg");  //texture image
s = createShape();
TexturedCube(img, s, 50, 50);
}

void draw(){
//draw something fancy on every viewports
panx = panx-mx*10;
pany = 0;
eyex = 0;
eyey = -20*az;

ViewPort(lv, eyex, eyey, panx, pany, -15); //left viewport
ViewPort(rv, eyex, eyey, panx, pany, 15);  //right viewport

//add the two viewports to your main panel
image(lv, 0, 0);
image(rv, displayWidth/2, 0);
}

//sensor data
void onAccelerometerEvent(float x, float y, float z){
ax = x;
ay = y;
az = z;
}

void onGyroscopeEvent(float x, float y, float z){
mx = x;
my = y;
mz = z;
}

//
void ViewPort(PGraphics v, float x, float y, float px, float py, int eyeoff){
v.beginDraw();
v.background(102);
v.lights();
v.pushMatrix();
v.camera(x+eyeoff, y, 300, px, py, 0, 0.0, 1.0, 0.0);
v.noStroke();
//v.box(100);
v.shape(s);
v.popMatrix();
v.endDraw();
}

//put a texture on PShape object, 6 faces for a cube
void TexturedCube(PImage tex, PShape s, int a, int b) {
s.beginShape(QUADS);
s.texture(tex);

// +Z "front" face
s.vertex(-a, -a, a, 0, b);
s.vertex( a, -a, a, b, b);
s.vertex( a, a, a, b, 0);
s.vertex(-a, a, a, 0, 0);

// -Z "back" face
s.vertex( a, -a, -a, 0, 0);
s.vertex(-a, -a, -a, b, 0);
s.vertex(-a, a, -a, b, b);
s.vertex( a, a, -a, 0, b);

// +Y "bottom" face
s.vertex(-a, a, a, 0, 0);
s.vertex( a, a, a, b, 0);
s.vertex( a, a, -a, b, b);
s.vertex(-a, a, -a, 0, b);

// -Y "top" face
s.vertex(-a, -a, -a, 0, 0);
s.vertex( a, -a, -a, b, 0);
s.vertex( a, -a, a, b, b);
s.vertex(-a, -a, a, 0, b);

// +X "right" face
s.vertex( a, -a, a, 0, 0);
s.vertex( a, -a, -a, b, 0);
s.vertex( a, a, -a, b, b);
s.vertex( a, a, a, 0, b);

// -X "left" face
s.vertex(-a, -a, -a, 0, 0);
s.vertex(-a, -a, a, b, 0);
s.vertex(-a, a, a, b, b);
s.vertex(-a, a, -a, 0, b);

s.endShape();
}