/**
 *  p5.PeakDetect listens for peaks at a specific part of the
 *  frequency spectrum.
 *
 *  In this example, we listen for the shaker.
 *
 *  For more, see: http://p5js.org/reference/#/p5.PeakDetect
 */

// var cnv, soundFile, fft, peakDetect;
// var ellipseWidth = 10;

// function setup() {
//   background(0);
//   createCanvas(windowWidth, windowHeight);
//   noStroke();
//   fill(255);
//   textAlign(CENTER);

//   soundFile = loadSound('../../music/YACHT_-_06_-_Summer_Song_Instrumental.mp3');

//   // p5.PeakDetect requires a p5.FFT
//   fft = new p5.FFT();

//   peakDetect = new p5.PeakDetect(4000, 12000, 0.2);

// }

// function draw() {
//   background(0);
//   text('click to play/pause', width/2, height/4);

//   // peakDetect accepts an fft post-analysis
//   fft.analyze();
//   peakDetect.update(fft);

//   if ( peakDetect.isDetected ) {
//     ellipseWidth = 300;
//   } else {
//     ellipseWidth *= 0.95;
//   }

//   ellipse(width/2, height/2, ellipseWidth, ellipseWidth);
// }

// // toggle play/stop when canvas is clicked
// function mouseClicked() {
//   if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
//     if (soundFile.isPlaying() ) {
//       soundFile.stop();
//     } else {
//       soundFile.play();
//     }
//   }
// }

////////////////////

/**
 *  Auto Correlation multiples each sample in a buffer by all
 *  of the other samples. This emphasizes the fundamental
 *  frequency. Auto Correlation is useful for pitch detection,
 *  as well as for visualization
 *  
 *  This example is a Correlogram which is a plot
 *  of the autocorrelations.
 *  
 *  Example by Jason Sigal and Golan Levin.
 */

var source, fft;
var bNormalize = true;
var centerClip = false;
var largest;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();

  source = new p5.AudioIn();
  source.start();

  fft = new p5.FFT();
  fft.setInput(source);
  peakDetect = new p5.PeakDetect(4000, 12000, 0.2);
}

function draw() {
  background(255,10);
  fft.analyze();
  peakDetect.update(fft);
  // array of values from -1 to 1
  var timeDomain = fft.waveform(1024, 'float32');
  var corrBuff = autoCorrelate(timeDomain);
  // beginShape();
    for (var i = 0; i < corrBuff.length; i++) {
      var w = map(i, 0, corrBuff.length, 0, width);
      var h = map(corrBuff[i], -1, 1, height, 0);
      if (corrBuff[i]>largest) {
        largest = corrBuff[i];
      }
      if(corrBuff[i]>corrBuff[i+1] && corrBuff[i]>corrBuff[i-1]){
        stroke(0,20);
        line(0,h,windowWidth,h)
        stroke(255,0,0)
        line(w-20, h,w+20,h);
      } else if (corrBuff[i]<corrBuff[i+1] && corrBuff[i]<corrBuff[i-1]){
        stroke(100,20);
        line(0,h,windowWidth,h)
        stroke(0,200,200)
        line(w-20, h,w+20,h);
      }
      
    }
    // endShape();
}


function autoCorrelate(buffer) {
  var newBuffer = [];
  var nSamples = buffer.length;

  var autocorrelation = [];

  // center clip removes any samples under 0.1
  if (centerClip) {
    var cutoff = 0.1;
    for (var i = 0; i < buffer.length; i++) {
      var val = buffer[i];
      buffer[i] = Math.abs(val) > cutoff ? val : 0;
    }
  }

  for (var lag = 0; lag < nSamples; lag++){
    var sum = 0; 
    for (var index = 0; index < nSamples; index++){
      var indexLagged = index+lag;
      if (indexLagged < nSamples){
        var sound1 = buffer[index];
        var sound2 = buffer[indexLagged];
        var product = sound1 * sound2;
        sum += product;
      }
    }

    // average to a value between -1 and 1
    newBuffer[lag] = sum/nSamples;
  }

  if (bNormalize){
    var biggestVal = 0;
    for (var index = 0; index < nSamples; index++){
      if (abs(newBuffer[index]) > biggestVal){
        biggestVal = abs(newBuffer[index]);
      }
    }
    for (var index = 0; index < nSamples; index++){
      newBuffer[index] /= biggestVal;
    }
  }

  return newBuffer;
}

function mousePressed() {
  saveFrames("out", "png", 1, 25, function(data){
    print(data);
  });
}