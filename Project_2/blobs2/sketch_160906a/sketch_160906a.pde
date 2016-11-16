//Samuel Cooper
//fisica credit: Ricarch Marxer

import fisica.*;
FWorld world;
FBlob[] Blobs;
FCircle sensorBody;
FMouseJoint joint;
int sensorSize = 0;
int vertexCount = 3;
boolean hasNotExecuted = true;
int blobsCounter = 0;
PImage popcorn;

void setup() {
  background(200);
  size(400, 400);

  Fisica.init(this);
  popcorn = loadImage("popcorn.png");

  world = new FWorld();
  world.setEdges();

  Blobs = new FBlob[25];
  sensorBody = new FCircle(sensorSize);

  sensorBody.setFill(200, 0);

  for (int i=0; i<25; i++) {
    Blobs[i] = new FBlob();
    Blobs[i].setAsCircle(random(50, 350), random(50, 350), 20, vertexCount);
    Blobs[i].setDensity(1000);
    Blobs[i].setRestitution(1.6);
    Blobs[i].setFill(230, 220, 115);
    world.add(Blobs[i]);
    vertexCount++;
  }

  vertexCount = 3;

  sensorBody.setPosition(height/2, width/2);

  world.add(sensorBody);
}

void draw() {
  world.setGravity(0, 100);

  background(200);

  world.step();
  world.draw();  

  if (frameCount%100==0) {
    hasNotExecuted = true;
  }
}

void contactPersisted(FContact contact) {
  print(contact.getBody1() + ", " + contact.getBody2());
  if (hasNotExecuted==true && contact.getBody1().toString() != "FBox@47d7d8b6") {
    if (blobsCounter < 25) {
      FBlob blobby = new FBlob();
      blobby.setAsCircle(contact.getX(), contact.getY()-10, 10, vertexCount);
      blobby.attachImage(popcorn);
      world.add(blobby);
      vertexCount++;
      world.remove(Blobs[blobsCounter]);
      blobsCounter++;
    } else {
      exit();
    }
  }
  hasNotExecuted = false;
}