class Bishop{
  constructor(x, y, isWhite){
    this.x = x;
    this.y = y;
    this.isWhite = isWhite;
  }

  //Draws itself
  draw(context, tileSize){
    context.fillText("B", this.x * tileSize, (this.y+1)*tileSize);
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
    context.fillText("B", this.x * tileSize, (this.y+1)*tileSize);

    //Calculating possible Moves
    var possMoves = [];

    //First determine nearest Piece in every direction
    //Eliminating all cut-off and taken squares in all 4 directions, if square is taken by opposite color -> add
    //Maximum possible Distance
    let minUp = this.y+1;
    let minDown = 8-this.y;
    let minLeft = this.x+1;
    let minRight = 8-this.x;

    //Is the nearest Piece black?
    let nearBlackUp = false;
    let nearBlackDown = false;
    let nearBlackLeft = false;
    let nearBlackRight = false;
    //Is the nearest Piece white?
    let nearWhiteUp = false;
    let nearWhiteDown = false;
    let nearWhiteLeft = false;
    let nearWhiteRight = false;

    if(this.isWhite){
          //First looking for whitePieces
          for(let i=0;i<whitePieces.length;i++){
            if(whitePieces[i].x==this.x){
              if(whitePieces[i].y>this.y){
                if(minDown>whitePieces[i].y-this.y){
                  minDown = whitePieces[i].y-this.y;
                }
              }
              if(whitePieces[i].y<this.y){
                if(minUp>this.y-whitePieces[i].y){
                  minUp = this.y-whitePieces[i].y;
                }
              }
            }
            if(whitePieces[i].y==this.y){
              if(whitePieces[i].x>this.x){
                if(minRight>whitePieces[i].x-this.x){
                  minRight = whitePieces[i].x-this.x;
                }
              }
              if(whitePieces[i].x<this.x){
                if(minLeft>this.x-whitePieces[i].x){
                  minLeft = this.x-whitePieces[i].x;
                }
              }
            }
          }
          //Now looking for blackPieces, if one is nearest -> nearBlack = true
          for(let i=0;i<blackPieces.length;i++){
            if(blackPieces[i].x==this.x){
              if(blackPieces[i].y>this.y){
                if(minDown>blackPieces[i].y-this.y){
                  minDown = blackPieces[i].y-this.y;
                  nearBlackDown = true;
                }
              }
              if(blackPieces[i].y<this.y){
                if(minUp>this.y-blackPieces[i].y){
                  minUp = this.y-blackPieces[i].y;
                  nearBlackUp = true;
                }
              }
            }
            if(blackPieces[i].y==this.y){
              if(blackPieces[i].x>this.x){
                if(minRight>blackPieces[i].x-this.x){
                  minRight = blackPieces[i].x-this.x;
                  nearBlackRight = true;
                }
              }
              if(blackPieces[i].x<this.x){
                if(minLeft>this.x-blackPieces[i].x){
                  minLeft = this.x-blackPieces[i].x;
                  nearBlackLeft = true;
                }
              }
            }
          }
    }
    //Now for Black
    else {

      //First looking for blackPieces
      for(let i=0;i<blackPieces.length;i++){
        if(blackPieces[i].x==this.x){
          if(blackPieces[i].y>this.y){
            if(minDown>blackPieces[i].y-this.y){
              minDown = blackPieces[i].y-this.y;
            }
          }
          if(blackPieces[i].y<this.y){
            if(minUp>this.y-blackPieces[i].y){
              minUp = this.y-blackPieces[i].y;
            }
          }
        }
        if(blackPieces[i].y==this.y){
          if(blackPieces[i].x>this.x){
            if(minRight>blackPieces[i].x-this.x){
              minRight = blackPieces[i].x-this.x;
            }
          }
          if(blackPieces[i].x<this.x){
            if(minLeft>this.x-blackPieces[i].x){
              minLeft = this.x-blackPieces[i].x;
            }
          }
        }
      }
      //Now looking for whitePieces, if one is nearest -> nearWhite = true
      for(let i=0;i<whitePieces.length;i++){
        if(whitePieces[i].x==this.x){
          if(whitePieces[i].y>this.y){
            if(minDown>whitePieces[i].y-this.y){
              minDown = whitePieces[i].y-this.y;
              nearWhiteDown = true;
            }
          }
          if(whitePieces[i].y<this.y){
            if(minUp>this.y-whitePieces[i].y){
              minUp = this.y-whitePieces[i].y;
              nearWhiteUp = true;
            }
          }
        }
        if(whitePieces[i].y==this.y){
          if(whitePieces[i].x>this.x){
            if(minRight>whitePieces[i].x-this.x){
              minRight = whitePieces[i].x-this.x;
              nearWhiteRight = true;
            }
          }
          if(whitePieces[i].x<this.x){
            if(minLeft>this.x-whitePieces[i].x){
              minLeft = this.x-whitePieces[i].x;
              nearWhiteLeft = true;
            }
          }
        }
      }
    }

    //Add minDirection - 1 squares for every direction
    //Up
    for(let i=1;i<minUp;i++){
      possMoves.push([this.x, this.y-i]);
    }
    if(nearBlackUp || nearWhiteUp){
      possMoves.push([this.x, this.y-minUp]);
    }
    //Down
    for(let i=1;i<minDown;i++){
      possMoves.push([this.x, this.y+i]);
    }
    if(nearBlackDown || nearWhiteDown){
      possMoves.push([this.x, this.y+minDown]);
    }
    //Left
    for(let i=1;i<minLeft;i++){
      possMoves.push([this.x-i, this.y]);
    }
    if(nearBlackLeft || nearWhiteLeft){
      possMoves.push([this.x-minLeft, this.y]);
    }
    //Right
    for(let i=1;i<minRight;i++){
      possMoves.push([this.x+i, this.y]);
    }
    if(nearBlackRight || nearWhiteRight){
      possMoves.push([this.x+minRight, this.y]);
    }





    //Draw green Points
    this.drawGreenPoints(context, tileSize, possMoves);
    //Returning possible Moves
    return possMoves;
  }
}
