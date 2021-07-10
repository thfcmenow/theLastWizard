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

    mousePos = getSquare(canvasGrid, e);
if (e.detail == 1) {
 console.log("end turn")
 $("#helper").hide()
 document.removeEventListener('keydown', endKeys)
  document.removeEventListener('click',endKeys)
  ai(currentlySelectedCharacterIndex+1)
}

switch(e.keyCode){
    case 32: // space  
    console.log("final end turn")
    $("#helper").hide()
    document.removeEventListener('keydown', endKeys)
  document.removeEventListener('click',endKeys)
    break;
}
}

function endTurn(){
// this function handles all end turn scenarios

// Select : Move Character : Finish all Moves

// Select : 4. End Turn
helper("","Press 0 or Mouse Key to End Turn")
document.addEventListener('keydown', endKeys)
document.addEventListener('click',endKeys)


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
   
     console.log("tary before manipulation: ", tary)
     // stepsNeededY = (tary - track[currentlySelectedCharacterIndex].y) / maxFireFrame
     tary > minFireY ?  stepsNeededY = -Math.abs((minFireY - tary) / maxFireFrame) : stepsNeededY = Math.abs((minFireY- tary) / maxFireFrame);
    
     stepsNeededX = ((tarx - minFireX) / maxFireFrame)
     
 
     console.log("tarx:" + tarx)  // [real coordinates]
     console.log("tary:" + tary) // [real coordinates]
     console.log("track[turn].x",minFireX) // the current players X
     console.log("track[turn].y",minFireY) // the current players y
     console.log("stepsNeededX:" + stepsNeededX) // angle for spell track x
     console.log("stepsNeededY:" + stepsNeededY) // angle for spell track y
 
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
        console.log('%c listx ver 2:' + listx,'background-color:black; color:yellow')
        console.log(listx)
console.log(listx.length)
}



function strike(e){
    // when you looking for target for ranged spell
	// explosion test



    // tenmpsprite needs to be cursor? so track[0]
  // let objIndex = track.findIndex((obj => obj.id == tempsprite.id));
  document.removeEventListener('keydown', handleSummon)
  document.removeEventListener('click',handleSummon)
  // document.removeEventListener('keydown', handleMoves)
  
  // using mouse to fire spell
  if (e.detail == 1) {
    // update cursor position in track[0] and grab a lock
    mousePos = getSquare(canvasBackground, e);
    // track[0].mousePos = (mousePos.x-1) + "," + (mousePos.y-1)
    // cursorPos = track[0].mousePos.split(",")
    console.log("mousePos: ", mousePos)

    // let user know what we are doing
    helper(track[currentlySelectedCharacterIndex],"Casting spell - M")
    // find character/monster you have targetted
    // targetIndex = findO(track,"mousePos","index",mousePos.x + "," + mousePos.y)
	targetIndex = latestSelectedMonster.gKey
 console.log('targetIndex:',targetIndex)
    // is the track clear?
    
    minFireX = track[currentlySelectedCharacterIndex].x
    minFireY = track[currentlySelectedCharacterIndex].y
    tarFireX = mousePos.x * global.spriteSize.width
	
	targetFireX = latestSelectedMonster.x
	console.log("%c -- tarFireX: " + targetFireX, "background-color:purple;color:white")
	
    tarFireY = mousePos.y * global.spriteSize.width

	targetFireY = latestSelectedMonster.y
	console.log("%c -- tarFireY: " + targetFireY, "background-color:purple;color:white")
    strikePath(minFireX,minFireY,targetFireX,targetFireY)
    trackDup = []
    i = -1;

while (++i < track.length) {
  trackDup[i] = track[i];
}
    trackDup.splice(currentlySelectedCharacterIndex,1) // remove current player
    trackDup.splice(0,1) // remove cursor

    // minFireX = 0   obj = 50 tarFireY = 80
    // minFireY  = 0    obj = 50   tarFirre
console.log("mins and tars: " ,minFireX,minFireY,tarFireX,tarFireY,trackDup[1].x,trackDup[1].y)
    for(let l=0;l < trackDup.length; l++)
    {
        console.log(trackDup[l].x)
        console.log(trackDup[l].y)
        if (trackDup[l].x >= minFireX && trackDup[l].x <= tarFireX){console.log("xlock")}
        if (trackDup[l].y >= minFireY && trackDup[l].y <= tarFireY){console.log("ylock")}
    } // sweep through and see if in path of fire
    
  // explodeCircle()

generateParticle(-1,-1)
    // fire ranged spell
    generateParticle(-1,-1,currentlySelectedCharacterIndex,targetIndex,mainspell)

    // impact of previous spell
   /* sleep(2000).then(() => { 
        generateParticle(-1,-1,currentlySelectedCharacterIndex,targetIndex,"impact")
     })*/
    

    // pixel(track[currentlySelectedCharacterIndex].x,track[currentlySelectedCharacterIndex].y,mousePos.x,mousePos.y) 
    
    // here is the current players position
   // mp = track[currentlySelectedCharacterIndex].mousePos.split(",")

    // if target is more than 1 slot away
    /*distanceX = cursorPos[0] - mp[0]
    distanceY = cursorPos[1] - mp[1]
    console.log("distanceX",distanceX)
    console.log("distnceY",distanceY)*/

    // summon the monster if within one spot away
   /* if(distanceX < 2 || distanceY < 2){
        eval('var ' + monsterSpell + ' = ' + 'new Sprite("' + monsterSpell + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + '","down",0,'+ cursorPos[0] +','+ cursorPos[1] +',1,"monster",monsters["' + monsterSpell+ '"].Type)')
        eval('generateSprite(' + monsterSpell + ',1)')
        sprites[0].thesprite.src="cursor.png"
        document.removeEventListener('keydown',handleSummon)
        document.removeEventListener('click',handleSummon)
        endTurn()
    }*/
}
  

 switch(e.keyCode){
        case 32: // space  
        //  pixel(tempx,tempy,track[objIndex].x,track[objIndex].y,spell)  
        pixel(tempx,tempy,mX.a*global.spriteSize.width,mY.b*global.spriteSize.height,spell)  

        // change cursor graphic to standard 0
        // changeCursor(0)
        sprites[0].thesprite.img = document.getElementById("cursor")
        document.removeEventListener('keydown', strike)
        document.addEventListener('keydown',handleMoves)
        document.removeEventListener('click', strike)
        document.addEventListener('click',handleMoves)
        break;

       case 38: // up
       mY.b > 0 ? mY.b -- : ""
       track[0].y > (0) ? track[0].y -= global.spriteSize.width  : ""
       break;

       case 40: // down
       mY.b < (global["boundary"].height/global.spriteSize.width) ? mY.b ++ : ""
       track[0].y < (global["boundary"].height - global.spriteSize.width)  ? track[0].y += global.spriteSize.width  : ""
       break;

       case 37: // left
       mX.a > 0 ? mX.a -- : ""
       track[0].x > (0) ? track[0].x -= global.spriteSize.width  : ""
       break;

       case 39: // right
       mX.a < (global["boundary"].width/ global.spriteSize.width) ? mX.a ++ : ""
       track[0].x < (global["boundary"].width - global.spriteSize.width) ? track[0].x += global.spriteSize.width  : ""
       break;
        
 }

}

// for handle character movement
var theC = {}
theC.x = -1
theC.y = -1

// range of char for movement
var localRange = 0

var cc = 0

console.log(monsterSpell)

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
    track[0].mousePos = mousePos.x + "," + mousePos.y
    cursorPos = track[0].mousePos.split(",")
    console.log("cursorPos2:",cursorPos)

    // here is the current players position
    mp = track[currentlySelectedCharacterIndex].mousePos.split(",")

    // if target is more than 1 slot away
    distanceX = cursorPos[0] - mp[0]
    distanceY = cursorPos[1] - mp[1]
    console.log("distanceX",distanceX)
    console.log("distnceY",distanceY)

    // summon the monster if within one spot away
    if(distanceX < 2 || distanceY < 2){
        eval('var ' + monsterSpell + ' = ' + 'new Sprite("' + monsterSpell + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + '","down",0,'+ cursorPos[0] +','+ cursorPos[1] +',1,"monster",monsters["' + monsterSpell+ '"].Type)')
        eval('generateSprite(' + monsterSpell + ',1)')
        sprites[0].thesprite.src="cursor.png"
        document.removeEventListener('keydown',handleSummon)
        document.removeEventListener('click',handleSummon)
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
        document.removeEventListener('keydown', handleSummon)
       // tempsprite.img = document.getElementById("cursor")
      //  tempsprite.src="cursor.png"
       // drawText("clear","canvasConsole")
       sprites[0].thesprite.src="cursor.png"
       // generateSprite(tempsprite,0)
       document.addEventListener('keydown',handleMoves)
       document.addEventListener('click',handleMoves)
       console.log("space bar press under handle summon, shif to handlemoves")
        break;

    }
    console.groupEnd()
}

localRange=0
function handleCharacterMovement(e,spell) {

// get the character using track and the cursor position

// objS = track.findIndex(objS => objS.mousePos === theCursor.x + "," + theCursor.y);
// the character selected on menu load should be the character you are moving
// console.log(currentlySelectedCharacterIndex)
objS = currentlySelectedCharacterIndex

mousePos = getSquare(canvasGrid, e);
if (e.detail == 1) {
    mp = track[objS].mousePos.split(",")
    limitrangeX = mousePos.x - mp[0]
    limitrangeY = mousePos.y - mp[1]
    if(limitrangeX == track[objS].Range || limitrangeY == track[objS].Range){
    if(localRange < track[objS].Range)
    {
     localRange ++
     track[objS].x = mousePos.x * global.spriteSize.width
     track[objS].y = mousePos.y * global.spriteSize.height
     if (localRange == track[objS].Range) {
          maxReached = "<br>MAXED Movement";
          document.removeEventListener('keydown',handleCharacterMovement)
          document.removeEventListener('click',handleCharacterMovement)
          endTurn()
     } else {
     helper(track[objS],"MP: " + localRange + " out of " + track[objS].Range + maxReached)
     }
    }}
}

// console.log("objS: handlecharactermovement",objS)
switch(e.keyCode){

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
        if (localRange == track[objS].Range) {
            document.removeEventListener('keydown',handleSpells)
            document.removeEventListener('click',handleSpells)
            document.removeEventListener('keydown',handleCharacterMovement())
            document.removeEventListener('click',handleCharacterMovememnt())
            // helper(track[objS],"MP: " + localRange + " out of " + track[objS].Range + maxReached)
            endTurn() 
        }
        break;

  
}
}


 function handleSpells(e){

    
   /* switch (mouseClickMenu){

        case "1":  // menu item 2 - send character code for 2
        e.keyCode = 50
        break;

        case "2":  // menu item 3 - send character code for 3
        e.keyCode = 51
        break;

        case "3":  // menu item 4 - send character code for 4
        e.keyCode = 52
        break;
}*/


    strikeOpponent = (spell) => {
        $(".aMenu").hide()
       // sprites[0].thesprite.img = document.getElementById("cursor_action")
       // generateSprite(sprites[0].thesprite,0)
       
        sprites[0].thesprite.img = document.getElementById("cursor_action")

        console.log("strikeOpponent, spell: ", spell)

        // strike can't see spell so make it global
        mainspell = spell

        // change cursor graphic to 2 action/strike
        // changeCursor(2)
      //  drawText("mage casting spell: " + spell + " | range: " + spells[spell].range,"canvasConsole")
        document.removeEventListener('keydown',handleSpells)
        document.removeEventListener('click',handleSpells)
        document.addEventListener('keydown', strike)
        document.addEventListener('click', strike)
        console.log("striekoponent under handlespells: strike ")
    }

    monsterSummon = (spell) => {
        // use handleSummon to place monster
        console.groupCollapsed("monsterSummon")
        var spell = spell.toLowerCase() // lowercase
        spell = spell.replace(" ","")  // replace space
        console.log("spell:",spell)
        monsterSpell = spell
        console.log("monsterSpell",monsterSpell)
        document.addEventListener('keydown', handleSummon)
        document.removeEventListener('keydown',handleSpells)
        document.addEventListener('click', handleSummon)
        document.removeEventListener('click',handleSpells)
        console.log("monstersummon under handlespells: handleSummon")
        playerMenu(0,0,"clear") // hide menu
        // actual rendering part has to wait until player determines where to place monster
        
        // eval('var ' + spell + ' = ' + 'new Sprite("' + spell + '",64,128,64,64,"' + spell + '","down",0,2,2,1,"monster",monsters["' + spell + '"].Type)')
        // eval('generateSprite(' + spell + ',1)')
        $(".aMenu").hide()
        sprites[0].thesprite.img = document.getElementById("cursor")
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
     console.log("spellCasting",spell)
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(0)
        monsterSummon(spell.id)
     }
    break;

    case 50: // 2
     spell = playerSpellBooks[0].spells[1] 
     console.log("spellCasting",spell)
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(1)
        monsterSummon(spell.id)
     }
    break;

    case 51: // 3
     spell = playerSpellBooks[0].spells[2] 
     console.log("spellCasgin",spell)
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(2)
        monsterSummon(spell.id)
     }
    break;

    case 52: // 4
     spell = playerSpellBooks[0].spells[3] 
     console.log("spellCasgin",spell)
     if (spells[spell].type=="strike") strikeOpponent(spell)
     if (spells[spell].type=="monster") 
     {
        spell = massageMonsterSpell(3)
        monsterSummon(spell.id)
     }
    break;

    case 53: // 5
     spell = playerSpellBooks[0].spells[4] 
     console.log("spellCasgin",spell)
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

// console.log("mouseEvents::", mouseClickMenu)
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
            document.removeEventListener('keydown', handlelock)
            document.removeEventListener('click', handlelock)
            playerMenu("SelectSpells")
            document.addEventListener('keydown', handleSpells)
            document.addEventListener('click', handleSpells)
            console.log("Key 2 under handleLock: ","handleSpells")
            break;

            case 51: // 3 Movement key
            // console.log("HEEERREE3")
            playerMenu("clear")
            document.removeEventListener('keydown', handlelock)
            document.removeEventListener('click', handlelock)
            document.addEventListener('keydown', handleCharacterMovement)
            document.addEventListener('click', handleCharacterMovement)
            // console.log("Key 3 under handleLock: ","handleCharacterMovememnet")

            // hide the cursor - we mark it as 'dead' so it wont render
            // with handleCharacterMovement - the character then becomes the cursor
            track[0].dead="yes" // the cursor should always be track[0] but may need to make this dynamic
            break;

            case 52: // 4 End Turn
            playerMenu("clear")
            endTurn()
            /* playSound("audio/menucancel.wav")
             sprites[0].thesprite.img = document.getElementById("cursor")
            sprites[0].thesprite.src="sprites/cursor.png"
            
            // generateSprite(tempsprite,0)
            $(".aMenu").hide() */
           

            document.removeEventListener('keydown',handlelock)
            document.removeEventListener('click',handlelock)
            document.addEventListener('keydown', handleMoves)
             document.addEventListener('click', handleMoves)
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
console.groupCollapsed("handleMoves")
    var prev_state=""

    var smx = 0;
    var smy = 0;
    objZ = "";
    
    // update track object
    mousePos = getSquare(canvasGrid, e);
    objIndex = 0
    if (e.detail == 1) e.keyCode = 32

    
  switch(e.keyCode) {
    case 32: // space
 
    if (e.detail == 0)
        { 
            
            // 0 is keyboard
            // objZ = track.find(objZ => objZ.id === sprite.id);
            smx= mX.a
            smy= mY.b

             // what is in the selected box?
             aObj = findO(track,"mousePos","full",smx + "," + smy)
             currentlySelectedCharacterIndex = findO(track,"mousePos","index",smx + "," + smy)


        } 
        else 
        { 
            // 1 is mouse
            smx = parseInt(mousePos.x)
            smy = parseInt(mousePos.y)

            // update cursor position for global variable (track cursor) too
            mX.a = smx
            mY.b = smy
        
            // update cursor position
            track[0].x = smx*global.spriteSize.width
            track[0].y = smy*global.spriteSize.width
        
            // what is in the selected box?
            aObj = findO(track,"mousePos","full",smx + "," + smy)
           
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
    // if a player has been selected
    if (aObj !== undefined && aObj.CLASS==="player" && aObj.gKey==currentlySelectedCharacterIndex)
    {
        playSound("audio/menuselect.mp3")
       // sprite.src="cursor_sel.png"
        // sprite.img = document.getElementById("cursor_sel")
        sprites[0].thesprite.src="sprites/cursor_sel.png"
        playerMenu("gameMenu")

        // update canvasConsole
        // drawText(gameBoard["x" + smx + "y" + smy],"canvasConsole")

        // menu selected so move keyboard state to handlelock and mouse
       
        document.removeEventListener('keydown',handleMoves)
        document.removeEventListener('click',handleMoves)
        document.addEventListener('keydown', handlelock)
        document.addEventListener('click', handlelock)

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

function processMovement(sprite,keys="0")
{
    document.addEventListener('keydown', handleMoves)
    document.addEventListener('click', handleMoves)
    console.log("END processMovement: ","handleMoves")

}


// mouse


/*canvasGrid.addEventListener('click', function(evt) {
    var mousePos = getSquare(canvasGrid, evt);
    let mouseX = mousePos.x
    let mouseY = mousePos.y
    console.log(mousePos)
   
    // what is in the current block (I use track)
    let whatisthere = findO(track,"mousePos","full",mouseX+","+mouseY)
    var foo = processMovement()
    foo.handleMoves(32)
    keyCode = 32;

    // fillSquare(cde, mousePos.x, mousePos.y)
  }, false);*/



/*


function processMovement(sprite)
{
var prev_state=""

console.log(sprite)

document.addEventListener('keydown', handleMoves)

function handleMoves(e)
{

    // update track object
    let objIndex = track.findIndex((obj => obj.id == sprite.id));
  
  switch(e.keyCode) {
    case 32: // space
       // change icon of cursor! should be one freakin line!
      
      if (sprite.src == undefined || sprite.src == "cursor.png")
       {
        sprite.src="cursor_sel.png"
        sprite.img = document.getElementById("cursor_sel")
        document.removeEventListener('keydown',handleMoves)
        // position of cursor
        let objZ = track.find(objZ => objZ.id === sprite.id);
       let smx=objZ.x/64
       let smy=objZ.y/64
        console.log("y",objZ.y/64)
        
      //   if (gameBoard["x" + smx + "y" + smy].length > 3)
      //  {
            generateSprite(sprite,0)
      //  }
        
       } else {
        sprite.src="cursor.png"
        sprite.img = document.getElementById("cursor")
        document.removeEventListener('keydown',handleMoves)
        generateSprite(sprite,0)

       }
        break;
    case 38: // up
      current_state = "up";
       // if (prev_state == "left") current_state = "left"
        // if (prev_state == "right") current_state = "right"
        track[objIndex].y > (0) ? track[objIndex].y -= 64  : ""
       // iconhero.position.y > (0) ? iconhero.position.y -= 64  : ""
        break;
    case 40: // down
       current_state = "down";
       // if (prev_state == "left") current_state = "left"
       // if (prev_state == "right") current_state = "right"
       track[objIndex].y < (global["boundary"].height - 64)  ? track[objIndex].y += 64  : ""
        // iconhero.position.y < (global["boundary"].height - 64)  ? iconhero.position.y += 64  : ""
        break;
    case 37: // left
        // current_state = 'left';
        // hero.position.x > (0) ? hero.position.x -= 64  : ""
        // iconhero.position.x > (0) ? iconhero.position.x -= 64  : ""
       // prev_state = current_state
        current_state = 'left';
        track[objIndex].x > (0) ? track[objIndex].x -= 64  : ""
        break;
    case 39: // right
        current_state = 'right';
        track[objIndex].x < (global["boundary"].width - 64) ? track[objIndex].x += 64  : ""

        //track[objIndex].x += 64
        
        
        //iconhero.position.x < (global["boundary"].width - 64) ? iconhero.position.x += 64  : ""
        //prev_state = current_state
        break;
case 80: // right test for p
console.log('p')
        current_state = 'right';
        track[objIndex].x < (global["boundary"].width - 64) ? track[objIndex].x += 64  : ""

        
    }
}

}


/*
var cframeWidth;
var cframeHeight;
cimage = new Image();
cimage.onload = function() {
cimageWidth = this.width;
cimageHeight = this.height;
cframeWidth = 64;
cframeHeight = cimage.height / 3;
};
cimage.src = "vampire.png"
var ccurrent_state = 'down';
var ccurrent_frame = 0;
var chero = {
position: {x: 0, y: 0}
};

var iconframeWidth;
var iconframeHeight;
iconimage = new Image();
iconimage.onload = function() {
iconimageWidth = this.width;
iconimageHeight = this.height;
iconframeWidth = 64;
iconframeHeight = iconimage.height / 2;
};
iconimage.src = "cursor.png"
var iconcurrent_state = 'down';
var iconcurrent_frame = 0;
var iconhero = {
position: {x: 0, y: 0}
};
var iconanimations = {
left: [{x: 0, y: 0}, {x: 0, y: 1}],
right: [{x: 0, y: 0}, {x: 0, y: 1}],
down: [{x: 0, y: 0}, {x: 0, y: 1}],
up: [{x: 0, y: 0}, {x: 0, y: 1}],
};

var frameWidth;
var frameHeight;
image = new Image();
image.onload = function() {
imageWidth = this.width;
imageHeight = this.height;
frameWidth = 64;
frameHeight = image.height / 3;
};
image.src = "idle_mage.png"
var current_state = 'down';
var current_frame = 0;
var hero = {
position: {x: 512, y: 256}
};
/*var animations = {
left: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
right: [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
down: [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
up: [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}]
};*/