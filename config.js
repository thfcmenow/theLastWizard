// useful tools
// capture key code display                 : https://keycode.info/
// loop through array                       : https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
// use variable as object name              : https://stackoverflow.com/questions/6084858/javascript-use-variable-as-object-name
// different console.log colors/features    : https://stackoverflow.com/questions/7505623/colors-in-javascript-console
// https://freefrontend.com/css-text-animations/
// https://codepen.io/Evolution/pen/auLlw
// https://codepen.io/origine/pen/qaKkPE
// https://www.minimamente.com/project/magic/
// https://codepen.io/codeatonic/pen/dyPmzmP
// https://codepen.io/haidang/pen/oEEaax // bolt
// https://codepen.io/jkantner/pen/gKRKKb // fire
// https://stackoverflow.com/questions/57725/how-can-i-display-just-a-portion-of-an-image-in-html-css css:clip
// https://www.jquery-az.com/jquery-explode-burst-image-plug-in-2-demos/  explosion effect

// debug options --
var debug = {
 "cursor"             : {"displayPos":1},                // display cursor position in log
 "toggleConsole"      :                                  // display defined variables either by keycode or calling displayConsole()
  {
    "display":1,                                         // enable this feature  
    "charCode":192,                                      // use backquote `
    "variables":                                         // variables to display
      [
        "playerSpellBooks","track","theCursor","monsterKey"
      ]
  },
 "maxPlayerRange"     : "1",
 "fancyBattlefield"   : {"display":0},                   // zoom in battlefield or no
 "testMouse"          : {"test":1}                       // test mouse click positions
}

// keeps tracking what sprite is moving (direction) at what time
var globalMove = "";

//track the event listeners
var listenArray = [];

// create proxy for listen array
  // a proxy for our array
  var listen = new Proxy(listenArray, {
    apply: function(target, thisArg, argumentsList) {
      return thisArg[target].apply(this, argumentList);
    },
    deleteProperty: function(target, property) {
      console.log("Deleted %s", property);
      return true;
    },
    set: function(target, property, value, receiver) {      
      target[property] = value;
      // console.log("Set %s to %o", property, value);
      console.warn(listenArray)
      return true;
    }
  });

// turn matches the array position of the players sprite
// so if it is turn 1 that means it is track[1]s turn to play
// track[1] will be player 1 and so on
// this will have to be dynamically adjusted for how many players are
// playing. 2 for now.
var turn = 1;


// fixed globals
var global = {
// "boundary": {"width": 1280,"height":768},
"boundary": {"width": 1280,"height":704}, // bounday size currnelty has no impact
"spriteSize" : {"width":64,"height":64},  // must be divisible by the boundary
"noOfSpells": {"max":7}, // no of spells for each wizard (could be lower)
"margin":{"value":32}, // global borders
"noOfPlayers": 2, // default no of players (2-4)
"insults": 6000, // how often should insults be generated
"audioOverride":0 // if set to 1 will disable all audio
}  

// global.boundary.width = window.innerWidth;
// global.boundary.height = window.innerHeight

let scaleValue = (window.devicePixelRatio)
if (scaleValue >2.9) scaleValue=2
adjustValue = 0
if(scaleValue < 1.01) {adjustValue = 50}
if(scaleValue > 1.01 && scaleValue < 1.51) {adjustValue = 25}
if(scaleValue > 1.9) {adjustValue = -50}
if(scaleValue > 2.0) {scaleValue = 2.5}
global.boundary.width =     (document.documentElement.clientWidth/scaleValue)-(global.margin.value*scaleValue)-adjustValue
global.boundary.height =    (document.documentElement.clientHeight/scaleValue)-(global.margin.value*scaleValue)-adjustValue

// global.boundary.width = window.innerWidth / scaleValue;
// 508
// if (global.boundary.width < 550) {global.margin.value = 5}
// global.spriteSize.width = global.spriteSize.width/scaleValue
// global.spriteSize.height = global.spriteSize.height/scaleValue

// assign canvas
var canvasBackground = document.getElementById("canvasBackground");
var canvas = document.getElementById("canvas");
var cats = document.getElementById('canvas2')
var canvasGrid = document.getElementById('canvasGrid');

// assign size for background (whole page)
canvasBackground.height = global["boundary"].height
canvasBackground.width = global["boundary"].width


// assign control
var ctx = canvas.getContext("2d");
var ct = document.getElementById('canvas2').getContext('2d');
var catx = document.getElementById('canvas2').getContext('2d'); 
var cde = canvasGrid.getContext('2d');

ctx.imageSmoothingEnabled = false

// set playArea to be one square in on each side width 1113
canvas.height = global.boundary.height
canvas.width =  global.boundary.width
canvasGrid.height = global.boundary.height
canvasGrid.width = global.boundary.width
cats.height = global.boundary.height
cats.width = global.boundary.width
catx.height = global.boundary.height
catx.width = global.boundary.width

// set margin
if (global.boundary.width < 550) {global.margin.value = 16;
  $('.canvas').css('margin-top',global.margin.value*scaleValue);
  $('.canvas').css('margin-left',80);
  // $('.canvas').css('margin-right',50);
  $('.canvas').css('margin-bottom',global.margin.value*scaleValue);
  $("#fakeRight").show()
} else {
$('.canvas').css('margin',global.margin.value*scaleValue);
}


// determine if blocks fit in playarea
var testMod=global.boundary.width-global.spriteSize.width, dec=global.spriteSize.width;
var testModulation = ((testMod/dec)).toString()
if ((testMod/dec%1==0)==false) {
  var pointer = testModulation.indexOf(".")
  var newBlockWidth = testModulation.substring(0,pointer)
  var res = ((newBlockWidth) * global.spriteSize.width)+global.spriteSize.height
  canvas.width =  res
  canvasGrid.width = res
  cats.width = res
}
testMod=global.boundary.height-global.spriteSize.height, dec=global.spriteSize.height;
testModulation = ((testMod/dec)).toString()
if ((testMod/dec%1==0)==false) {
  pointer = testModulation.indexOf(".")
  newBlockHeight = testModulation.substring(0,pointer)
  res = ((newBlockHeight) * global.spriteSize.height)+global.spriteSize.height
  canvas.height =  res
  canvasGrid.height = res
  cats.height = res
}

// determine how many blocks we now have on gameboard
var gridsHeight, gridsWidth = 0
gridsWidth = (canvas.width / global.spriteSize.width)
gridsHeight = (canvas.height/ global.spriteSize.height)


// set scale dependant on pixel density
$('.canvas').css('transform-origin','top left')
$('.canvas').css('transform','scale(' + scaleValue + ')');


// grid sprite size
const blocksX = global.boundary.width / global.spriteSize.width // 1280/64 = 20
const blocksY = global.boundary.height / global.spriteSize.height // 768/64 = 12

// fixed spell details 
const spells = {
"beam":{id: "laser",range:10,damage:1,recx:3,recy:3,type:"strike"},
"magicbolt":{
  id: "magicbolt",  sound: "audio/photorp2.wav", vol: 0.8, impact: "blood", range:6,  damage:10,  recx:5, recy:5,   type:"strike"},
"lightning":{id: "lightning",range:10,damage:20,recx:15,recy:5,type:"strike"},
"summon":{id: "summon",range:1,damage:0,recx:0,recy:0,type:"monster"},
"fire":{id: "fire",range:8,damage:0,recx:0,recy:0,type:"spellsummon"}
}

// tracks all active characters/beasts | {id: "placeholder", x:0, y:0}
var track = []
var track2 = []

// master track cursor - these have listeners on them for troubleshooting
mY = 0
mX = {
  aInternal: 0,  aListener: function(val) {},  set a(val) {    this.aInternal = val;    this.aListener(val);  },
  get a() {    return this.aInternal;  },  registerListener: function(listener) {    this.aListener = listener;  }
}

mY = {
  bInternal: 0,  bListener: function(val) {},  set b(val) {    this.bInternal = val;    this.bListener(val);  },
  get b() {    return this.bInternal;  },  registerListener: function(listener) {    this.bListener = listener;  }
}

var theCursor = []
mX.registerListener(function(val) {  theCursor.x = val; if (debug.cursor.displayPos === 1) console.log(theCursor)});
mY.registerListener(function(val) {  theCursor.y = val; if (debug.cursor.displayPos === 1) console.log(theCursor)});


const insults = [
  "Bow beneath me","You disgust me","I shall prevail",
  "I tire of you","Foolish mortal","Fish and Chips",
  "I welcome ideas for new insults &#10084; <i class='fas fa-mouse-pointer'></i> &#10084;","Frogs find you beautiful",
  "I am lonely","ZZZzzz", "Manatees are glorious",
  "I eat turnips for breakfast", "Boredom falls upon me","?! !?"
]

// const insults = ["I welcome ideas for new insults &#10084; <i class='fas fa-mouse-pointer'></i> &#10084;"]

// container for all active sprites on board | includes cursor (sprite class uses this array)
// id: "mage" | newrender: 1 | thesprite: Sprite | current_frame: 0 | current_state: "down" | frameHeight: 64 | frameWidth: 64
// id: "mage" | imageHeight: 128 | imageWidth: 64 | img: img#mage | posx: 0 | posy: 320 | trackMovement: 1
var sprites = []

// setup gameboard per blocksX and blocksY remember starts with 0 so 0-19 is a 20 width board etc
var gameBoard = {}  // default 20x12
for(i = 0; i < blocksX; i++){
    for(p = 0; p < blocksY; p++){
      gameBoard['x' + i + "y" + p] = "-";
    }
};

// global animations - currently have 6 spots per direction, even if you don't have 6 available
// don't know how to error check yet
const animations = 
{
 "cursor":
 {
   "left":  [{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1}],
   "right": [{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1}],
   "down":  [{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1}],
   "up":    [{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1},{x: 0, y: 0}, {x: 0, y: 1}]
 },
 "menu":
 {
   "left":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "right": [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "down":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "up":    [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}]
 },
 "goldendragon":
 {
   "left":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "right": [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "down":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "up":    [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}]
 },
 "vampire":
 {
   "left":  [{x: 0, y: 0}, {x: 1, y: 0},{x: 0, y: 1}, {x: 1, y: 1},{x: 0, y: 1}, {x: 1, y: 0}],
   "right": [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
   "down":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 1}, {x: 1, y: 1},{x: 0, y: 0}, {x: 0, y: 0}],
   "up":    [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}]
 },
 "goblin":
  {
     "left":  [{x: 0, y: 0}, {x: 1, y: 0},{x: 0, y: 1}, {x: 1, y: 1},{x: 0, y: 1}, {x: 1, y: 0}],
    "right": [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}],
     "down":  [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 1}, {x: 1, y: 1},{x: 0, y: 0}, {x: 0, y: 0}],
      "up":    [{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0},{x: 0, y: 0}, {x: 0, y: 0}]
   },
 "mage":
  {
   "left":  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
   "right":  [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
   "down":  [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
   "up":    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}]
   },
   "mage2":
  {
   "left":  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}],
   "right": [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}, {x: 3, y: 3}],
   "down":  [{x: 2, y: 0}, {x: 3, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 2}, {x: 3, y: 2}],
   "up":    [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}, {x: 0, y: 2}, {x: 1, y: 2}]
   },
   "cast":
   {
    "down":  [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}]
    }
}

// monster definitions
// defense point works from top left, to bottom right
const monsters = {
    "goblin":         {"lockID": "goblin",      "DP":[30,0],      "Type": "Regular", "HP":20,  "AP":9,   "Range":3,  a: "a",  id:"Goblin"},
    "vampire":        {"lockID": "vampire",     "DP":[30,0], "Type": "Undead",  "HP":10,  "AP":24,  "Range":4,  a: "a",  id:"Vampire"},
    "goldendragon":   {"lockID": "goldendragon","DP":0,      "Type": "Legend",  "HP":67,  "AP":44,  "Range":4,  a: "a",  id:"Golden Dragon"}
}

const monstersPending =
{
    "giant rat":    {"Type": "Regular", "HP": 10, "AP": 24,"Range":4,a: "a",id:"Giant Rat"},
    "Skeleton":     {"Type": "Undead","HP": 57,"AP":23,"Range":4,a:"a",id:"Skeleton"},
    "Zombie" :      {"Type": "Undead","HP": 67,"AP": 14},
    "King Cobra":   {"Type": "Regular","HP": 67,"AP": 11},
    "Dire Wolf":    {"Type": "Regular","HP": 37,"AP": 14},
    "Crocodile":    {"Type": "Regular","HP": 67,"AP": 44},
    "Faun":         {"Type": "Regular","HP": 67,"AP": 44},
    "Lion":         {"Type": "Regular","HP": 67,"AP": 44},
    "Elf":          {"Type": "Regular","HP": 67,"AP": 44},
    "Orc":          {"Type": "Regular","HP": 67,"AP": 44},
     "Bear":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
     },
     "Ogre":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Hydra":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Giant Rat":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
     },
    "Giant":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
     },
     "Horse":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Unicorn":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Centaur":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Pegasus":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Gryphon":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Manticore":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Bat":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Green Dragon":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
     },
     "Red Dragon":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Harpy":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Eagle":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Ghost":{
     "Type": "Undead",
     "HP": 67, 
     "AP": 44
    },
     "Spectre":{
     "Type": "Undead",
     "HP": 67,
     "AP": 44
    },
     "Wraith":{
     "Type": "Undead",
     "HP": 67,
     "AP": 44
     },
     "Blob":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
    },
     "Octopus":{
     "Type": "Regular",
     "HP": 67,
     "AP": 44
     }
    }
    

   