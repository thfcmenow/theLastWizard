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
    console.log("debug:",mouseX,mouseY)
    console.log("debug:",mousePos.x,mousePos.y)
      
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

gKey=-1
// class constructor for sprite[]
class Sprite {
  constructor (ID,width,height,frameWidth,frameHeight,src,current_state,current_frame,posx,posy,trackMovement,classType,monsterType)
  {
    gKey++
     this.id = ID;
     this.img = document.getElementById(ID);
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
   };
}

// var cast = new Sprite("cast",384,64,64,64,"cast.png","down",0,350,350,0)

// used in 'generateSprite' when generating spellbook
var randomProperty = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};


function generateSprite(sprite,newrender,keys=0) {
 
 
  
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
        tmpObj.x = sprite.posx // accounts for margin
        tmpObj.y = sprite.posy
        tmpObj.gKey = sprite.gKey
        tmpObj.gridX = sprite.posx/global.spriteSize.width
        tmpObj.gridY = sprite.posy/global.spriteSize.width
        tmpObj.mousePos = (sprite.posx/global.spriteSize.width) + "," + (sprite.posy/global.spriteSize.width)
        tmpObj.CLASS = sprite.classType

          if (sprite.classType==="player") {
             tmpObj.Range = 1 // character movement
             tmpObj.Origin = {"x":60,"y":10} // where a spell will cast from
          }
   
       if (sprite.classType==="monster") {
         tmpObj.HP = monsters[sprite.id].HP
         tmpObj.AP = monsters[sprite.id].AP
         tmpObj.Range = monsters[sprite.id].Range
         tmpObj.DP = monsters[sprite.id].DP
       }

     // if applicaable find monster HP/AP
     try {tmpHP = monsters[sprite.id].HP; tmpObj.HP = tmpHP} catch(err){}
     try {tmpAP = monsters[sprite.id].AP; tmpObj.AP = tmpAP} catch(err){}
     try {tmpCLASS = monsters[sprite.id].CLASS; tmpObj.CLASS = tmpCLASS} catch(err){}
      }
     
      track.push(tmpObj)
    
   
     // spell book setup ------------------------------------------------------------------------------------------------
     if (sprite.classType == "player") {

        // give player 1 range of 1 (pathetic)
        track[gKey].Range = debug.maxPlayerRange

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
        spellObj = {"id":sprite.id,"spells":tempSpellBook}  // sprite ID is the player
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

    
      
   /*   var tKeys = []
monObj = {}
// now merge monsterKey into the player SpellBooks
playerSpellBooks.forEach((xx, i) => {
   monsterKey.forEach((x,i) => {

    if (xx.id === x.playerID) {
     monObj = {"key":x.key,"summonID":x.id}
    tKeys.push(monObj)

    }
  })

xx.summonKey = tKeys
tKeys=[]
})*/
      
      
          

         

    
    
    
    
    } // fin setting up spellbook --------------------------------------------------------------------------------------

          // send sprite to renderer (render.js)
         render(sprite,newrender,keys=0)
  
  } // fin generateSprite



      // convert ini
       
        // if spell already added, i-- and try again
        // however summon can go in book many times
    /*    if (name==="summon") {
          // need to send what kind of monster
          returnMonster = {}
          while (returnMonster.a !== "a")
          {
            Math.floor(Math.random() * 6) + 1 // rand number to pick them from monsters array
            returnMonster = randomProperty(monsters)
          }
          //  tempSpellBook.push(name + returnMonster.id)
          console.log("monsters>>")
          console.group()
          console.log("returnMonster.id",returnMonster.id)
          tempO = {"playerID":sprite.id,"key":i,"id":returnMonster.id}
          
          console.log("monsterKey:",monsterKey)
          alreadyhave = findO(monsterKey,"id","full",name)
          console.log("alreadyhave",alreadyhave)
          console.groupEnd()

          if (alreadyhave == undefined){
              monsterKey.push(tempO)
              tempSpellBook.push(name)
          }
        } else {

          tempSpell = tempSpellBook.find(element => element == name)
          console.log(tempSpell)
          if (tempSpellBook.find(element => element == name) !== "laser") {
          if (tempSpellBook.find(element => element == name) == undefined) {
                          tempSpellBook.push(name) 
                    }
                  }
          
        }
      
      }

spellObj = {"id":sprite.id,"spells":tempSpellBook}
playerSpellBooks.push(spellObj)





var tKeys = []
monObj = {}
// now merge monsterKey into the player SpellBooks
playerSpellBooks.forEach((xx, i) => {
   monsterKey.forEach((x,i) => {

    if (xx.id === x.playerID) {
      /* add to playerSpellBooks *//*

      monObj = {"key":x.key,"summonID":x.id}

    tKeys.push(monObj)

    }
  })

xx.summonKey = tKeys
tKeys=[]
})




      
     }
    
     // if applicaable find monster HP/AP
     /*try {tmpHP = monsters[sprite.id].HP; tmpObj.HP = tmpHP} catch(err){}
     try {tmpAP = monsters[sprite.id].AP; tmpObj.AP = tmpAP} catch(err){}
     try {tmpCLASS = monsters[sprite.id].CLASS; tmpObj.CLASS = tmpCLASS} catch(err){}*/
     
     /*
     track.push(tmpObj)
    }
    
    

      

     

      // send sprite to renderer (render.js)
      render(sprite,newrender,keys=0)
    } else {console.warn("Warning: >",gameBoard['x' + sprite.posx + "y" + sprite.posy],"already exists in that board location...")}
  } else {
    
    // this deals specifically with the cursor

    // place in track that helps track movement and stats
    let objT = track.find(objT => objT.id === sprite.id);
    if (objT == undefined)
    {
    tmpObj.id = sprite.id
    tmpObj.x = sprite.posx
    tmpObj.y = sprite.posy
    // if applicaable find monster HP/AP
    try {tmpHP = monsters[sprite.id].HP; tmpObj.HP = tmpHP} catch(err){}
    try {tmpAP = monsters[sprite.id].AP; tmpObj.AP = tmpAP} catch(err){}
    try {
   
    if (monsters[sprite.id].id !== undefined) { tmpObj.CLASS = "Monster"}
  } catch(err){}
    track.push(tmpObj)
    }
   
    

    render(sprite,newrender,keys)
  }*/
  

function beastStats(beasts){
  console.log(beasts)

}



// https://freesound.org/people/pumodi/sounds/150222/
// menuselect

function playSound(path,vol=1,loopMode=false)
{
    var audio = new Audio(path);
    audio.volume = vol;
    if (global.audioOverride == 1) audio.volume = 0;
    audio.loop= loopMode;
    audio.playbackRate=1
    audio.play();
   /* let music = new audio({
      loop: true,
      volume: 1,
      src: ['/yourSounds/music.mp3']
  })*/
}

function mainProg(){


  var cursor = new Sprite("cursor",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"cursor.png","down",0,11,0,0,"cursor","Cursor")
  generateSprite(cursor,0)
 
  
 
  var playerOne = new Sprite("mage",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage.png","right",1,0,0,1,"player","Player")
  generateSprite(playerOne,1)

  var playerTwo = new Sprite("mage2",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"mage2.png","left",0,gridsWidth-1,gridsHeight-1,1,"player","Player")
  generateSprite(playerTwo,1)

  var vampire = new Sprite("vampire",64,128,64,64,"vampire.png","down",0,6,3,1,"monster")
  generateSprite(vampire,1)
 

  var goblin = new Sprite("goblin",64,128,64,64,"goblin.png","down",0,4,2,1,"monster")
 generateSprite(goblin,1)


 //update gameboard
 updateFakeTrack()

 // drawText("GAME Loaded")

 


 
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

 //lines
 
 var helperElement = document.getElementById('helper').style;
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

    }
 
 
 

// helper(track[1],"why no worky")


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

// set no of players/icons on screen
iconSprite = '<img class="wiz" src="sprites/goldendragon.png">'

let menuPlayers = (playerscount) => {
  $("#iconWiz").html("")
  playerscount ++
  for (let i = 0; i < playerscount-1; i++) {
    $("#iconWiz").append(iconSprite)
  }
  global.noOfPlayers = playerscount
}

playerscount = global.noOfPlayers
menuPlayers(playerscount)

$("#menuWizards").click(function(){
  playersCount = $("#theWizards").text()
  playersCount < 4 ? playersCount ++ : playersCount=2
  $("#theWizards").text(playersCount)
  menuPlayers(playersCount)
  $(".wiz").css("transform", "scale(" + scaleValue + ")")
})

// Menu Begin
$("#initProgram").click(function(event){
  event.preventDefault
  $("#firstScreen").addClass("homefadeOut")
  $(".homefadeOut").one("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function(){
   $("#firstScreen").hide()
   $("#mainPortal").show()
   playSound("audio/blob.mp3",0.4,true)
   mainProg()
     });
  
})

// bypass Menu
// $("#initProgram").click()

fakeTrack = []

function updateFakeTrack()
{
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


$(document).ready(function(){
$("body").mousemove(function(e){
 
 

  pX = Math.floor(e.pageX * scaleValue) - scaledMargin
  pY = Math.floor(e.pageY * scaleValue) - scaledMargin
  // e.pageX - global.margin.value
  //take into accound margin and scale
      pagePos = {'x': pX,'y': pY}
      gridX = Math.floor(pX/global.spriteSize.width)
      gridY = Math.floor(pY/global.spriteSize.height)
      //  var clientCoords = "( " + e.clientX + ", " + e.clientY + " )";
      subText = "pagePos: " + pagePos.x + " (" + gridX + "), "
      subText += pagePos.y + " (" + gridY + ") - "

      if (gridX > -1 && gridY > -1){
         $("#mouse span:first").text(subText)
      }
     
      result = fakeTrack.find( ({mousePos}) => mousePos === gridX + "," + gridY  )
      if (result !== undefined){ $("#mouse span:last").text(result.id)}else{$("#mouse span:last").text("")}
     // console.log(result)
     
        //  $("#mouse span:last").text("( e.clientX, e.clientY ) - " + clientCoords);
 });
})
