
class Board{

  constructor(){
    include("./King.js");
    include("./Queen.js");
    include("./Rook.js");
    include("./Pawn.js");
    include("./Bishop.js");
    include("./Knight.js");
    this.initPieces();
  }



  draw(context, canvasSize, tileSize){
    this.drawBoard(context, canvasSize, tileSize);
    this.drawPieces(context, tileSize);
  }


  drawBoard(context, canvasSize, tileSize){
    //Chessboardtemplate
    context.fillStyle = "#694a00";
    context.fillRect(0, 0, canvasSize, canvasSize);
    context.fillStyle = "#9e8400";
    for(let i = 0;i<4;i++){
      for(let j = 0;j<4;j++){
        context.fillRect(tileSize*j*2, tileSize*2*i, tileSize, tileSize);
      }
      for(let j = 0;j<4;j++){
        context.fillRect(tileSize*(2*i+1), tileSize*(1+j*2), tileSize, tileSize);
      }
    }
  }

  //Drawing all Pieces
  drawPieces(context, tileSize){
    //Font and Size
    var numStr = tileSize.toString(10);
    context.font = numStr + "px Verdana";

    //First Black Pieces then white Pieces
    var numBlackPieces = this.blackPieces.length;
    for(let i = 0;i<numBlackPieces;i++){
      context.fillStyle = "black";
      this.blackPieces[i].draw(context, tileSize);
    }

    var numWhitePieces = this.whitePieces.length;
    for(let i = 0;i<numWhitePieces;i++){
      context.fillStyle = "white";
      this.whitePieces[i].draw(context, tileSize);
    }
  }

  //This happens when a click happens
  tileClicked(context, mouseX, mouseY, tileSize, canvasSize){
    //Which tile was clicked
    var tileX = Math.floor(mouseX/tileSize);
    var tileY = Math.floor(mouseY/tileSize);



    //Move selected Piece to selected Tile; Remove captured Piece; Unselect; Redraw
    if(this.possMoves.length != 0){
      for(let i=0; i<this.possMoves.length;i++){
        if(tileX==this.possMoves[i][0] && tileY==this.possMoves[i][1]){

          //First removing the Piece that is already there
          //If selectedPiece isWhite, only Black Pieces have to be checked
          if(this.selectedPiece.isWhite){
            for(let j = 0;j<this.blackPieces.length;j++){
              if(this.blackPieces[j].x == tileX && this.blackPieces[j].y == tileY){
                this.blackPieces.splice(j, 1);
                break;
              }
            }
          }
          //If selectedPiece is not White, only White Pieces have to be checked
          else{
            for(let j = 0;j<this.whitePieces.length;j++){
              if(this.whitePieces[j].x == tileX && this.whitePieces[j].y == tileY){
                this.whitePieces.splice(j, 1);
                break;
              }
            }
          }
          //Then moving Piece there
          this.selectedPiece.x = tileX;
          this.selectedPiece.y = tileY;
        }
      }
      this.possMoves = [];
      this.selectedPiece = [];

      this.draw(context, canvasSize, tileSize);
    }

    //If no Piece is selected, is there now?
    else{
      //Draw Piece gray
      var numBlackPieces = this.blackPieces.length;
      for(let i = 0;i<numBlackPieces;i++){
        if(this.blackPieces[i].x == tileX && this.blackPieces[i].y == tileY){
          this.selectedPiece = this.blackPieces[i];
          this.possMoves = this.blackPieces[i].clicked(context, tileSize, this.whitePieces, this.blackPieces);
        }
      }

      var numWhitePieces = this.whitePieces.length;
      for(let i = 0;i<numWhitePieces;i++){
        if(this.whitePieces[i].x == tileX && this.whitePieces[i].y == tileY){
          this.selectedPiece = this.whitePieces[i];
          this.possMoves = this.whitePieces[i].clicked(context, tileSize, this.whitePieces, this.blackPieces);
        }
      }
    }
  }

  //initializing Pieces
  initPieces(){
    this.whitePieces = [];
    this.blackPieces = [];

    this.whitePieces.push(new King(4, 7, true));
    this.whitePieces.push(new Queen(3, 7, true));
    this.whitePieces.push(new Bishop(2, 7, true));
    this.whitePieces.push(new Bishop(5, 7, true));
    this.whitePieces.push(new Knight(1, 7, true));
    this.whitePieces.push(new Knight(6, 7, true));
    this.whitePieces.push(new Rook(0, 7, true));
    this.whitePieces.push(new Rook(7, 7, true));
    for(let i = 0; i<8;i++){
      this.whitePieces.push(new Pawn(i, 6, true));
    }
    this.blackPieces.push(new King(4, 0, false));
    this.blackPieces.push(new Queen(3, 0, false));
    this.blackPieces.push(new Bishop(2, 0, false));
    this.blackPieces.push(new Bishop(5, 0, false));
    this.blackPieces.push(new Knight(1, 0, false));
    this.blackPieces.push(new Knight(6, 0, false));
    this.blackPieces.push(new Rook(0, 0, false));
    this.blackPieces.push(new Rook(7, 0, false));
    for(let i = 0; i<8;i++){
      this.blackPieces.push(new Pawn(i, 1, false));
    }
    this.whitePieces.push(new Bishop(4, 3, true));
    this.blackPieces.push(new Bishop(5, 3, false));

    //Initializing possMoves
    this.possMoves = [];
    this.selectedPiece;
  }

//End of Class
}

//Function to include Files
function include(file){
  var script = document.createElement("script");
  script.scr = file;
  script.type = "text/javascript";
  script.defer = true;
  document.body.appendChild(script);
}
