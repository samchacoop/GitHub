//Samuel Cooper
//CRCP 5320

import fisica.*;
import org.jbox2d.common.*;
import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.effects.*;
import ddf.minim.signals.*;
import ddf.minim.spi.*;
import ddf.minim.ugens.*;

Minim       minim;
AudioOutput out;
Oscil       wave;

FWorld world;
FBox obstacle;
FBox ObsArray[];
FBlob BlobsArray[];
FBlob myBlob = new FBlob();
FBlob myBlob2 = new FBlob();
FBlob myBlob3 = new FBlob();
FBlob myBlob4 = new FBlob();

int r, g, b;


void setup() {
  frameRate(30);
  size(500, 500, P3D);
  smooth();


  Fisica.init(this);

  world = new FWorld();
  world.setEdges();

  myBlob.setFillColor(250);
  myBlob.setAsCircle(250, 250, 400);
  myBlob.setDensity(1);
  myBlob.setFill(0, 0, 250);
  myBlob.setStrokeWeight(0);
  myBlob.addTorque(1000);
  world.add(myBlob);


  myBlob2.setFillColor(250);
  myBlob2.setAsCircle(250, 250, 200);
  myBlob2.setDensity(2);
  myBlob2.setFill(0, 0, 250);
  myBlob2.setStrokeWeight(3);
  myBlob2.addTorque(1000);
  world.add(myBlob2);

  myBlob3.setFillColor(250);
  myBlob3.setAsCircle(250, 250, 100);
  myBlob3.setDensity(3);
  myBlob3.setFill(0, 0, 250);
  myBlob3.setStrokeWeight(6);
  myBlob3.addTorque(1000);
  world.add(myBlob3);

  myBlob4.setFillColor(250);
  myBlob4.setAsCircle(250, 250, 50);
  myBlob4.setDensity(4);
  myBlob4.setFill(0, 0, 250);
  myBlob4.setStrokeWeight(12);
  myBlob4.addTorque(1000);
  world.add(myBlob4);

  minim = new Minim(this);

  //Credit: Minim online example http://code.compartmental.net/minim/waves_field_triangle.html
  out = minim.getLineOut();
  wave = new Oscil(440, 0.5f, Waves.SINE);
  wave.patch( out );
}

void draw() {
  out.mute();
  background(225);
  //fill(200,20);//alpha channel is the key to get motion blur effect! Try different value.
  //rect(0,0,width,height);
  if (frameCount % 60==0) {
    r = int(random(255));
    g = int(random(255));
    b = int(random(255));
  }


  myBlob.setFill(r, b, g-255, 20);
  myBlob2.setFill(r-255, b, g, 20);
  myBlob3.setFill(r, b-255, g, 20);
  myBlob4.setFill(r, b, g, 20);

  myBlob.setStroke(r, g, b-255);
  myBlob2.setStroke(r, g-255, b);
  myBlob3.setStroke(r-255, g, b);
  myBlob4.setStroke(r, g, b);

  world.draw();
  world.step();


  if (r < 100 & g < 100) {
    world.setGravity(-r-200, -g-200);
  } 
  if (r > 100 & g < 100) {
    world.setGravity(r, -g-200);
  }
  if (r < 100 & g > 100) {
    world.setGravity(-r-200, g);
  }
  if (r > 100 & g > 100) {
    world.setGravity(r, g);
    //ObsArray[0].setStatic(false);
  }
}

//Credit: Ricard Marxer http://www.ricardmarxer.com/fisica/reference/index.html
void contactResult(FContactResult result) {
  out.unmute();
   //Credit: Minim http://code.compartmental.net/minim/waves_field_triangle.html
  float amp = map(result.getY(), 0, height, 0.5, 0 );
  wave.setAmplitude( amp );
  float freq = map(result.getX(), 0, width, 110, 440 );
  wave.setFrequency( freq );
}