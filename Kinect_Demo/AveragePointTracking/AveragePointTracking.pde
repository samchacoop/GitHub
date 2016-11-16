//Samuel Cooper
//Credit: Daniel Shiffman

import org.openkinect.freenect.*;
import org.openkinect.processing.*;
//import themidibus.*; 

Kinect kinect;
KinectTracker tracker;
//MidiBus myBus;

int zPos = 120;
int deg = 15;

void setup() {
  frameRate(30);
  size(640, 520, P3D);

  //MidiBus.list(); // List all available Midi devices on STDOUT. This will show each device's index and name.
  //myBus = new MidiBus(this, 0, 1); 
  kinect = new Kinect(this);
  tracker = new KinectTracker();
  directionalLight(126, 126, 126, 0, 0, -1);
  ambientLight(102, 102, 102);
  //translate(50,200,0);
  translate(50, 200, 0);
}

void draw() {
  background(200, 20);

//  int channel = 0;
//  int pitch = 64;
//  int velocity = 127;

//  myBus.sendNoteOn(channel, pitch, velocity); // Send a Midi noteOn
//  delay(200);
//  myBus.sendNoteOff(channel, pitch, velocity); // Send a Midi nodeOff

//  int number = 0;
//  int value = 90;

//  myBus.sendControllerChange(channel, number, value); // Send a controllerChange
//  delay(2000);

  tracker.track();
  // Show the image
  PVector v2 = tracker.getLerpedPos();
  //float pitchMap = map(pitch,48,72,0,255);
  fill(200, 0, 50);

  float thetaX = map(v2.x, 0, 400, 0, PI); 
  float thetaY = map(v2.y, 0, 400, 0, PI);

  camera(100, 100, 120, 0, 0, 0.0, 
    0.0, 1.0, 0.0);

  pushMatrix();
  rotateY(-thetaX);
  rotateX(-thetaY);
  box(20, 20, 50);
  translate(50, 0, 0);
  box(20, 20, 50);
  translate(-50, 0, 50);
  box(150, 20, 20);
  translate(0, 0, -100);
  box(150, 20, 20);
  popMatrix();

}