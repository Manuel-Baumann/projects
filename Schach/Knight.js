class Knight{
  constructor(x, y, isWhite){
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
  }

  //Draws itself
  draw(context, tileSize){
    context.fillText("N", this.x * tileSize, (this.y+1)*tileSize);
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
    context.fillText("N", this.x * tileSize, (this.y+1)*tileSize);

    //All possible Moves
    var possMoves = [[this.x-2, this.y-1], [this.x-2, this.y+1], [this.x-1, this.y+2],
     [this.x-1, this.y-2], [this.x+1, this.y+2], [this.x+1, this.y-2],
     [this.x+2, this.y-1], [this.x+2, this.y+1]];

    //Going through all 8 Possibilities
    //White Knight
    //If white Piece on any square -> cant move there
    if(this.isWhite){
      for(let i = 0;i<whitePieces.length;i++){
        for(let j = 0;j<possMoves.length;j++){
          if(whitePieces[i].x == possMoves[j][0] && whitePieces[i].y == possMoves[j][1]){
            possMoves.splice(j, 1);
            break;
          }
        }
      }
    }
    //Black Knight
    else{
      for(let i = 0;i<blackPieces.length;i++){
        for(let j = 0;j<possMoves.length;j++){
          if(blackPieces[i].x == possMoves[j][0] && blackPieces[i].y == possMoves[j][1]){
            possMoves.splice(j, 1);
            break;
          }
        }
      }
    }

    //Exclude possMoves outside the Board
    for (let i = 0;i<possMoves.length;i++){
      if(possMoves[i][0]<0 || possMoves[i][0]>7 || possMoves[i][1]<0 ||possMoves[i][1]>7){
        possMoves.splice(i, 1);
        i-=1;
      }
    }

    //Draw green Points
    this.drawGreenPoints(context, tileSize, possMoves);
    //Returning possible Moves
    return possMoves;
  }
}
