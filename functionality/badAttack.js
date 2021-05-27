//gives specifications for drawing the boss's power orbs
class Orb {
  constructor(xPos, yPos, width, height, xMove, use) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = width
    this.height = height;
    this.xMove = xMove;
    this.use = use;
  }
}

//an array that will contain all the info regarding power
var orb1 = {xPos: 110, yPos: 390, width: 25, height: 25, xMove: 3, use: true}; //this is for an orb moving to the right
var orb2 = {xPos: 1000, yPos: 390, width: 25, height: 25, xMove: -3, use: true}; //this is for an orb moving to the left
var orbArr = [{xPos: -1000, yPos: 390, width: 0, height: 0, xMove: -3, use: true}];
//contains the specifications for the drawing the power later
var orbGo1 = false; //will become true when boss is moving right and is going to shoot an orb to the right
var orbGo2 = false; //will become true when boss is moving left and is going to shoot an orb to the lefft
var trash = false; //trash to see if orbs should go in garbage or not
var val = 0; //"boolean" tracker to see which direction the object should be moving
var trigger = false; //boolean tracker on and off when to use orb
var imgOrb = new Image(); //basically creates the image
imgOrb.onload = function(){ //uploads the image onto the screen
  orbPow(); //uses a function from below
}

/*moreOrb (xPos, yPos, width, height, xMove, use)
@param - xPos {integer} - the x position of my power
@param - yPos {integer} - the y position of my power
@param - width {integer} - the size of my power in the x direction
@param - height {integer} - the size of my power in the y direction
@return - powArr {array} - is an array of objects, where objects is the specifications for drawing my power
The purpose of this function is to create more power attacks
*/
function moreOrb (xPos, yPos, width, height, xMove, use){
  var newOrb = new Orb(xPos, yPos, width, height, xMove, use); //calls on the class for drawing the power
  orbArr.push(newOrb); //pushes new power into array to go through in other for loops
  return orbArr;
}

/*orbPow()
draws a power orb for visual effects and for fun
*/
function orbPow(){
  if ((boss.xPos == 1000) && (boss.xMove == -2)) { //if boss is moving to the left and in position, fire the orb
    orbGo2 = true;
    if (end == false) { //refrains the collision sounds from occuring when game is over
      soundShoot.play(); //uses a cartoony shooting sound here for fun
    }
  }
  else if ((boss.xPos != 1000) || (boss.xMove != -2)){ //if the first if isn't true, then turn off power orb firing ability
    orbGo2 = false;
  }
  if ((boss.xPos == 110) && (boss.xMove == 2)) { //if boss is moving to the right and in position, fire the orb
    orbGo1 = true;
    if (end == false) { //refrains the collision sounds from occuring when game is over
      soundShoot.play(); //uses a cartoony shooting sound here for fun
    }
  }
  else if ((boss.xPos != 100) || (boss.xMove != 2)){ //if the second if isn't true, then stop orb firing ability
    orbGo1 = false;
  }
  for (var i = 0; i < orbArr.length; i++) {
    if (orbArr[i].xMove == 3) {
      imgOrb.src="functionality/bossPow.png"; //source for where the image is coming from
    }
    if (orbArr[i].xMove == -3) {
      imgOrb.src="functionality/bossPow1.png"; //source for where the image is coming from
    }
    if (orbArr[i].xPos < 0) { //stops drawing the orb once it's off screen
      orbArr[i].use = false;
    }
    if (orbArr[i].xPos > c.width) { //stops drawing the orb once it's off screen
      orbArr[i].use = false;
    }
    ctx.save(); //saves the present condition/state of the image/game
    ctx.beginPath(); //starts drawing the screen
    ctx.drawImage(imgOrb, orbArr[i].xPos, orbArr[i].yPos, orbArr[i].width, orbArr[i].height); //gives specifications for drawing it
    ctx.fill(); //fills the image/drawing
    ctx.stroke(); //finishes the drawing
    ctx.restore(); //reuses the saved image
    orbArr[i].xPos += orbArr[i].xMove;
  }
}

/*heroOrbCheck
Does damage to the hero using power orbs from the boss
*/
function heroOrbCheck(){
  for (var i = 0; i < orbArr.length; i++) {
    if ((orbArr[i].xPos<rect.xPos+20)&&(rect.xPos<orbArr[i].xPos)&&(orbArr[i].yPos<rect.yPos+rect.width)&&(rect.yPos<orbArr[i].yPos)) {
      orbArr[i].use = false;
      scoring ++; //adds to the score (about 5-10 points? depends if you are walking or running when attacked)
      if (end == false) { //refrains the collision sounds from occuring when game is over
        soundColl.play(); //uses a cartoony collision sound here for fun
      }
    }
  }
}

/*collideHeroBoss()
is a collision checker between the hero/rect and the boss
*/
function collideHeroBoss(){
  //this if checks for collision between the left, right, and bottom side of the hero compared to the boss
  if ((boss.xPos+boss.width>rect.xPos)&&(boss.xPos+boss.width<rect.xPos+11)&&(rect.yPos+rect.height>boss.yPos)&&(rect.yPos<boss.yPos+305)) {
    scoring ++;  //adds to the score (about 5-10 points? depends on whether you are walking or running when attacked)
    if (end == false) { //refrains the collision sounds from occuring when game is over
      soundColl.play(); //uses a cartoony collision sound here for fun
    }
  }
}
