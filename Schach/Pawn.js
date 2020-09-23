class Pawn{
  constructor(x, y, isWhite){
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
  }

  //Draws itself
  draw(context, tileSize){
    context.fillText("P", this.x * tileSize, (this.y+1)*tileSize);
  }

  //Draw dots on possible squares
  drawGreenPoints(context, tileSize, possMoves){
    var sizePoint = tileSize/5;
    for(let i=0;i<possMoves.length;i++){

      context.fillStyle = "green";
      context.fillRect(possMoves[i][0]*tileSize+(tileSize-sizePoint)/2,possMoves[i][1]*tileSize+(tileSize-sizePoint)/2, sizePoint, sizePoint);
    }
  }

  //Piece is clicked
  clicked(context, tileSize, whitePieces, blackPieces){
    context.fillStyle = "gray";
    context.fillText("P", this.x * tileSize, (this.y+1)*tileSize);

    //Calculating possible Moves
    var possMoves = [];

    //Pushing
    if(this.y != 0 && this.y != 7){
      if(this.isWhite){
        if(this.y == 6){
          possMoves.push([this.x, 4]);
        }
        possMoves.push([this.x, this.y-1]);
      }
      else{
        if(this.y == 1){
          possMoves.push([this.x, 3]);
        }
        possMoves.push([this.x, this.y+1]);
      }
    }

    //If Piece in Front of Pawn Pushing not possible
    //For white Pawns
    if(this.isWhite){
      //First Whites Pieces then Blacks Pieces
      for(let i=0; i<whitePieces.length;i++){
        //If Pawn on Rank 2 and Piece 2 Tiles in Front
        if(whitePieces[i].x == this.x && whitePieces[i].y == this.y-2 && this.y == 6){
          possMoves = [[this.x, this.y-1]];
        }
        //If Piece directly in Front no push possible
        if(whitePieces[i].x == this.x && whitePieces[i].y == this.y-1){
          possMoves = [];
        }
      }
      for(let i=0; i<blackPieces.length;i++){
        //If Pawn on Rank 2 and Piece 2 Tiles in Front
        if(blackPieces[i].x == this.x && blackPieces[i].y == this.y-2 && this.y == 6){
          possMoves = [[this.x, this.y-1]];
        }
        //If Piece directly in Front no push possible
        if(blackPieces[i].x == this.x && blackPieces[i].y == this.y-1){
          possMoves = [];
        }
      }
    }
    //For Black Pawns
    else{
      //First Whites Pieces then Blacks Pieces
      for(let i=0; i<whitePieces.length;i++){
        //If Pawn on Rank 7 and Piece 2 Tiles in Front
        if(whitePieces[i].x == this.x && whitePieces[i].y == this.y+2 && this.y == 1){
          possMoves = [[this.x, this.y+1]];
        }
        //If Piece directly in Front no push possible
        if(whitePieces[i].x == this.x && whitePieces[i].y == this.y+1){
          possMoves = [];
        }
      }
      for(let i=0; i<blackPieces.length;i++){
        //If Pawn on Rank 2 and Piece 2 Tiles in Front
        if(blackPieces[i].x == this.x && blackPieces[i].y == this.y+2 && this.y == 1){
          possMoves = [[this.x, this.y+1]];
        }
        //If Piece directly in Front no push possible
        if(blackPieces[i].x == this.x && blackPieces[i].y == this.y+1){
          possMoves = [];
        }
      }
    }

    //Capturing
    //For white Pawns
    if(this.isWhite){
      for(let i=0; i<blackPieces.length;i++){
        //Diagonally left
        if(blackPieces[i].x == this.x-1 && blackPieces[i].y == this.y-1){
          possMoves.push([this.x-1, this.y-1]);
        }
        //Diagonally right
        if(blackPieces[i].x == this.x+1 && blackPieces[i].y == this.y-1){
          possMoves.push([this.x+1, this.y-1]);
        }
      }
    }
    //Black Pawns
    else{
      for(let i=0; i<whitePieces.length;i++){
        //Diagonally left
        if(whitePieces[i].x == this.x-1 && whitePieces[i].y == this.y+1){
          possMoves.push([this.x-1, this.y+1]);
        }
        //Diagonally right
        if(whitePieces[i].x == this.x+1 && whitePieces[i].y == this.y+1){
          possMoves.push([this.x+1, this.y+1]);
        }
      }
    }



    //Draw green Points
    this.drawGreenPoints(context, tileSize, possMoves);
    //Returning possible Moves
    return possMoves;
  }
}
