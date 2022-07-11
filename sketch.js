// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using MobileNet and p5.js
This example uses a callback pattern to create the classifier
=== */

let content = "Loading";
let nwidth
let nheight
let classifier;
let video;
let resultss = {
  0: {label: "Rock", confidence:0},
  1: {label: "Rock", confidence:0},
  2: {label: "Rock", confidence:0},
}

function startCountdown(){
  var count = 0
  var timer = setInterval(function(){
  content = count;
  if (count > 3){
    content = "Go!"
    // TODO: call another function which decides about who's won and then spit out the winner either html or as render
    clearInterval(timer)
  }
  count++;
}, 1000)

}

function setup() {
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  console.log("I'm guessing a Video Ratio of " + video.width / video.height)
  ratio = video.width / video.height

  nheight = 500
  nwidth = 500 * ratio

  var canvas = createCanvas(nwidth, nheight);

  canvas.background('rgab(0, 0, 0, 0)')
  canvas.parent('video');

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DFUUqCkHR/", video, modelReady);
}

function draw() {
  background(255)
  image(video, 0, 0, nwidth, nheight)
  textSize(50)
  text(content, nwidth/2, nheight/2)
  document.getElementById("guess").innerText = resultss[0].label
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
  // The results are in an array ordered by confidence.
  classifyVideo();
}