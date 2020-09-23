
/*
Noch zu tun:
Bei resize Figuren neu zeichnen oder Figurenzeichnen in draw machen

*/

//Pieces Klasse inkludieren
function include(file){
  var script = document.createElement("script");
  script.scr = file;
  script.type = "text/javascript";
  script.defer = true;
  document.body.appendChild(script);
}
include("./Piece.js");
var p = new Piece("King", 4, 4, 0);

//Globale Variablen erzeugen
var leinwand;
var context;
var div;
var offset = 30;
var canvasSize = Math.min(window.innerWidth, window.innerHeight) - offset;
var tileSize = canvasSize/8;
var mouseX;
var mouseY;
var Pieces = [];
var numOfPieces;
var rect;       //Rectangle of Canvas

//Eventlistener
window.addEventListener("resize", resizeCanvas);
window.addEventListener("click", click);

//Canvas erstellen
function addCanvas(){
  //Canvas einfügen
  leinwand = document.createElement("canvas");
  leinwand.id = "canvas";
  context = leinwand.getContext("2d");
  leinwand.width = canvasSize;
  leinwand.height = canvasSize;
  div = document.getElementById("div");
  document.body.insertBefore(leinwand, div);
}


//Das passiert alles wenn das Fenster resized wird
function resizeCanvas(){
  canvasSize = Math.min(window.innerWidth, window.innerHeight) - offset;
  leinwand.width = canvasSize;
  leinwand.height = canvasSize;square
  tileSize = canvasSize/8;
    //draw();
}
  //Das wird alles gezeichnet
function draw(){
    //Schachbrettmuster
  context.fillStyle = "#694a00";
  context.fillRect(0, 0, canvasSize, canvasSize);
  context.fillStyle = "#9e8400";
  for(i = 0;i<4;i++){
    for(j = 0;j<4;j++){
      context.fillRect(tileSize*j*2, tileSize*2*i, tileSize, tileSize);
    }
    for(j = 0;j<4;j++){
      context.fillRect(tileSize*(2*i+1), tileSize*(1+j*2), tileSize, tileSize);
    }
  }
    //Figuren zeichnen
  fillStyle = "#000000";
  numOfPieces = Pieces.length;
  for(i = 0;i<numOfPieces;i++){
    context.fillRect(Pieces[i].x, Pieces[i].y, tileSize-10, tileSize-10);
  }
}
  //Das passiert bei einem Mausklick
function click(){
  rect = leinwand.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
  //draw();
  //context.fillStyle();
  context.fillRect(mouseX, mouseY, 40, 40);
}

function initPieces(){
  var p = new Piece("rook", 7, 7, 0);
  Pieces.push(new Piece("rook", 7, 7, 0));
}

function execute(){
  initPieces();
  addCanvas();
  draw();
}
execute();
