// const { isAbsolute } = require("path/posix");

var gTimer = 1;



var bw = 1260;
var bh = 800;

    var p = 10;
    var cw = bw + (p*2) + 1;
    var ch = bh + (p*2) + 1;

 
function explodeCircle(){
/*  var circle = document.getElementById('circle').style
     circle.position= "absolute"
      circle.zIndex="900"
     circle.left = "300px"
      circle.top = "300px"
      circle.transition = '0.8s';
      circle.transform = 'scale(2)';*/
      // helperElement.opacity = 1 
      
    //  sleep(4000).then(() => { 
     //     helperElement.transition = '1s';
      //    helperElement.opacity = 0
     // });

}


    function drawBoard(){
        for (var x =-11; x <= bw; x += global.spriteSize.width) {
            catx.moveTo(0.5 + x + p, p);
            catx.lineTo(0.5 + x + p, bh + p);
        }

        for (var o =-11; x <= bh; o += global.spriteSize.width) {
            catx.moveTo(p, 0.5 + o + p);
            catx.lineTo(bw + p, 0.5 + o + p);
        }

        catx.strokeStyle = "gray";
        catx.stroke();
    }

   // drawBoard();
                                            


var current_frame = 0

function renderCSS(sprite)
{
 // let promise = new Promise(function(resolve, reject) {
    let lx = sprite.posx
    let ly = sprite.posy

    tempCSS = document.getElementById(sprite.id)
    var cssImage = document.createElement("img")
    cssImage.id = "tempMonster"
    cssImage.setAttribute('src', "sprites/" + sprite.id + "LARGE.png")
    document.body.appendChild(cssImage)
    cssImage.style.position = "absolute"
    cssImage.style.left = lx - (global.spriteSize.width/2) + "px"
    cssImage.style.top = ly - (global.spriteSize.width/2) + "px"
    $("#tempMonster").addClass("sizeIn");

    
  
 //})

//  promise.then(alert)

}



const render = (sprite,newrender,keys=0) => {


    // up to render to keep track of all the sprites
    let objS = sprites.find(objS => objS.id === sprite.id);
    if (objS === undefined)
    {
     let tmpObj = {};
     tmpObj.id = sprite.id
     tmpObj.thesprite = sprite
     tmpObj.newrender = newrender
     sprites.push(tmpObj)
    }

  

    
    

    if (newrender !== 1) processMovement(sprite,keys)
    
    for(var i = timers.length; i--;)
    clearInterval(timers[i]);

    // spot to sweep in legendary monsters?
    if (sprite.monsterType == "Legend")
    {
     //  gTimer = 0
     // console.log("legend detected")
      // renderCSS(sprite)
      // document.querySelector('.sizeIn').addEventListener('animationend', () => {gTimer = 1})
    }

    

    
var mainSequence = setInterval(function(){
       if (gTimer == 1)
       {     
            ctx.clearRect(0, 0, canvas.width, canvas.height);
         
            // console.warn(sprites)
            // render every sprite, as we have to on each frame!!
            sprites.forEach(function (tsprite) {
                 let obj = track.find(obj => obj.id === tsprite.id);
                 
                            
          //  console.log(tsprite.thesprite.img,animations[tsprite.id][tsprite.thesprite.current_state][current_frame].x * tsprite.thesprite.frameWidth,animations[tsprite.id][tsprite.thesprite.current_state][current_frame].y * tsprite.thesprite.frameHeight,tsprite.thesprite.frameHeight,tsprite.thesprite.frameWidth,obj.x,obj.y,tsprite.thesprite.frameWidth,tsprite.thesprite.frameHeight)

              //  ctx.drawImage(sprite.img,animations[sprite.id][sprite.current_state][current_frame].x * sprite.frameWidth,animations[sprite.id][sprite.current_state][current_frame].y * sprite.frameHeight,sprite.frameHeight,sprite.frameWidth,obj.x,obj.y,sprite.frameWidth,sprite.frameHeight)
              ``
            
              
              if (obj.dead  !== "yes")     // if creature is not dead, then render
              {
              ctx.drawImage(tsprite.thesprite.img,animations[tsprite.id][tsprite.thesprite.current_state][current_frame].x * tsprite.thesprite.frameWidth,animations[tsprite.id][tsprite.thesprite.current_state][current_frame].y * tsprite.thesprite.frameHeight,tsprite.thesprite.frameHeight,tsprite.thesprite.frameWidth,obj.x,obj.y,tsprite.thesprite.frameWidth,tsprite.thesprite.frameHeight)
              }
            });
        

           
            
            
            let localMaxFrame = (animations[sprite.id].left.length)-1
            current_frame += 1;
            if (current_frame > localMaxFrame) {current_frame = 0}
          }   
            
 }, 1000/10); 
 //}, 500);     
}

// particle generator
function generateParticle(particlePosX,particlePosY,trackPos=-1,targetIndex=-1,spellType="") { 
  // Loop to generate 30 particles at once

  // you can generate particles in relation to another character
  // that is stored in track - or just by global coordinates
   localObj = track[trackPos]

 

  // if you are using trackPos - then direction specified the direction in which to render
  // will use track[...].Facing Left or Right

  // augment particlePosX and particlePosY by scaleRatio
  particlePosX = particlePosX * scaleValue
  particlePosY = particlePosY * scaleValue

  console.log("%c " + track[trackPos].y + "_" +        particlePosY,"background-color: black;color:yellow")

  if (particlePosX==-1 && particlePosY==-1) // if no origin point then use characters Origin point
  {
      // find players origin square top/left point
      originX = track[currentlySelectedCharacterIndex].x // current players left pos x
      originY = track[currentlySelectedCharacterIndex].y // current players top pos x
      originX += track[currentlySelectedCharacterIndex].Origin.x + global.margin.value
      originY += track[currentlySelectedCharacterIndex].Origin.y + global.margin.value
      particlePosX = originX
      particlePosY = originY
      console.log("originx: " + originX)
      console.log("originY:" + originY)

  }

  // if this is a targetted path spell then tarx and tary come into play
  if (targetIndex > -1)
  {
      tarx = track[targetIndex].x -  track[targetIndex].DP[0] 
      tary = track[targetIndex].y -  track[targetIndex].DP[1] 
      console.log("%c tarx-tary: " + tarx + " - " + tary, "color:red")
  } else {tarx=-1; tary=-1}

  // if this is an impact spell that the origin point will be target
  if (spellType=="impact")
  {
    particlePosX = track[targetIndex].x -  track[targetIndex].DP[0] 
    particlePosY = track[targetIndex].y -  track[targetIndex].DP[1] 
    tarx = track[targetIndex].x -  track[targetIndex].DP[0] 
    tary = track[targetIndex].y -  track[targetIndex].DP[1] 
  }

  // play spells sound effect if applicable
  if (spellType!=="impact"){
  if (spells[spellType].sound !== undefined)
  {
    playSound(spells[spellType].sound,spells[spellType].vol)
  }
}
  // augment based on direction * scaleValue and dont forget about the screen margin too!
  /*if (trackPos > -1) {
      track[trackPos].Facing == "Left" ? particlePosX = track[trackPos].x - particlePosX : particlePosX = track[trackPos].x + particlePosX
      particlePosY = track[trackPos].y - particlePosY
      particlePosX = particlePosX + global.margin.value
      particlePosY = particlePosY + global.margin.value
      console.log("%c generateParticle: " + particlePosX + " - " + particlePosY, "color:red")
  }*/


  spellType=="impact" ? p=4 : p=30 // for impact type effect - loop count
  for (let i = 0; i < p; i++) {
    createParticle(particlePosX, particlePosY,tarx,tary,spellType);
  }
}

function createParticle(x, y, tarx=-1, tary=-1,spellType,) {
  // Create a custom particle element
  const particle = document.createElement('particle');
  // Append the element into the body
  document.body.appendChild(particle);
  const size = Math.floor(Math.random() * 20 + 5);
  // Apply the size on each particle
  console.log('spell ',spellType)
  if (spellType=='impact'){
  particle.style.width = '7px';
   particle.style.height = '7px';
   particle.style.background = "red" 
  } else {
  particle.style.width = "3px";
  particle.style.height = "3px";
  particle.style.background = "white" 
  }
//    particle.style.width = `${size}px`;
//         particle.style.height = `${size}px`;
  // Generate a random color in a blue/purple palette
  // particle.style.background = `hsl(${Math.random() * 90 + 180}, 70%, 60%)`;
   
  // Generate a random x & y destination within a distance of 75px from the mouse

  // console.log("%c tarx-tary: " + tarx + " - " + tary, "color:blue")
if (tarx > -1 && tary > -1){
  destinationX = x + tarx
  destinationY = y + tary
} else {
destinationX = x + (Math.random() - 0.5) * 2 * 75;
destinationY = y + (Math.random() - 0.5) * 2 * 75;
}

if (spellType=="impact"){
  destinationX = tarx
  destinationY = tary
}



// console.log("%c destinationXY: " + destinationX + " - " + destinationY, "color:blue")

spellType=="magicbolt" ? delayAmt=200 : delayAmt=Math.random() * 1200

// Store the animation in a variable because we will need it later
const animation = particle.animate([
  {
    // Set the origin position of the particle
    // We offset the particle with half its size to center it around the mouse
    transform: `translate(${x - (size / 2)}px, ${y - (size / 2)}px)`,
    opacity: 1
  },
  {
    // We define the final coordinates as the second keyframe
    transform: `translate(${destinationX}px, ${destinationY}px)`,
    opacity: 0
  }
], {
  // Set a random duration from 500 to 1500ms
  // duration: 500 + Math.random() * 1000,
  duration: 3000,
  easing: 'cubic-bezier(0, .9, .57, 1)',
  // Delay every particle with a random value from 0ms to 200ms
    delay: delayAmt
 
});
animation.onfinish = () => {
  particle.remove();
};
}




// const initialSprite = new Sprite("cursor",64,128,64,64,"cursor.png","down",0,0,0)

/*const gameBoard = [
    {pos:"x0y0",contents:"nothing"},
    {pos:"x0y1",contents:"nothing"}
  ];
  let result = gameBoard.find( ({ pos }) => pos === 'x0y1' );
  */
// ctx.drawImage(iconimage, iconanimations[iconcurrent_state][iconcurrent_frame].x * iconframeWidth, iconanimations[iconcurrent_state][iconcurrent_frame].y * iconframeHeight, iconframeWidth, iconframeHeight, iconhero.position.x, iconhero.position.y, iconframeWidth, iconframeHeight);


// ctx.drawImage(sprite.img,animations.cursor.down[1].x * sprite.frameWidth,animations.cursor.down[1].y * sprite.frameHeight,sprite.frameHeight,sprite.frameWidth,sprite.posx,sprite.posy,sprite.frameWidth,sprite.frameHeight)


 // ctx.beginPath();
// ctx.rect(20, 20, 150, 100);
// ctx.stroke();

 // mage
 // ctx.drawImage(image, animations[current_state][current_frame].x * frameWidth, animations[current_state][current_frame].y * frameHeight, frameWidth, frameHeight, hero.position.x, hero.position.y, frameWidth, frameHeight);
 
 // vampire
 // ctx.drawImage(cimage, hero.position.x-64, hero.position.y)
 
 // selector
 // ctx.drawImage(iconimage, iconanimations[iconcurrent_state][iconcurrent_frame].x * iconframeWidth, iconanimations[iconcurrent_state][iconcurrent_frame].y * iconframeHeight, iconframeWidth, iconframeHeight, iconhero.position.x, iconhero.position.y, iconframeWidth, iconframeHeight);

 /*(iconcurrent_frame += 1;
 if (iconcurrent_frame > 1) {
    iconcurrent_frame = 0;
 }
*/

/*var cframeWidth;
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

class Sprite {
    constructor (name,width,height,frameWidth,frameHeight,src,current_state,current_frame,x,y)
    {
       this.name = name;
       this.current_state = current_state;
       this.current_frame = current_frame;
       this.image = new Image();
       this.image.onload = function() {
        this.imageWidth = width;
        this.imageHeight = height;
        this.frameWidth = frameWidth;
        this.frameHeight = image.height / 2;
       };
       this.image.src = src;
       this.final = {
         position:{x:x,y:y}
       }
       }
    }
    */

   
// global animations
/*const animations = 
{
 "cursor":
 {
   "left":[{x: 0, y: 0}, {x: 0, y: 1}],
   "right": [{x: 0, y: 0}, {x: 0, y: 1}],
   "down": [{x: 0, y: 0}, {x: 0, y: 1}],
   "up": [{x: 0, y: 0}, {x: 0, y: 1}]
 }
}
class Sprite {
    constructor (ID,width,height,frameWidth,frameHeight,src,current_state,current_frame,posx,posy)
    {
       this.img = document.getElementById(ID);
       this.current_state = current_state;
       this.current_frame = current_frame;
       this.imageWidth = width;
       this.imageHeight = height;
       this.frameWidth = frameWidth;
       this.frameHeight = frameHeight;
       this.posx = posx;
       this.posy = posy
     }
  }
  const initialSprite = new Sprite("cursor",64,128,64,64,"cursor.png","down",0,64,64)

  
Parameter	Required	Description
img	*	Specifies the image, canvas, or video element to use
sx		The x coordinate where to start clipping
sy		The y coordinate where to start clipping
swidth		The width of the clipped image
sheight		The height of the clipped image
x	*	The x coordinate where to place the image on the canvas
y	*	The y coordinate where to place the image on the canvas
width		The width of the image to use (stretch or reduce the image)
height		The height of the image to use (stretch or reduce the image)

https://webplatform.github.io/docs/concepts/programming/drawing_images_onto_canvas/
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  */