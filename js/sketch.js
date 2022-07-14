// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
This example uses a callback pattern to create the classifier
=== */

const VIDEOHEIGHT = 500;
error = false


class Choice{
  static Stein = new Choice("Stein")
  static Schere = new Choice("Schere")
  static Papier = new Choice("Papier")
  static choices = [Choice.Stein, Choice.Papier, Choice.Schere]

  //  Determines who wins the game Player 1 or 2
  //  R P S 2
  //R 0 2 1
  //P 1 0 2
  //S 2 1 0
  //1
  static winnerTable = [
    [ 0, 2, 1],
    [ 1, 0, 2],
    [ 2, 1, 0],
  ]

  constructor(name){
    this.choice = name
  }

  static fromString(label){
    switch (label.toLowerCase()) {
      case "schere", "scissors":
        return Choice.Schere
      case "stein", "stone", "rock":
        return Choice.Stein
      case "papier", "paper":
        return Choice.Papier
      default:
        throw `Cant match string to choice ${label.toLowerCase()}`
    }
  }

  static getRandom(){
    let a = int(Math.random() * 3)
    return this.choices[a]
  }

  static getWinner(one, two){
    if (one === undefined || two === undefined){
      throw "Player one or two are undefined"
      return "Error occured"
    }
    return this.winnerTable[this.choices.indexOf(one)][this.choices.indexOf(two)]
  }
  
  toString(){
    return this.choice;
  }
}

class Player {
  constructor(name){
    this.name = name,
    this.choice
  }
}

class Game {

  constructor(){
    if (Game._instance){
      return Game._instance;
    }
    Game._instance = this;
    this.one = new Player("Spieler")
    this.two = new Player("Computer")
  }

  calcComputerMove(){
    this.two.choice = Choice.getRandom();
  }

  setPlayerMove(move){
    this.one.choice = move
  }

  //returns int for player id 
  getWinner(){
    return Choice.getWinner(this.one.choice, this.two.choice)
  }

  //PlayerID to Message
  getWinnerMessage(){
    let winner = this.getWinner()

    switch (winner) {
      case 0:
        return `Unentschieden mit\n${this.one.choice}`
      
      case 1: 
        return `${this.one.name} gewinnt\n${this.one.choice} gegen ${this.two.choice}`

      case 2:
        return `${this.two.name} gewinnt\n${this.two.choice} gegen ${this.one.choice}`

      default:
        error = "Fehler, bitte gucke in die Logs"
 
        return error
      }
  }
}

// Enum classame states
class Stages {
  static None = new Stages("None");
  static Start = new Stages("Start");
  static Choosing = new Stages("Choosing");
  static Result = new Stages("Result");
  static End = new Stages("End");

  constructor(state) {
    this.state = state;
  }

  toString(){
    return this.state
  }
}

// defined set function for STAGE.current, call stageChanges on every stage change
const STAGE = {
  _stage : Stages.None,
  set current(stage) { this._stage = stage; stageChanges(stage, game);},
  get current() {return this._stage}
}


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

// You could make this "case hell" more prettie with class patterns  
// Like draw_stage but gets only executed when state changes
function stageChanges(stage, game){
  if (error){
    console.error("Wont continue due to error")
    return
  }
  switch (stage) {
    case Stages.Start:
      setTimeout(() => {
       STAGE.current = Stages.Choosing 
      }, 5000); 
      break;
    case Stages.Choosing:
      classifyVideo()
      countToThree(() => {
        STAGE.current = Stages.Result
      })  
      break;
    case Stages.Result:
      classifyVideo()
      game.one.choice = Choice.fromString(resultss[0]["label"])
      game.calcComputerMove()
      setTimeout(() => {
        STAGE.current = Stages.End
      }, 5000);
      break;

    case Stages.End:
      setTimeout(() => {
        STAGE.current = Stages.Choosing
      }, 5000);
      break;

  
    default:
      break;
  }
}

// Function gets executed every frame
function draw_stage(stage, game) {
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
      background(255)
      image(video, 0, 0, ratio * VIDEOHEIGHT, VIDEOHEIGHT)
      textAlign(CENTER)
      fill(0)
      text(count, ratio * VIDEOHEIGHT / 2, VIDEOHEIGHT / 2)
      break;
    case Stages.Result:
      background(255)
      textAlign(CENTER)
      fill(0)
      text(game.getWinnerMessage(), ratio * VIDEOHEIGHT / 2, VIDEOHEIGHT / 2)
      break;
    default:

      break;
  }
}

function modelReady() {
  console.log('Model Ready');
  STAGE.current = Stages.Start
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(gotResult);
}

// When we get a result
function gotResult(err, results) {
  resultss = results
  //TODO: handle relusts with enums
  if (err){
    error = err
  } else if (STAGE.current == Stages.Choosing) {
      classifyVideo();
  }
}

// Start main 
let ratio

let classifier
let video

let game

let resultss = { // TODO Fix ugly
  0: { label: "", confidence: 0 },
  1: { label: "", confidence: 0 },
  2: { label: "", confidence: 0 },
}

function setup() {
  // Create a camera input
  video = createCapture(VIDEO);
  video.hide();
  ratio = video.width / video.height

  game = new Game();


  var canvas = createCanvas(VIDEOHEIGHT * ratio, VIDEOHEIGHT);

  canvas.background('rgab(0, 0, 0, 0)')
  canvas.parent('video');

  // Initialize the Image Classifier method with MobileNet and the video as the second argument
  classifier = ml5.imageClassifier("model/model.json", video, modelReady);
}

function draw() {
  document.getElementById("guess").innerText = resultss[0].label
  if (ratio != video.width / video.height) {
    ratio = video.width / video.height
    resizeCanvas(ratio * VIDEOHEIGHT, VIDEOHEIGHT)
  }
  draw_stage(STAGE.current, game)
}
