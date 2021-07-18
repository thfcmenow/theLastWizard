// const fs = require('fs')
// https://jsfiddle.net/184m4ugd/

// grab monsters config file
// const monsters = JSON.parse(fs.readFileSync('monsters.json', 'utf8'))






// config global fancybattlefield - whether to zoom in or not
if (debug.fancyBattlefield.display === 0) $("#mainPortal").removeClass("mainPortal")

// temporary object for object addition (used for track)
var tempObject = {};

// monsterKey - convoluted way of working out the playerSpellBooks
var monsterKey = []
 
// what players are AI and what are not
var playerTrack = []

var pagePos = {}

 pArray = 0

 mouseClickMenu = 0






/* used for spellbook constructions */

var playerSpellBooks = []



var newHeight = 0
var img = ""

// asynchronous sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// returns propercase
String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

//draw grid on playfield
function getSquare(canvas, evt) { // use for mouse
  var rect = canvas.getBoundingClientRect();
  if(debug.testMouse.test){ //80 us 64 on scale 1.25
  //console.warn(((evt.clientX - rect.left) - (evt.clientX - rect.left)%10)/scaleValue)
  //console.warn(((evt.clientY - rect.top) - (evt.clientY - rect.top)%10))
  
  //console.warn((evt.clientX - rect.left) - (evt.clientX - rect.left)/100*scaleValue)
 // console.warn((evt.clientY - rect.top) - (evt.clientY - rect.top)/100*scaleValue)
  }
  if(debug.fancyBattlefield.display) {
  x=(1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10)/85
  y=(1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10)/85
  } else {
 //x=(1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10 - global.margin.value)/global.spriteSize.width/scaleValue
 //  y=(1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10 - global.margin.value)/global.spriteSize.height/scaleValue

   x=(1 + (evt.clientX - rect.left) - (evt.clientX - rect.left)%10)/global.spriteSize.width/scaleValue
   y=(1 + (evt.clientY - rect.top) - (evt.clientY - rect.top)%10)/global.spriteSize.height/scaleValue
     }
  if (x.toString().charAt(1)==".") { x = x.toString().charAt(0) } else {x = x.toString().charAt(0)+x.toString().charAt(1)}
  if (y.toString().charAt(1)==".") {y = y.toString().charAt(0) } else {y = y.toString().charAt(0)+y.toString().charAt(1)}
  return {
      x: x,
      y: y
  };
} 

function drawGrid(context) {
 
  /*context.beginPath();
  context.moveTo(0, 30);
  context.lineTo(global["boundary"].width, 30);
  context.stroke();*/

  for (var x = 0; x < global["boundary"].width; x += global.spriteSize.width) {
  //  for (var x = 0; x < 2; x += global.spriteSize.width) {
        
  
    context.moveTo(x, 0);
    context.lineTo(x, global["boundary"].height);
  }
  
  for (var y = 0; y < global["boundary"].height; y += global.spriteSize.width) {
    context.moveTo(0, y);
    context.lineTo(global["boundary"].width, y);
  }
  
  context.strokeStyle = "#ddd";
  context.stroke();
}

function fillSquare(context, x, y){
  context.fillStyle = "gray"
  context.fillRect(x,y,9,9);
}

/*var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');*/


drawGrid(cde);

// test Mouse position
if(debug.testMouse.test){
  canvasGrid.addEventListener('click', function(evt) {
  //  var mousePos = getSquare(canvasGrid, evt);
    var mousePos = getSquare(canvasBackground, evt);
    let mouseX = mousePos.x + global.margin.value
    let mouseY = mousePos.y + global.margin.value
    // console.log("debug:",mouseX,mouseY)
    // console.log("debug:",mousePos.x,mousePos.y)
      
    fillSquare(cde, mousePos.x, mousePos.y)
  }, false)
  }


function changeCursor(state){
  // 0 - cursor.png standard
  if(state==0) sprites[0].thesprite.img = document.getElementById("cursor")
  if(state==2) sprites[0].thesprite.img = document.getElementById("cursor_action")
}

// function used for display variables via a key press, see config.js : debug
// use by keycode or displayConsole("variableName") or displayConsole("all")
function displayConsole(specific=""){
  disp = (x) => {
    console.log("%c > > " + x + "---------------------", "color:gray")
    console.log(this[x])
    console.log("%c -------------------- < < " + x, "color:gray")
  }

  if (debug.toggleConsole.display === 1) {
    if (specific === "" || specific === "all") {

     

    debug.toggleConsole.variables.forEach((x,i) => {disp(x)})
    helper(track[currentlySelectedCharacterIndex],"Casting Spell: BOLT")
    playSound("audio/spark.wav",0.3)
    generateParticle(60,-5,1);
    sleep(500).then(() => {
      playSound("audio/photorp2.wav")
      generateParticle(60,-5,currentlySelectedCharacterIndex,3,"bolt")
    })
    sleep(2500).then(() => {
      generateParticle(35,-15,3,-1,'impact');
  
  })

    sleep(5000).then(() => {
      playSound("audio/spark.wav",0.3)
    helper(track[currentlySelectedCharacterIndex],"Casting Spell: BEAM")
    generateParticle(60,-5,1)
  })

    sleep(5500).then(() => {
      playSound("audio/borg.mp3",0.3)
      generateParticle(60,-5,currentlySelectedCharacterIndex,3,"beam")
    }) 
    sleep(7500).then(() => {
      generateParticle(35,-15,3,-1,'impact');
  
  })
    }
    else disp(specific)
  }
}

 // let aObj = track.findIndex(aObj => aObj.id === tmpName);
//  let aObj = findO(track,id,"index",tmpName)
// support function for finding objects within an object
function findO(objectToSearch,ext,type,searchFor){
 // console.log(ext,type,searchFor)
  if (type=="index")
  littleObj = objectToSearch.findIndex(littleObj => littleObj[ext] === searchFor);
  if (type=="full")
  littleObj = objectToSearch.find(littleObj => littleObj[ext] === searchFor);
  return littleObj
}

// global event listener for debug keypress (config.js) if needed
if (debug.toggleConsole.display === 1)
{
  window.addEventListener('keydown', function(event) {
    let debugKey = debug.toggleConsole.charCode
    switch(event.keyCode){
      case debugKey: // key defined in debug | config.js
      displayConsole()
      break;
    }
}, true)
}

gKey=0
// class constructor for sprite[]
class Sprite {
  constructor (ID,width,height,frameWidth,frameHeight,src,current_state,current_frame,posx,posy,trackMovement,classType,monsterType,root,linkValue=0,human=0)
  {
    gKey++
     this.id = ID;
     this.linkValue = linkValue;
     this.root = root;
     var imageTag = document.createElement("img");
     var elementToPlace = document.getElementById("resources")
     this.img = document.getElementById(ID);
     
     if (this.img == null) {
       console.log("executing creation")
       imageTag.setAttribute('id',ID)
       imageTag.setAttribute('src',"sprites\\" + root + ".png")
       elementToPlace.appendChild(imageTag)
       this.img = document.getElementById(ID)
      }
     this.current_state = current_state;
     this.current_frame = current_frame;
     this.imageWidth = width;
     this.imageHeight = height;
     this.frameWidth = frameWidth;
     this.frameHeight = frameHeight;
     this.posx = posx*global.spriteSize.width;
     this.posy = posy*global.spriteSize.height;
     this.trackMovement = trackMovement
     this.classType = classType
     this.monsterType = monsterType
     this.gKey = gKey
     this.human = human
   };
}

// var cast = new Sprite("cast",384,64,64,64,"cast.png","down",0,350,350,0)

// used in 'generateSprite' when generating spellbook
var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};


function generateSprite(sprite,newrender,keys=0,rNum=0) {
 
 
  
  let tmpObj = {};
  let tmpObj2 = {};
  var spellObj = {}

  
  /*if (sprite.trackMovement !==0) // objects like our cursor do not care about being blocked 
  {
   // update gameBoard and render but only if nothing is there
    if (gameBoard['x' + sprite.posx/64 + "y" + sprite.posy/64] == "-")
    {
      // place on gameboard
      gameBoard['x' + sprite.posx/64 + "y" + sprite.posy/64] = sprite.id;

      globalMove = sprite.id
*/

      // place in track that helps track movement and stats
      let objT = track.find(objT => objT.id === sprite.id);
      if (objT == undefined)
       {
      
     
        tmpObj.id = sprite.id
        tmpObj.root = sprite.root
        tmpObj.x = sprite.posx // accounts for margin
        tmpObj.y = sprite.posy
        tmpObj.gKey = sprite.gKey
        tmpObj.gridX = sprite.posx/global.spriteSize.width
        tmpObj.gridY = sprite.posy/global.spriteSize.width
        tmpObj.mousePos = (sprite.posx/global.spriteSize.width) + "," + (sprite.posy/global.spriteSize.width)
        tmpObj.CLASS = sprite.classType
        tmpObj.opacity = 1
        

          if (sprite.classType==="player") {
             tmpObj.Range = global.PlayerMaxRange // character movement
             tmpObj.Origin = {"x":58,"y":17} // where a spell will cast from
             tmpObj.Owner = sprite.gKey // who owners the mage sprite, the same player duh
             tmpObj.human = sprite.human // 1 if human controlled
             tmpObj.DP = [0,0]
             tmpObj.HP = 30
             tmpObj.MaxHP = 30
             tmpObj.AP = 5
          }
   console.log(sprite)
       if (sprite.classType==="monster") {
         tmpObj.Owner = currentlySelectedCharacterIndex
         tmpObj.HP = monsters[sprite.root].HP
         tmpObj.AP = monsters[sprite.root].AP
         tmpObj.CLASS = sprite.classType
         tmpObj.Range = monsters[sprite.root].Range
         tmpObj.DP = monsters[sprite.root].DP
         tmpObj.MaxHP = monsters[sprite.root].HP
       }

       
     // if applicaable find monster HP/AP
     try {tmpHP = monsters[sprite.root].HP; tmpObj.HP = tmpHP} catch(err){}
     try {tmpAP = monsters[sprite.root].AP; tmpObj.AP = tmpAP} catch(err){}
   //  try {tmpCLASS = monsters[sprite.root].CLASS; tmpObj.CLASS = tmpCLASS} catch(err){}
      }
     
      track.push(tmpObj)
    
   
     // spell book setup ------------------------------------------------------------------------------------------------
     if (sprite.classType == "player") {

        // give player 1 range of 1 (pathetic)
       // track[gKey].Range = debug.maxPlayerRange

        // store facing direction
        track[gKey].Facing = sprite.current_state
        
        // temporary array to sort out spell duplicates
        var tempSpellBook = [];
      
     
      // setup tempSpellBook - which is a no duplicate array
      a=0;
     
        
        // go through spellbook and pick one based on chance
        for (i = 0; i < global.noOfSpells.max; i++)
        {
        var keys = Object.keys(spells)
        var randIndex = Math.floor(Math.random() * keys.length)
        var randKey = keys[randIndex]
        var name = spells[randKey].id
        if (a < global.noOfSpells.max)
        {
          if (!tempSpellBook.includes(name) || name=="summon") 
          {
           a++
           tempSpellBook.push(name) // no duplicates but ok for summon
          }
        }
      }
      
        //assign the spellboox to the current mage and place in spellbook
        spellObj = {"id":sprite.id,"spells":tempSpellBook,"used":[]}  // sprite ID is the player
        playerSpellBooks.push(spellObj)

      
        
      // when the player has summon we have to identify what they can summon
      // the following makes sure that players don't have the same summon
      // spell (summon multiple of the same creature) more than one time
      monsterKey = []
      randomHave = []
     
      let randomGen = () => {
       return Math.floor(Math.random()*Object.keys(monsters).length)
      }

      loopBuster = 0
      playerSpellBooks[pArray].spells.forEach((element,index) => {
        if (element == "summon") {

          while (true) {
           loopBuster ++
           randomPick = randomGen()
           if (randomHave.includes(randomPick)==false) break;
           if (loopBuster > 20) break;
          }
        
            monsterTemp = monsters[Object.keys(monsters)[randomPick]]
            tempO = {"playerID":sprite.id,"key":index,"id":monsterTemp.lockID,"realid":monsterTemp.id}
            monsterKey.push(tempO)
            randomHave.push(randomPick)
          
         }
      })

playerSpellBooks[pArray].monsterKey = monsterKey



      pArray ++

 
    
    } // fin setting up spellbook --------------------------------------------------------------------------------------

          // send sprite to renderer (render.js)
         render(sprite,newrender,keys=0)
  
  } // fin generateSprite


 

function beastStats(beasts){
  console.log(beasts)

}



// https://freesound.org/people/pumodi/sounds/150222/
// menuselect

function playSound(path,vol=1,loopMode=false)
{
  var audio = new Audio(path);
    audio.pause()
    audio.volume = vol;
    if (global.audioOverride == 1) audio.volume = 0;
    audio.loop= loopMode;
    audio.playbackRate=1
    audio.play();
  
}
var mySound;

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

// setup sound objects
var impact = new sound("audio/impact.wav")


function summonRandomMonster(monsterSpell){
  rNum = (Math.random() * (10000000 - 10 + 1) ) << 0;
  eval('var ' + monsterSpell + rNum + ' = new Sprite("' + monsterSpell + rNum + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + monsterSpell + rNum + '","left",0,' + gridX +','+ gridY + ',1,"monster","' + monsterSpell + rNum + '","' + monsterSpell + '")')
  eval('generateSprite(' + monsterSpell + rNum +',1,' + rNum + ')')
  // update gameboard
  updateFakeTrack()
}


function mainProg(){

  $("#firstScreen").remove()
  
  //var cursor = new Sprite("cursor",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"cursor.png","down",0,11,0,0,"cursor","Cursor","cursor")
  //generateSprite(cursor,0)
  toao = {"id":"tempcursor","gKey":0}
  track.push(toao)
 

  
 // playerOne human control 1 at the end, wah what about playerTrack!
  var playerOne = new Sprite("mage",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage.png","right",1,1,1,1,"player","Player","mage",0,1)
  generateSprite(playerOne,1)
  playerTrack.push("human")

  var playerTwo = new Sprite("mage2",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage2.png","left",0,9,1,1,"player","Player","mage2")

  // var playerTwo = new Sprite("mage2",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage2.png","left",0,gridsWidth-2,gridsHeight-2,1,"player","Player","mage2")
  // var playerTwo = new Sprite("mage2",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage2.png","left",0,4,1,1,"player","Player","mage2")
  generateSprite(playerTwo,1)
  playerTrack.push("computer")

  //var playerThree = new Sprite("mageStaff",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mageStaff.png","left",0,4,1,1,"player","Player","mageStaff")
  //generateSprite(playerThree,1)
  //playerTrack.push("computer")

  // sprites[1].thesprite.img.src = "sprites\\mageStaff.png"
  

  /* var vampire = new Sprite("vampire",64,128,64,64,"vampire.png","down",0,6,3,1,"monster","Monster","vampire")
  generateSprite(vampire,1)
 

  var goblin = new Sprite("goblin",64,128,64,64,"goblin.png","down",0,4,2,1,"monster","Monster","goblin")
 generateSprite(goblin,1)*/


 //update gameboard
 updateFakeTrack()

 //init mouse
 handleInput("add","handleMoves")
 

 // drawText("GAME Loaded")

 


 
 

 //lines
 
 /*var helperElement = document.getElementById('helper').style;
function helper(obJS,text){
    
    $("#helper").html("")
    helperElement.transition = '0.3s';
    helperElement.border = 'border 1px white'
    helperElement.opacity = 1 
    $("#helper").show()
    $("#helper").css("left",(obJS.x + global.spriteSize.width + 80)*scaleValue)
    $("#helper").css("top",(obJS.y + global.spriteSize.height + 0)*scaleValue)
    options = {strings: [text],contentType: 'html', typeSpeed: 20};
    var typed = new Typed('#helper', options);
    sleep(4000).then(() => { 
        helperElement.transition = '1s';
        helperElement.opacity = 0
    });

    }*/
 
 
 

// helper(track[1],"why no worky")


  }

//helper functions ----------------------

// select random player
 // display insult every x second
 // https://www.sitepoint.com/delay-sleep-pause-wait/
 // https://github.com/mattboldt/typed.js/
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
 }
 
 // fireIt()
 var fin = setInterval(fireIt,global.insults)

 var cancelTurn = 0

 $("#cancelTurn").click(function(){
   console.log("registered click?")
   cancelTurn = 1
 })

var helperElement = document.getElementById('helper').style;
function helper(obJS="",text,color="white"){
    
    $("#helper").html("")
    helperElement.transition = '0.3s';
    
    helperElement.opacity = 1 
    helperElement.fontSize = 22
  
    $("#helper").show()
   // $("#helper").css("left",(obJS.x + global.spriteSize.width + 80)*scaleValue)
  //  $("#helper").css("top",(obJS.y + global.spriteSize.height + 0)*scaleValue)
  //  options = {strings: [text],contentType: 'html', typeSpeed: 20};
  //  var typed = new Typed('#helper', options);
  //  sleep(transSpeed).then(() => { 
  //      helperElement.transition = '1s';
  //      helperElement.opacity = 0
  //  });
  helperElement.color = color
  $("#helper").html(text)

  if (text == "Out of Range!") {
    $("#helper").append(" - <span id='cancelTurn' style='color:yellow'>Cancel Turn</span> - or try again")
  }

    }

var helperHit = document.getElementById('helperHit').style;
function helperHitC(obJS,text,transSpeed=2000){
        
        $("#helperHit").html("")
        helperHit.transition = '0.3s';
        helperHit.border = 'border 1px white'
        helperHit.opacity = 1 
        $("#helperHit").show()
        $("#helperHit").css("left",(obJS.x + 80)*scaleValue)
        $("#helperHit").css("top",(obJS.y +  0)*scaleValue)
        options = {strings: [text],contentType: 'html', typeSpeed: 5};
        var typed = new Typed('#helperHit', options);
        sleep(transSpeed).then(() => { 
            helperHit.transition = '1s';
            helperHit.opacity = 0
        });
    
}
  
// some first screen setup
// vertically align menu
mainHeight = $("main").css("height")
mainHeightAdjust = document.documentElement.clientHeight - parseInt(mainHeight)
$("main").css("margin-top",(mainHeightAdjust/2)-50 + "px")

// set and display scale
$("#scaleRatio").html(scaleValue)
$("#menuZoom").click(function(){
  scaleValue < 1.76 ? scaleValue = scaleValue + 0.25 : scaleValue = 1
  $(".wiz").css("transform", "scale(" + scaleValue + ")")
  $("#scaleRatio").text(scaleValue)
})

// display logo


// set no of players/icons on screen
iconSprite = '<img class="wiz" src="sprites/goldendragon.png">'

let menuPlayers = (playerscount) => {
  $("#iconWiz").html("")
  playerscount ++
  for (let i = 0; i < playerscount-1; i++) {
    $("#iconWiz").append(iconSprite)
  }
  
  global.noOfPlayers = playerscount-1
}

// first logo
$("body").click(function(){
  $("#logo").hide()
  $("body").css("background-color","black")
  $("#firstScreen").show()


  mySound = new sound("audio/last.mp3");
  mySound.play()
 

  playerscount = global.noOfPlayers
 
  menuPlayers(playerscount)

  $("#menuWizards").click(function(){
    playersCount = $("#theWizards").text()
    playersCount < 4 ? playersCount ++ : playersCount=2
    $("#theWizards").text(playersCount)
    menuPlayers(playersCount)
    $(".wiz").css("transform", "scale(" + scaleValue + ")")
  })

})





// Menu Begin
$("#initProgram").click(function(event){
  event.preventDefault
  $("body").unbind("click")
  mySound.stop()
  $("#firstScreen").addClass("homefadeOut")
  $(".homefadeOut").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
   $("#firstScreen").hide()
   $("#mainPortal").show()
   playSound("audio/blob.mp3",0.8,true)
   mainProg()
     });
  
})



// bypass Menu
// $("#initProgram").click()

fakeTrack = []

function updateFakeTrack()
{
  fakeTrack = []
 for (o = 0;o < track.length;o++){
   if (track[o].CLASS !== "cursor"){
     fakeTrack.push(track[o])
   }
 }
}



var mouser = document.getElementById('mouse').style
mouser.position = 'absolute'
mouser.top = '5px'
mouser.right = '20px'
mouser.fontFamily = 'Zelda'
mouser.color = 'yellow'

scaledMargin = global.margin.value * scaleValue * scaleValue
scaledBlockSize = global.spriteSize.width * scaleValue * scaleValue // block size scalevalue

console.groupCollapsed("setup - margins")
console.log("scaledMargin:",scaledMargin)
console.log("scaledBlockSize:",scaledBlockSize)
console.groupEnd()

var latestSelectedMonster = "";
var mousePos = {}
$(document).ready(function(){

$("body").click(function(e){
    pX = Math.floor(e.pageX * scaleValue) - scaledMargin
    pY = Math.floor(e.pageY * scaleValue) - scaledMargin
    pagePos = {'x': pX,'y': pY}
    gridX = Math.floor(pX/(global.spriteSize.width*scaleValue*scaleValue))
    gridY = Math.floor(pY/(global.spriteSize.height*scaleValue*scaleValue))
    result = fakeTrack.find( ({mousePos}) => mousePos === gridX + "," + gridY  )
      if (result !== undefined){ 
				latestSelectedMonster = result
      }
})

$("body").mousemove(function(e){
 

  pX = Math.floor(e.pageX * scaleValue) - scaledMargin
  pY = Math.floor(e.pageY * scaleValue) - scaledMargin
  // e.pageX - global.margin.value
  //take into accound margin and scale
      pagePos = {'x': pX,'y': pY}
      gridX = Math.floor(pX/(global.spriteSize.width*scaleValue*scaleValue))
      gridY = Math.floor(pY/(global.spriteSize.height*scaleValue*scaleValue))
      //  var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
      subText = "pagePos: " + pagePos.x + " (" + gridX + "), "
      subText += pagePos.y + " (" + gridY + ") - "

      if (gridX > -1 && gridY > -1){
         $("#mouse span:first").text(subText)
      }
     
      result = fakeTrack.find( ({mousePos}) => mousePos === gridX + "," + gridY  )
      if (result !== undefined){ 
		$("#mouse span:last").text(result.id)
	// 	latestSelectedMonster = result
		$("#miniConsole").text(latestSelectedMonster.id + " | HP" + latestSelectedMonster.HP)
		
		}
		else{
			$("#mouse span:last").text("")
			$("#miniConsole").text("")
			}
     // console.log(result)
     
        //  $("#mouse span:last").text("( e.clientX, e.clientY ) - " + clientCoords);
 });
})

//sp7.left = 700
//sp7.top = 500
// david shields code
// document.getElementById("myDIV").style.transform = "rotate(7deg)";



/*
var
      stylesheet = document.styleSheets[2] // replace 0 with the number of the stylesheet that you want to modify
    , rules = stylesheet.rules
    , i = rules.length
    , keyframes
    , keyframe
;

while (i--) {
 
    keyframes = rules.item(i);
    console.log(keyframes)
    if (
        (
               keyframes.type === keyframes.KEYFRAMES_RULE
            || keyframes.type === keyframes.WEBKIT_KEYFRAMES_RULE
        )
        && keyframes.name === "pulseIn"
    ) {
        rules = keyframes.cssRules;
        i = rules.length;
        while (i--) {
            keyframe = rules.item(i);
            console.log(keyframe)
            if (
                (
                       keyframe.type === keyframe.KEYFRAME_RULE
                    || keyframe.type === keyframe.WEBKIT_KEYFRAME_RULE
                )
                && keyframe.keyText === "100%"
            ) {
               keyframe.style.webkitTransform =
                keyframe.style.transform =
                    "translateX(600px)";
                break;
            }
        }
        break;
    }
} 

*/