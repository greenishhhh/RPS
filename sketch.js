// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
This example uses a callback pattern to create the classifier
=== */

// Enum class Stages to manage game states
class Stages {
  static None = new Stages("None");
  static Start = new Stages("Start");
  static Choosing = new Stages("Choosing");
  static End = new Stages("End");

  constructor(state) {
    this.state = state;
  }
}

const VIDEOHEIGHT = 500;

class Countdown {
  constructor() {
    self.count = 0
  }

  startCountdown() {
    let timer = setInterval(function () {
      textSize(20)
      if (self.count > 3) {
        STAGE = Stages.Start
        clearInterval(timer)
      }
      self.count++;
    }, 1000)
  }
}

prev = STAGE
function stageChangeEvent(callback) {
  if (prev != STAGE){
    callback()
  }
}

// Function gets executed every frame
function draw_stage(stage) {
  fill(0)
  textSize(50)
  switch (stage) {
    case Stages.None:
      break;
    case Stages.Start:
      textAlign(CENTER)
      fill(0)
      text("Starting Game!", ratio * VIDEOHEIGHT / 2, VIDEOHEIGHT / 2)
      break;
    case Stages.Choosing:
      textAlign(CENTER)
      fill(0)
      text(count)
      break;
    default:

      break;
  }
}

function modelReady() {
  console.log('Model Ready');
  setTimeout(() => {
    startCountdown();
  }, 3000);
  classifyVideo();
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  resultss = results
  //TODO: handle relusts with enums
  if (!err) {
      classifyVideo();
  }
}

// Start main 
let ratio

let classifier
let video
// Switching between different game stanges to determen what to do
let STAGE = Stages.None


let resultss = {
  0: { label: "", confidence: 0 },
  1: { label: "", confidence: 0 },
  2: { label: "", confidence: 0 },
}

function setup() {
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  console.log("I'm guessing a Video Ratio of " + video.width / video.height + "Its probably the wrong ratio however this is the only way to determine the video input")
  ratio = video.width / video.height

  var canvas = createCanvas(VIDEOHEIGHT * ratio, VIDEOHEIGHT);

  canvas.background('rgab(0, 0, 0, 0)')
  canvas.parent('video');

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DFUUqCkHR/", video, modelReady);
}

function draw() {
  document.getElementById("guess").innerText = resultss[0].label
  if (ratio != video.width / video.height) {
    ratio = video.width / video.height
    resizeCanvas(ratio * VIDEOHEIGHT, VIDEOHEIGHT)
  }
  background(255)
  image(video, 0, 0, ratio * VIDEOHEIGHT, VIDEOHEIGHT)
  draw_stage(STAGE)
}
