// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
This example uses a callback pattern to create the classifier
=== */

// Enum classame states
class Stages {
  static None = new Stages("None");
  static Start = new Stages("Start");
  static Choosing = new Stages("Choosing");
  static End = new Stages("End");

  constructor(state) {
    this.state = state;
  }

  toString(){
    return this.state
  }
}

const VIDEOHEIGHT = 500;

count = 0
function countToThree(callback) {
    count = 0
    let timer = setInterval(function () {
      if (count >= 5) {
        callback()
        clearInterval(timer)
      } else {
        count++
      }
    }, 1000)
}

let STAGE = Stages.None
prev = STAGE
function updateStageChange() {
  if (prev != STAGE){
    stageChanges(STAGE)
    prev = STAGE
  }
}

// Like draw_stage but gets only executed when state changes
function stageChanges(stage){
  console.log("Stage changed!")
  switch (stage) {
    case Stages.Start:
      setTimeout(() => {
       STAGE = Stages.Choosing 
      }, 5000); 
      break;
    case Stages.Choosing:
      classifyVideo()
      countToThree(() => {
        STAGE = Stages.End
      })  
      break;
    case Stages.End:
      classifyVideo()      
      break;

  
    default:
      break;
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
      background(255)
      textAlign(CENTER)
      fill(0)
      text("Starting Game!", ratio * VIDEOHEIGHT / 2, VIDEOHEIGHT / 2)
      break;
    case Stages.Choosing:
      image(video, 0, 0, ratio * VIDEOHEIGHT, VIDEOHEIGHT)
      textAlign(CENTER)
      fill(0)
      text(count, ratio * VIDEOHEIGHT / 2, VIDEOHEIGHT / 2)
      break;
    case Stages.End:
      break;
    default:

      break;
  }
}

function modelReady() {
  console.log('Model Ready');
  STAGE = Stages.Start
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  resultss = results
  console.log(results)
  //TODO: handle relusts with enums
  if (!err && STAGE == Stages.Choosing) {
      classifyVideo();
  }
}

// Start main 
let ratio

let classifier
let video


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
  updateStageChange()
  draw_stage(STAGE)
}
