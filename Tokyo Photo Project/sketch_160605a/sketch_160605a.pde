//Samuel Cooper
//Flipbook 
//C3-in-Japan

PImage img1, img2;
JSONObject photoMetadata;

void setup(){
  photoMetadata = loadJSONObject("photo_metadata.json");
  img1 = loadImage("img_1.jpg");
  //background(loadImage("img_2.jpg"));
  size(500,667);
}
    
void draw(){
  //image(img2,0,0);
  image(img1,0,0);
  loadPixels();
  for (int i = 0; i < width*height; i++) {
      pixels[int(random(0,width*height))] = color(0,0,0,100);
  }
  updatePixels();
  
}
