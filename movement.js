// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript

// global variable for temporary sprite placement
// will only ever be the current player
var tempsprite = ""
var tempx = 0
var tempy = 0
var spell = ""
var tempsprite2 = ""
var monsterSpell =""
var mainspell = ""

// global variable for targetted FX
// particlePos = {x:0,y:0}

// keep track of who you are interacting with
var currentlySelectedCharacterIndex = 1
 

// handle keys for endTurn
function endKeys(e){
   
   

    if (e.detail == 1) {
        $("#helper").hide()
        handleInput("remove","endKeys")
        
        newTurn()
     }


}


function newTurn(){
    console.groupCollapsed("movement - newTurn")
    console.log("NEW TURN:" + currentlySelectedCharacterIndex)

    
    handleInput("remove","endKeys")

 if (currentlySelectedCharacterIndex == global.noOfPlayers){
    currentlySelectedCharacterIndex = 1
} else {currentlySelectedCharacterIndex++}

console.log("%cNEEEWWW TUUUURRRNNNN ::: " + currentlySelectedCharacterIndex,"background-color:yellow;color:black")
console.log("%cNEEEWWW TUUUURRRNNNN ::: " + playerTrack[currentlySelectedCharacterIndex],"background-color:yellow;color:black")
console.groupEnd() 
if (playerTrack[currentlySelectedCharacterIndex-1] == "human"){
    handleInput("remove","handlelock")
    handleInput("remove","handleSpells")
    handleInput("remove","handleCharacterMovement")
    handleInput("remove","handleSummon")
    handleInput("remove","strike")
    handleInput("add","handleMoves")
    console.log("mouseClickMenu state?", mouseClickMenu)
    helper("","It is now your turn","yellow")
    } else { 
      ai()
    }


          
   
}


function endTurn(){
  
    handleInput("remove","handlelock")
    handleInput("remove","handleSpells")
    handleInput("remove","handleCharacterMovement")
    handleInput("remove","handleSummon")
    handleInput("remove","strike")

    // deal with the cuurent player ---------------------------------------------------------
    // remember, playerIndex starts at 0 and currentlyselected starts at 1
    if (playerTrack[currentlySelectedCharacterIndex-1]=="human")
    {
        
        helper("","Press Mouse Key to End Turn","yellow")
        handleInput("add","endKeys")
        

       // endkeys click to continue on to next turn
        
       
    } else // computer
    {
        if (currentlySelectedCharacterIndex == global.noOfPlayers){
            currentlySelectedCharacterIndex = 1
        } else {currentlySelectedCharacterIndex++}
        ai()
    }

  //   console.log("new current selected index:",currentlySelectedCharacterIndex)
   // console.log("newturn:",newTurn)
    
    

}



// resposible for putting a small display menu below a character
// when performing an action i.e. moving a character, shows how many
// movement points are left
/*
var options = {}
 var helperInsultElement = document.getElementById('helperInsult').style;
 function fireIt(){
  $("#helperInsult").html("")
  helperInsultElement.transition = '0.3s';
  helperInsultElement.opacity = 1 
  obJSt = track[2]
  var randomElement = _.sample(insults);
  $("#helperInsult").show()
  $("#helperInsult").css("left",(obJSt.x - global.spriteSize.width)*scaleValue)
  $("#helperInsult").css("top",(obJSt.y - 10)*scaleValue)
  options = {strings: [randomElement],contentType: 'html', typeSpeed: 40};
  var typed = new Typed('#helperInsult', options);
  sleep(4000).then(() => { 
    helperInsultElement.transition = '1s';
    helperInsultElement.opacity = 0 });
 }*/


function strikePath(minFireX,minFireY,tarx,tary)
{

     // visual smoothness and accuracy of spell track/path
     let maxFireFrame = 17

     // tary the targets y coordinates
     // stepsneededY - inverted position of players wand
     // the stepsneeded variables hold the angle of attack towards the target
     // then I build an array, listx, which holds what the path will be
     // tary > y ?  stepsNeededY = -Math.abs((y - tary) / maxFireFrame) : stepsNeededY = Math.abs((y - tary) / maxFireFrame); [OLD]
    // tarx = (tarx * global.spriteSize.width) + global.margin.value
     // tary = (tary * global.spriteSize.height) + global.margin.value
   
     
     // stepsNeededY = (tary - track[currentlySelectedCharacterIndex].y) / maxFireFrame
     tary > minFireY ?  stepsNeededY = -Math.abs((minFireY - tary) / maxFireFrame) : stepsNeededY = Math.abs((minFireY- tary) / maxFireFrame);
    
     stepsNeededX = ((tarx - minFireX) / maxFireFrame)
     
 
     console.groupCollapsed("movement - strikepath- logs")
     console.log("tarx:" + tarx)  // [real coordinates]
     console.log("tary:" + tary) // [real coordinates]
     console.log("track[turn].x",minFireX) // the current players X
     console.log("track[turn].y",minFireY) // the current players y
     console.log("stepsNeededX:" + stepsNeededX) // angle for spell track x
     console.log("stepsNeededY:" + stepsNeededY) // angle for spell track y
     console.groupEnd()
 
     // build the path of the complete spell track
     var listx = [];

     mOb = {x:0,y:0}
 
     // turn is the matching player object in track
     // x is slightly modified to account for the position of the players wand
     // which is the top right (or left) corner
     // [CHANGE] this will have to adapt depending on character facing direction
     mOb.x = minFireX // starting position of spell (current player) [real coordinates]
     mOb.y = minFireY // starting position of spell (current player) [real coordinates]
   


     listx.push(mOb)
    for(var i=1; i<maxFireFrame; i++)
        {
              mOb = {x:0,y:0}
             // mOb.x = listx[i-1].x + stepsNeededX [old]
             mOb.x = listx[i-1].x + stepsNeededX

        // if target is below player then subtrack stepsNeededY
         // if target is above player then add stepsNeededY
            tary > track[currentlySelectedCharacterIndex].y ? mOb.y = listx[i-1].y - stepsNeededY : mOb.y = listx[i-1].y + stepsNeededY
         if (debug.spellPath == 1){
			cde.fillStyle='white'
            cde.fillRect(mOb.x,mOb.y,5,5)
		 }
            listx.push(mOb)
        }
      
}

shieldcope = 0

function strike(e){
    // when you looking for target for ranged spell
	// explosion test

    

//    console.log(e)

    // tenmpsprite needs to be cursor? so track[0]
  // let objIndex = track.findIndex((obj => obj.id == tempsprite.id));
  
  handleInput("remove","handleSummon")
  // document.removeEventListener('keydown', handleMoves)
  
  // if #cancelTurn is pressed
  if (e.path[0].id == "cancelTurn"){
      grix.clearRect(0, 0, canvas3.width, canvas3.height);
      handleInput("remove","strike")
      helper("","Press Mouse Key to End Turn","yellow")
      endTurn()
      return false
  }
  

  // using mouse to fire spell
  if (e.detail == 1 || e.isTrusted === false) {
    // update cursor position in track[0] and grab a lock
   // mousePos = getSquare(canvasBackground, e);
    // track[0].mousePos = (mousePos.x-1) + "," + (mousePos.y-1)
    // cursorPos = track[0].mousePos.split(",")
   

    // you can't attack your own creations!
    if (mainspell !== "shields")
    {
    if (latestSelectedMonster.Owner == currentlySelectedCharacterIndex)
    {
        helper(track[currentlySelectedCharacterIndex],"You can't attack your own creations!")
        return false
    }
    outOfRange = 0
    // spell cant fire that far :(
    firingSourceX = track[currentlySelectedCharacterIndex].x
    firingRange = (spells[mainspell].Range * global.spriteSize.width * scaleValue) + firingSourceX
    if (latestSelectedMonster.x > firingRange) {console.warn("out of x range");outOfRange = 1}

    firingSourceY = track[currentlySelectedCharacterIndex].y
    firingRange = (spells[mainspell].Range * global.spriteSize.height * scaleValue) + firingSourceY
    if (latestSelectedMonster.y > firingRange) {console.warn("out of y range");outOfRange = 1}

    console.warn("firingSourceX: ", firingSourceX)
    console.warn("firingRange: ", firingRange)
    console.warn("spell: ", mainspell)

    // out of range!!
    if (outOfRange == 1){
        helper(track[currentlySelectedCharacterIndex],"Out of Range!")
        return false    
    }

    // clear target areas
    grix.clearRect(0, 0, canvas3.width, canvas3.height);

    // let user know what we are doing
    helper(track[currentlySelectedCharacterIndex],"Casting spell - ", spells[mainspell].id)
    // find character/monster you have targetted
    // targetIndex = findO(track,"mousePos","index",mousePos.x + "," + mousePos.y)
	targetIndex = latestSelectedMonster.gKey

    // is the track clear?
    
    minFireX = track[currentlySelectedCharacterIndex].x
    minFireY = track[currentlySelectedCharacterIndex].y
    tarFireX = mousePos.x * global.spriteSize.width
	
	targetFireX = latestSelectedMonster.x

	
    tarFireY = mousePos.y * global.spriteSize.width

	targetFireY = latestSelectedMonster.y
	
    strikePath(minFireX,minFireY,targetFireX,targetFireY)
    trackDup = []
    i = -1;

while (++i < track.length) {
  trackDup[i] = track[i];
}
    trackDup.splice(currentlySelectedCharacterIndex,1) // remove current player
    trackDup.splice(0,1) // remove cursor

  
    for(let l=0;l < trackDup.length; l++)
    {
     
        if (trackDup[l].x >= minFireX && trackDup[l].x <= tarFireX){console.log("xlock")}
        if (trackDup[l].y >= minFireY && trackDup[l].y <= tarFireY){console.log("ylock")}
    } // sweep through and see if in path of fire
    
    } // end if shields
    // fire ranged spell
    console.log("spellType: ", mainspell)
    bCheck = 0
     
    if (mainspell == "shields")
    {
        console.log("shieldshere")
        $(".shields").css("left", track[currentlySelectedCharacterIndex].x+86)
        $(".shields").css("top", track[currentlySelectedCharacterIndex].y+54)
        $(".shields").show()
      
      
        grix.clearRect(0, 0, canvas3.width, canvas3.height);
        bCheck = 1
    } 

    if (mainspell == "shields")
    {
          // increase shielded player HP by 10
        if (shieldcope==0){
        console.log("track hp: ", parseInt(track[1].HP))

        track[currentlySelectedCharacterIndex].HP = parseInt(track[currentlySelectedCharacterIndex].HP) + 10
        shieldcope = 1
        }

    }

    if (mainspell == "lightning")
    {
        // use different rendering engine for lightning (lightning.js)
        createRain()
        setTimeout(function(){
            $("#c").hide()
            $(".drop").remove()
        }, 6000)

        bCheck = 1
    } 

    if (bCheck==0)  generateParticle(-1,-1,currentlySelectedCharacterIndex,targetIndex,mainspell)

    // combat results
    if (mainspell!=="shields") combatResults = battle(targetIndex,"magicbolt","track","spells")
      
    magicspell = "lightning" ? sleepCount = 2000 : sleepCount = 500
    
    sleep(sleepCount).then(() => { 
        if (mainspell !== "shields") helperHitC(track[targetIndex],"-" + combatResults[0])
        endTurn()
     })
    
    
   
}
  

 /*switch(e.keyCode){
        case 32: // space  
        //  pixel(tempx,tempy,track[objIndex].x,track[objIndex].y,spell)  
        pixel(tempx,tempy,mX.a*global.spriteSize.width,mY.b*global.spriteSize.height,spell)  

        // change cursor graphic to standard 0
        // changeCursor(0)
        sprites[0].thesprite.img = document.getElementById("cursor")
         handleInput("remove","handlelock")
        document.removeEventListener('keydown', strike)
        document.addEventListener('keydown',handleMoves)
        document.removeEventListener('click', strike)
        document.addEventListener('click',handleMoves)
        break;

 
        
 }*/

}

// for handle character movement
var theC = {}
theC.x = -1
theC.y = -1

// range of char for movement
var localRange = 0

var cc = 0



function handleSummon(e){
    // when you summon a monster you have to place it next to the player
    // local range is just 1
    console.groupCollapsed("handleSummon")
    mousePos = getSquare(canvasGrid, e);
    console.log("handle Summon:",mouseClickMenu)
    console.log("mousePos:", mousePos)

console.log(e.detail)
    objS = track.findIndex(objS => objS.id === "cursor"); // the cursor
    // this is always zero so not sure why Im wasting the cycles to find it 

   // max range for monster creation is 1
    
   
if (e.detail == 1) {
    // update cursor position in track[0] and grab a lock
    mousePos = getSquare(canvasBackground, e);
    
 //   track[0].mousePos = mousePos.x + "," + mousePos.y
 //   cursorPos = track[0].mousePos.split(",")
  //  console.log("cursorPos2:",cursorPos)

    // here is the current players position
    mp = track[currentlySelectedCharacterIndex].mousePos.split(",")
    console.log("mousePos: should be the target? ",mousePos)
    console.log("mp: mp is the casters position ", mp)
    // if target is more than 1 slot away
    distanceX = mousePos.x - mp[0]
    distanceY = mousePos.y - mp[1]
    console.log("distanceX",distanceX)
    console.log("distnceY",distanceY)

    // summon the monster if within one spot away
    if(distanceX < 2 || distanceY < 2){

      /*  rNum = (Math.random() * (10000000 - 10 + 1) ) << 0;
        
        

     eval('var ' + monsterSpell + rNum + ' = new Sprite("' + monsterSpell + rNum + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + rNum + '","left",0,' + gridX +','+ gridY + ',1,"monster","' + monsterSpell + rNum + '","' + monsterSpell + '")')
     eval('generateSprite(' + monsterSpell + rNum +',1,' + rNum + ')')*/
 
     summonRandomMonster(monsterSpell)

        //eval('var ' + monsterSpell + ' = ' + 'new Sprite("' + monsterSpell + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + '","down",0,'+ cursorPos[0] +','+ cursorPos[1] +',1,"monster",monsters["' + monsterSpell+ '"].Type)')
        //eval('generateSprite(' + monsterSpell + ',1)')
        // sprites[0].thesprite.src="cursor.png"
        
        handleInput("remove","handleSummon")
        endTurn()
    }
}

    // if using regular keyboard

    if (cc==0) {maxX = mX.a + 1; maxL = mX.a -1; maxY = mY.b -1; maxLL = mY.b + 1;cc=1}

    switch(e.keyCode){

        case 38: // up
        current_state = "up";
        if(mY.b > maxY){
        if(mY.b > 0){ 
             mY.b -- 
             mp = track[objS].mousePos.split(",")
             mp[1]--
             track[objS].mousePos = mp[0] + "," + mp[1]
             track[objS].y > (0) ? track[objS].y -= global.spriteSize.width : ""
        }}
        break;

        case 40: // down
        current_state = "down";
        if (mY.b < maxLL){
        if (mY.b < (global["boundary"].height/global.spriteSize.width)){   
         mY.b ++ 
         mp = track[objS].mousePos.split(",")
         mp[1]++
         track[objS].mousePos = mp[0] + "," + mp[1]
         track[objS].y < (global["boundary"].height - global.spriteSize.width)  ? track[objS].y += global.spriteSize.height : ""
        }}
        break;
    
        case 37: // left
        current_state = 'left';
        if (mX.a > maxL){
        if (mX.a > 0){
             mX.a -- 
             mp = track[objS].mousePos.split(",")
             mp[0]--
             track[objS].mousePos = mp[0] + "," + mp[1]
             track[objS].x > (0) ? track[objS].x -= global.spriteSize.width  : ""
        }}        
        break;
    
        case 39: // right
        current_state = 'right';
        if (mX.a < maxX) {
        if (mX.a < (global["boundary"].width/global.spriteSize.width)) {           
            mX.a ++ 
            track[objS].mousePos = mp[0] + "," + mp[1]
            track[objS].x < (global["boundary"].width - global.spriteSize.width) ? track[objS].x += global.spriteSize.width  : ""
        }}     
        break;

        case 32: // space  
        // create monster then reset
        eval('var ' + monsterSpell + ' = ' + 'new Sprite("' + monsterSpell + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + '","down",0,'+ mX.a +','+mY.b+',1,"monster",monsters["' + monsterSpell+ '"].Type)')
        eval('generateSprite(' + monsterSpell + ',1)')
        handleInput("remove","handleSummon")
       // tempsprite.img = document.getElementById("cursor")
      //  tempsprite.src="cursor.png"
       // drawText("clear","canvasConsole")
       sprites[0].thesprite.src="cursor.png"
       // generateSprite(tempsprite,0)
       handleInput("add","handleMoves")
       
       console.log("space bar press under handle summon, shif to handlemoves")
        break;

    }
    console.groupEnd()
}

function supportForMovement(type='monster'){
   // display blocks that the character can move to
   pss = global.spriteSize.width * scaleValue
   grix.fillStyle = "#a4d687";
   grix.globalAlpha = 0.2;

   // if we are moving a character or we are targetting a ranged spell
   type == "monster" ? whom = track[latestSelectedMonster.gKey] : whom = spells[mainspell]
console.log(type)
console.log("whom.range" + whom.Range)

// add x and y of owners position so we know where the spelll is being cast from
if (type=="spell"){
    whom.x = track[currentlySelectedCharacterIndex].x
    whom.y = track[currentlySelectedCharacterIndex].y
}
  /* vRange = parseInt(track[latestSelectedMonster.gKey].Range)
   vRangeP = vRange * (global.spriteSize.width * scaleValue)
   calcLeft = track[latestSelectedMonster.gKey].x - (track[latestSelectedMonster.gKey].Range*global.spriteSize.width)
   calcTop = track[latestSelectedMonster.gKey].y - (track[latestSelectedMonster.gKey].Range*global.spriteSize.height)*/

   vRange = parseInt(whom.Range)
   vRangeP = vRange * (global.spriteSize.width * scaleValue)
   calcLeft = whom.x - (whom.Range*global.spriteSize.width)
   calcTop = whom.y - (whom.Range*global.spriteSize.height)
   maxLeft = (cats.width) * scaleValue
   maxTop = (cats.height) * scaleValue
   
   if (calcLeft < 0)
   {
       Left = 0
       LeftLength = ((whom.Range*global.spriteSize.width) * 2)+global.spriteSize.width + calcLeft
   } else {
       Left = calcLeft
       LeftLength = ((whom.Range*global.spriteSize.width) * 2)+global.spriteSize.width*scaleValue
   }

   if (LeftLength > maxLeft){
    Left = calcLeft
    calcUpperLeft = LeftLength - maxLeft
    LeftLength = calcUpperLeft
   }

   if (calcTop < 0){
    Top =  0
    TopLength =  ((whom.Range*global.spriteSize.height) * 2)+global.spriteSize.height + calcTop
   } else {
    Top = calcTop
    TopLength = ((whom.Range*global.spriteSize.height) * 2)+global.spriteSize.height*scaleValue
   }

   if (TopLength > (maxTop-(whom.range*global.spriteSize.height))){
    Top = calcTop
    calcUpperTop = TopLength - maxTop
    TopLength = calcUpperTop
   }

   grix.fillRect(Left, Top, LeftLength, TopLength); 
   
}

localRange=0
function handleCharacterMovement(e,spell) {
    
    handleInput("remove","handlelock")
    

// get the character using track and the cursor position

// objS = track.findIndex(objS => objS.mousePos === theCursor.x + "," + theCursor.y);
// the character selected on menu load should be the character you are moving
// console.log(currentlySelectedCharacterIndex)

// swwitch olver to latestSelectedMonster.gKey instead of currentlySelectedCharacterIndex

if (e.detail == 1) {
    helper("","Select a block to move to")
    // clear tile helpers
    grix.clearRect(0, 0, canvas3.width, canvas3.height);

   

    // where the character is going
    mousePos = getSquare(canvasGrid, e);
    console.log(mousePos)

    // where the character is currently at
  //  mp = track[currentlySelectedCharacterIndex].mousePos.split(",")
    mp = track[latestSelectedMonster.gKey].mousePos.split(",")

    limitrangeX = mousePos.x - mp[0] // should be 1
    limitrangeY = mousePos.y - mp[1] // should be 1
   console.log("mp",mp)
    console.log("limitrangeX = ", limitrangeX)
    console.log("limitrangeY = ",limitrangeY)

   // startPosX = track[currentlySelectedCharacterIndex].x
   // startPosY = track[currentlySelectedCharacterIndex].y
   startPosX = track[latestSelectedMonster.gKey].x
   startPosY = track[latestSelectedMonster.gKey].y
    moveIntervalX = (mousePos.x * global.spriteSize.width) / 525
    moveIntervalY = (mousePos.y * global.spriteSize.height) / 525
    console.log("_moveIntervalX:" + moveIntervalX)
    console.log("_moveIntervalY:" + moveIntervalY)
    console.log("Starting Pos: " + startPosX + "," + startPosY)
    console.log("Ending Pos: " + (mousePos.x * global.spriteSize.width) + "," + (mousePos.y * global.spriteSize.height))

   console.log("local range: ", localRange)
   console.log("latestmonster range: ",track[latestSelectedMonster.gKey].Range)

   if(limitrangeX > track[latestSelectedMonster.gKey].Range && limitrangeY > track[latestSelectedMonster.gKey].Range){
    console.log("you can't move there")
   }

    if(limitrangeX <= track[latestSelectedMonster.gKey].Range && limitrangeY <= track[latestSelectedMonster.gKey].Range){
    if(localRange < track[latestSelectedMonster.gKey].Range)
    {
    //  console.log("increment local range")
     localRange ++
    
     if (localRange <= track[latestSelectedMonster.gKey].Range) {
        //  maxReached = "<br>MAXED Movement";

        // you are clicking on?  
        targetLock = track.find(
            ({mousePos}) => mousePos == gridX + "," + gridY
        )

        if (targetLock !== undefined){
        if (currentlySelectedCharacterIndex !== targetLock.Owner)
        {
            console.warn("You can attack this character")
            combatResults = battle(targetLock.gKey,currentlySelectedCharacterIndex,"track","track")
            helperHitC(latestSelectedMonster,"-" + combatResults[0])
            playSound("audio/punch.wav",1.0)
            sleep(300).then(() => { 
                playSound("audio/punch.wav",1.0)
             })
            
        }
    }

          // update track with new pos
          track[latestSelectedMonster.gKey].mousePos = gridX + "," + gridY
          console.log("updated position gridx andy ", gridX + "," + gridY)
          
          // animate on move
        /*  amp = 0
          var pMovement = setInterval(function(){
            amp++
            track[currentlySelectedCharacterIndex].x = (track[currentlySelectedCharacterIndex].x) + moveIntervalX
            track[currentlySelectedCharacterIndex].y = (track[currentlySelectedCharacterIndex].y) + moveIntervalY
            if (amp == 525) clearInterval(pMovement)
        },1) */
        
        //fade out
        function callback(){
         track[latestSelectedMonster.gKey].x = mousePos.x * global.spriteSize.width
         track[latestSelectedMonster.gKey].y = mousePos.y * global.spriteSize.height
         amp = 0
        var pMovement = setInterval(function(){
        amp = amp + 0.11
        sprites[latestSelectedMonster.gKey].opacity = amp
        if (amp > 0.99) 
        {
      //      sp7.left = track[currentlySelectedCharacterIndex].x
      //      sp7.top = track[currentlySelectedCharacterIndex].y
      //      sp8.start()
            clearInterval(pMovement)
       
        }
        },10)
        }
        amp = 1
        var pMovement = setInterval(function(){
        amp = amp - 0.01
        sprites[latestSelectedMonster.gKey].opacity = amp
        if (amp < 0.01) 
        {
            clearInterval(pMovement)
        callback()
        }
        },10)
        
        
        // console.log(track)
        // no animation
        handleInput("remove","handleCharacterMovement")
        $(".shields").fadeOut()
          localRange = 0
          console.groupEnd()
          endTurn()
     } else {
  //      console.log("updating helper: " + objS)
    // helper("","MP: " + localRange + " out of " + track[latestSelectedMonster.gKey].Range + maxReached)
     }
    }}
}

// console.log("objS: handlecharactermovement",objS)
switch(e.keyCode){

     /*   case 38: // up
        current_state = "up";
        if(mY.b > 0){
        if (localRange < track[objS].Range) { 
             mY.b -- 
             localRange ++ // localRange determines how far the char can go!
              if(track[objS].y > (0)){
                   track[objS].y -= global.spriteSize.width
                   mp = track[objS].mousePos.split(",")
                   mp[1]--
                   track[objS].mousePos = mp[0] + "," + mp[1]
              }
        }}
        break;

        case 40: // down
        current_state = "down";
        if (mY.b < (global["boundary"].height/global.spriteSize.width)){
        if (localRange < track[objS].Range) {      
         mY.b ++ 
         localRange ++
         if (track[objS].y < (global["boundary"].height - global.spriteSize.width)){
              track[objS].y += global.spriteSize.width
              mp = track[objS].mousePos.split(",")
              mp[1]++
              track[objS].mousePos = mp[0] + "," + mp[1]
         }
        }}
        break;
    
        case 37: // left
        current_state = 'left';
        if (mX.a > 0){
            if (localRange < track[objS].Range)
             {
              mX.a -- 
              localRange ++
              track[objS].x > (0) ? track[objS].x -= global.spriteSize.width  : ""
              mp = track[objS].mousePos.split(",")
              mp[0]--
              track[objS].mousePos = mp[0] + "," + mp[1]
        }}        
        break;
    
        case 39: // right
        console.log("right",track)
        current_state = 'right';
        
        if (mX.a < (global["boundary"].width/global.spriteSize.width)) { 
            if (localRange < track[objS].Range) {
            mX.a ++ 
            localRange ++
            if (track[objS].x < (global["boundary"].width - global.spriteSize.width))
            {
                track[objS].x += global.spriteSize.width
                mp = track[objS].mousePos.split(",")
                mp[0]++
                track[objS].mousePos = mp[0] + "," + mp[1]
            }
        }}    
        if (localRange == track[objS].Range) {
            document.removeEventListener('keydown',handleSpells)
            document.removeEventListener('click',handleSpells)
            document.removeEventListener('keydown',handleCharacterMovement())
            document.removeEventListener('click',handleCharacterMovememnt())
            // helper(track[objS],"MP: " + localRange + " out of " + track[objS].Range + maxReached)
            endTurn() 
        }
        break;*/

  
}
}

function handleMonsterMenu(e){

    switch (mouseClickMenu){
        case "0":          e.keyCode = 48;        break;
        case "1":          e.keyCode = 49;        break;
        case "2":          e.keyCode = 50;        break;
        case "3":          e.keyCode = 51;        break;
        case "4":          e.keyCode = 52;        break;
        case "5":          e.keyCode = 53;        break;
        case "6":          e.keyCode = 54;        break;
        case "7":          e.keyCode = 55;        break;
        case "8":          e.keyCode = 56;        break;
        case "9":          e.keyCode = 57;        break
}

switch(e.keyCode){
    case 48: // 1
    console.log("move")
           
            playerMenu("clear")
            handleInput("add","handleCharacterMovement")
            handleInput("remove","handleMonsterMenu")
            handleInput("remove","handlelock")
            // paint grid range
            supportForMovement()

          
   break;

    case 49: // 1
    console.log("1")
   break;

}
}


 function handleSpells(e){

    
  

    strikeOpponent = (spell) => {
        $(".aMenu").hide()
        mainspell = spell
        supportForMovement('spell')
        handleInput("remove","handleSpells")
        handleInput("add","strike")
        if (mainspell == "shields"){
            $(".playArea").click()
        } 
        
    }

    monsterSummon = (spell) => {
        // use handleSummon to place monster
        console.groupCollapsed("monsterSummon")
        var spell = spell.toLowerCase() // lowercase
        spell = spell.replace(" ","")  // replace space
        console.log("spell:",spell)
        monsterSpell = spell
        console.log("monsterSpell",monsterSpell)
        helper("","Select a block to summon creature","yellow")
        handleInput("add","handleSummon")
        handleInput("remove","handleSpells")
       
        console.log("monstersummon under handlespells: handleSummon")
        playerMenu(0,0,"clear") // hide menu
        // actual rendering part has to wait until player determines where to place monster
        
        // eval('var ' + spell + ' = ' + 'new Sprite("' + spell + '",64,128,64,64,"' + spell + '","down",0,2,2,1,"monster",monsters["' + spell + '"].Type)')
        // eval('generateSprite(' + spell + ',1)')
        $(".aMenu").hide()
        // sprites[0].thesprite.img = document.getElementById("cursor")
        console.log("sprites",sprites)
        // processMovement(sprites[0].thesprite)
        console.groupEnd()
        
    }
 
    massageMonsterSpell = (index) => {
            // summon - for spells named summon we need to change it to the monster name
            // otherwise 'monsterSummon' will not work and we won't know what monster we
            // are summoning
            lock = playerSpellBooks[0].monsterKey.find(element => element.key == index) // limited to player 0
            return lock
    }
    
   
    switch (mouseClickMenu){
        case "1":          e.keyCode = 49;        break;
        case "2":          e.keyCode = 50;        break;
        case "3":          e.keyCode = 51;        break;
        case "4":          e.keyCode = 52;        break;
        case "5":          e.keyCode = 53;        break;
        case "6":          e.keyCode = 54;        break;
        case "7":          e.keyCode = 55;        break;
        case "8":          e.keyCode = 56;        break;
        case "9":          e.keyCode = 57;        break
}

    switch(e.keyCode){

    
    case 32: // space 
    console.log(">>>>>>") 
    playerMenu(0,0,"clear")
    playSound("audio/menucancel.wav")
    document.removeEventListener('keydown', handleSpells)
    document.addEventListener('keydown', handlelock)
    document.removeEventListener('click', handleSpells)
    document.addEventListener('click', handlelock)
    objZ = track.find(objZ => objZ.id === tempsprite.id);
    playerMenu(objZ.x+80,objZ.y+80,"MainMenu","13px")
    break;



    case 49: // 1
     spell = playerSpellBooks[0].spells[0] // this is an array so 0 would = 1  
     
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(0)
        monsterSummon(spell.id)
     }
    break;

    case 50: // 2
     spell = playerSpellBooks[0].spells[1] 
     
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(1)
        monsterSummon(spell.id)
     }
    break;

    case 51: // 3
     spell = playerSpellBooks[0].spells[2] 
     
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(2)
        monsterSummon(spell.id)
     }
    break;

    case 52: // 4
     spell = playerSpellBooks[0].spells[3] 
  
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(3)
        monsterSummon(spell.id)
     }
    break;

    case 53: // 5
     spell = playerSpellBooks[0].spells[4] 
    
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(4)
        monsterSummon(spell.id)
     }
    break;

    case 54: // 6
     spell = playerSpellBooks[0].spells[5] 
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(5)
        monsterSummon(spell.id)
     }
    break;

    case 55: // 7
     spell = playerSpellBooks[0].spells[6] 
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(6)
        monsterSummon(spell.id)
     }
    break;

    case 56: // 8
     spell = playerSpellBooks[0].spells[7] 
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(7)
         monsterSummon(spell.id)
     }
    break;

    case 57: // 9
     spell = playerSpellBooks[0].spells[8] 
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(8)
        monsterSummon(spell.id)
     }
    break;

    default:
    playSound("audio/menuerror.wav")

    }

 }

function handlelock(e){

    switch (mouseClickMenu){

        case "1":  // menu item 2 - send character code for 2
        e.keyCode = 50
        break;

        case "2":  // menu item 3 - send character code for 3
        e.keyCode = 51
        break;

        case "3":  // menu item 4 - send character code for 4
        e.keyCode = 52
        break;
}

    switch(e.keyCode){
     
        // do I need a space here?
         /*   case 32: // space  
            playerMenu(0,0,"clear")
            playSound("audio/menucancel.wav")
            document.removeEventListener('keydown', handlelock)
            tempsprite.img = document.getElementById("cursor")
            tempsprite.src="cursor.png"
            drawText("clear","canvasConsole")
            generateSprite(tempsprite,0)   
            break;*/

            
            case 50: // 2 Select Spells
            playSound("audio/menuselect.mp3")
            handleInput("add","handleSpells")
            handleInput("remove","handlelock")
            playerMenu("SelectSpells")
            helper("","Selecting Spell")
             break;

            case 51: // 3 Movement key
            console.log("move")
            console.log("MOVEMENT KEY")
           // paint grid range
           supportForMovement()
           console.log("ENDMOVEMENTKEY")
            playerMenu("clear")
            handleInput("add","handleCharacterMovement")
            handleInput("remove","handlelock")
              
            
         
            break;

            case 52: // 4 End Turn
            handleInput("remove","handlelock")
           
            playerMenu("clear")
            endTurn()
            /* playSound("audio/menucancel.wav")
             sprites[0].thesprite.img = document.getElementById("cursor")
            sprites[0].thesprite.src="sprites/cursor.png"
            
            // generateSprite(tempsprite,0)
            $(".aMenu").hide() */
           

           
            console.log("Key 4 under handlelock: ","handleMoves")
            // processMovement(sprites[0].thesprite)
            break;

           

            default:
            playSound("audio/menuerror.wav")
         }
       
    }


// support space key for processMovement
let spaceFirst = (sprite,mouse=0) => {
// change icon of cursor! should be one freakin line!
       // position of cursor

     

    
}


function handleMoves(e) // only player at the moment track[0] for player 1
    {

            
        

console.groupCollapsed("movement - handleMoves")
    var prev_state=""

    var smx = 0;
    var smy = 0;
    objZ = "";
    
    // update track object
    mousePos = getSquare(canvasGrid, e);
   // console.log("%c mousePos: " + mousePos.x,"background-color:black,color:white")
    objIndex = 0
    if (e.detail == 1) e.keyCode = 32

    
  switch(e.keyCode) {
    case 32: // space
 
  /*  if (e.detail == 0)
        { 
            
            // 0 is keyboard
            // objZ = track.find(objZ => objZ.id === sprite.id);
            smx= mX.a
            smy= mY.b

             // what is in the selected box?
             aObj = findO(track,"mousePos","full",smx + "," + smy)
             currentlySelectedCharacterIndex = findO(track,"mousePos","index",smx + "," + smy)


        } 
        else */
   if (e.detail ==1)     { 

    

            // 1 is mouse
          smx = parseInt(mousePos.x)
          smy = parseInt(mousePos.y) 

            // update cursor position for global variable (track cursor) too
            mX.a = smx
            mY.b = smy
        
            // update cursor position
          //  track[0].x = smx*global.spriteSize.width
         //   track[0].y = smy*global.spriteSize.width 
           // track[0].x = smx
           // track[0].y = smy
        
            // what is in the selected box?
            aObj = findO(track,"mousePos","full",mX.a + "," + mY.b)

            console.log("%c aobj lock in handleMoves: " + aObj,"color:blue")
           
          // console.log(">>>>>aobj:",aObj)
         //  console.log(">",potentialIndex,"<< potential Index")
           // this code needs to be finished for accessing other human players
           /*
           if (aObj.CLASS = "player") {
               if (aObj.gKey == currentlySelectedCharacterIndex) {
                   // can only select currently player character

               }
           } else {
               // a monster has been selected
                currentlySelectedCharacterIndex = findO(track,"mousePos","index",smx + "," + smy)
           }
           */
         }
         console.log('aobk:',aObj)
        // console.log(aObj.gKey)
        console.log('umm')

    // if a fellow monster has been selected
    if (aObj !== undefined && aObj.CLASS==="monster" && aObj.Owner==currentlySelectedCharacterIndex)
    {
        playSound("audio/menuselect.mp3")
        playerMenu("monsterMenu")
        helper("","Monster Menu")
        handleInput("remove","handleMoves")
        handleInput("add","handleMonsterMenu")
    }

    // if a player has been selected
    if (aObj !== undefined && aObj.CLASS==="player" && aObj.gKey==currentlySelectedCharacterIndex)
    {
        console.log("Player Selected")
        playSound("audio/menuselect.mp3")
    //    sprites[0].thesprite.src="sprites/cursor_sel.png"
        playerMenu("gameMenu")
        helper("","Player Menu")
        handleInput("remove","handleMoves")
        handleInput("add","handlelock")
        console.log("END Player Selected under handleMoves: ","handlelock")
    }
    
    break;

    // initial cursor movement
    case 38: // up
        current_state = "up";
        if(mY.b > 0){
        if (localRange < track[objS].Range) { 
             mY.b -- 
             localRange ++ // localRange determines how far the char can go!
              if(track[objS].y > (0)){
                   track[objS].y -= global.spriteSize.width
                   mp = track[objS].mousePos.split(",")
                   mp[1]--
                   track[objS].mousePos = mp[0] + "," + mp[1]
              }
        }}
        break;

        case 40: // down
        current_state = "down";
        if (mY.b < (global["boundary"].height/global.spriteSize.width)){
        if (localRange < track[objS].Range) {      
         mY.b ++ 
         localRange ++
         if (track[objS].y < (global["boundary"].height - global.spriteSize.width)){
              track[objS].y += global.spriteSize.width
              mp = track[objS].mousePos.split(",")
              mp[1]++
              track[objS].mousePos = mp[0] + "," + mp[1]
         }
        }}
        break;
    
        case 37: // left
        current_state = 'left';
        if (mX.a > 0){
            if (localRange < track[objS].Range)
             {
              mX.a -- 
              localRange ++
              track[objS].x > (0) ? track[objS].x -= global.spriteSize.width  : ""
              mp = track[objS].mousePos.split(",")
              mp[0]--
              track[objS].mousePos = mp[0] + "," + mp[1]
        }}        
        break;
    
        case 39: // right
        console.log("right",track)
        current_state = 'right';
        
        if (mX.a < (global["boundary"].width/global.spriteSize.width)) { 
            if (localRange < track[objS].Range) {
            mX.a ++ 
            localRange ++
            if (track[objS].x < (global["boundary"].width - global.spriteSize.width))
            {
                track[objS].x += global.spriteSize.width
                mp = track[objS].mousePos.split(",")
                mp[0]++
                track[objS].mousePos = mp[0] + "," + mp[1]
            }
        }}  
        break;  

  }
    console.groupEnd()
}

// handle all input
function handleInput(type,id){

    debug.console == 1 ? console.log("%c *** HANDLE INPUT *** " + type + "-" + id,"background-color:black;color:yellow") : ""

    debug.console == 1 ? $("#mouseEvents").append(type + " - " + id + "<br>") : ""

    if (type=="add")
    {
      eval("document.addEventListener('click'," + id + ")")
    //  document.addEventListener('click', id)
    }
  
    if (type=="remove")
    {
        eval("document.removeEventListener('click'," + id + ")")
     }
  
  }

/*function processMovement(sprite,keys="0")
{
   
    document.addEventListener('click', handleMoves)
    console.log("END processMovement: ","handleMoves")

}*/
