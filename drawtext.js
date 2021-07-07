


function drawText(textTodisplay="",context="canvas2",x=0,y=10,size="14px Arial",clear=1,color="white",bold="",delay=0){
  var ctxT = document.getElementById(context).getContext('2d');

    if (textTodisplay=="clear"){   
        ctxT.clearRect(0, 0, canvas.width, canvas.height) 
        return false
    }

    if (clear==1){   
        ctxT.clearRect(0, 0, canvas.width, canvas.height) 
    }

    ctxT.fillStyle = color
     bold !=="" ? ctxT.font = "bold " + size : ctxT.font = size;
  //  ctxT.font = "30px Arial"
    ctxT.font         = '26px Zelda';

    function rText(){
      ctxT.fillText(textTodisplay, x, y)
    }
    setTimeout(rText(),delay)
    
}



function distance(px,py,qx,qy)
{ var dx   = px - qx;         
  var dy   = py - qy;         
  var dist = Math.sqrt( dx*dx + dy*dy ); 
  return dist;
}

function pixel(x,y,tarx, tary){
  
    console.group("Pixel - Spell Path Math Needed");

    // x,y is location of player [OLD - currently dont use this]
    // tarx, tary is the location of the cursor
    console.log("playe rx",x,"playery",y,"cursorx",tarx,"cursory",tary)

    // how far is the spell going?  
    let distanceToTarget = distance(x,y,tarx, tary)
    let max = spells[spell].range*global.spriteSize.width
    if (distanceToTarget > max)
    {
        console.warn("WARNING: SPELL EXCEEDS RANGE")
        return false;
    } else {
    playSound("audio/bolt.wav")
    }
    console.log("distancetotarget",distanceToTarget)
  
    // OLD CODE
    // initially was looking at using angles for spell direction
    // 0   = right    // 90  = down    // -90 = up
    // var targetAngle = Math.atan2(tary - y, tarx - x) * (180 / Math.PI);
    // console.log("targetAngle:" + targetAngle)
  
    // multi thread sleep for animation effect
    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    // visual smoothness and accuracy of spell track/path
    let maxFireFrame = 17

    // tary the targets y coordinates
    // stepsneededY - inverted position of players wand
    // the stepsneeded variables hold the angle of attack towards the target
    // then I build an array, listx, which holds what the path will be
    // tary > y ?  stepsNeededY = -Math.abs((y - tary) / maxFireFrame) : stepsNeededY = Math.abs((y - tary) / maxFireFrame); [OLD]
    tarx = (tarx * global.spriteSize.width) + global.margin.value
    tary = (tary * global.spriteSize.height) + global.margin.value
  
    console.log("tary before manipulation: ", tary)
    // stepsNeededY = (tary - track[currentlySelectedCharacterIndex].y) / maxFireFrame
    tary > track[currentlySelectedCharacterIndex].y ?  stepsNeededY = -Math.abs((track[currentlySelectedCharacterIndex].y - tary) / maxFireFrame) : stepsNeededY = Math.abs((track[tcurrentlySelectedCharacterIndex].y - tary) / maxFireFrame);
   
    stepsNeededX = (tarx - track[currentlySelectedCharacterIndex].x) / maxFireFrame
    

    console.log("tarx:" + tarx)  // [real coordinates]
    console.log("tary:" + tary) // [real coordinates]
    console.log("track[turn].x",track[currentlySelectedCharacterIndex].x) // the current players X
    console.log("track[turn].y",track[currentlySelectedCharacterIndex].y) // the current players y
    console.log("stepsNeededX:" + stepsNeededX) // angle for spell track x
    console.log("stepsNeededY:" + stepsNeededY) // angle for spell track y

    // build the path of the complete spell track
    var listx = [];
    var listy = [];
    mOb = {x:0,y:0}

    // turn is the matching player object in track
    // x is slightly modified to account for the position of the players wand
    // which is the top right (or left) corner
    // [CHANGE] this will have to adapt depending on character facing direction
    mOb.x = track[currentlySelectedCharacterIndex].x + global.spriteSize.width + global.margin.value // starting position of spell (current player) [real coordinates]
    mOb.y = track[currentlySelectedCharacterIndex].y + global.spriteSize.width + global.margin.value // starting position of spell (current player) [real coordinates]
  listx.push(mOb)
  
   
    for(var i=1; i<maxFireFrame; i++)
    {
      mOb = {x:0,y:0}
      // mOb.x = listx[i-1].x + stepsNeededX [old]
      mOb.x = listx[i-1].x + stepsNeededX

      // if target is below player then subtrack stepsNeededY
      // if target is above player then add stepsNeededY
      tary > track[currentlySelectedCharacterIndex].y ? mOb.y = listx[i-1].y - stepsNeededY : mOb.y = listx[i-1].y + stepsNeededY
      listx.push(mOb)
    }

    let boo = 0
    let nn=0
    let cheeky = 0
    console.log("listx: " ,listx) // the path the spell takes
    console.groupEnd();

    const renderSpell = async () => {
      
      console.group("Pixel - renderSpell - Draw and detect impact")
      // sweep through listx and draw
      for (const item of listx) {
       
        

        await sleep(18)
        nn++ // the current step through listx

        // this is the spell visual effect --------------------------------------------
        // ct.clearRect(0, 0, canvas.width, canvas.height);
        ct.globalAlpha = 1;
        ct.filter = 'blur(2px)';
        ct.color = 'white';
        ct.fillRect(item.x+cheeky,item.y, spells[spell].recx, spells[spell].recy);
        ct.filter = 'blur(0px)';
       

         // this is the target area for error detection --------------------------------
         ct.globalAlpha = 1;
         ct.rect(mX.a*global.spriteSize.width, mY.b*global.spriteSize.width, global.spriteSize.width, global.spriteSize.width);
         ct.fill();

         // console.log("itemx",item.x)
         // console.log("itemy",item.y) // log spell track
         // calculate if and object is in the spells path
         if( ct.isPointInPath(item.x, item.y)) {
          ct.clearRect(0, 0, canvas.width, canvas.height) 
          cheeky = 4000 // moves the animation off screen so user cant see it
          boo = 1 // hit confirmed
         }
         ct.globalAlpha = 1
         

          if (nn == listx.length) { // end of animation
           ct.clearRect(0, 0, canvas.width, canvas.height)
          
            if(boo==1){  // crossed through collision detection
            console.log("Hit is good boo is 1 so proceed with hit code")

            // get target identity using cursor location
            // tmpName = gameBoard["x" + mX.a + "y" + mY.b] // [OLD] this is the sprite that you are hitting
            
            // get target via track, track holds mouse position of target [FAKE coordinates]
            let targetObject = findO(track,"mousePos","full",theCursor.x + "," + theCursor.y)
            console.log("targetObject",targetObject)

            // css effect render
            console.log("targetObject.id:",targetObject.id)
            tempImage = document.getElementById(targetObject.id)
            var newImage = document.createElement("img")
            newImage.id = "tempMonster"
            newImage.setAttribute('src', "sprites/" + targetObject.id + ".png")
            document.body.appendChild(newImage)
           
            newImage.style.position = "absolute"

            // adding sprite size dimensions
            // I think scale value is messing things up

       
           //  The new image is clipped but its too small if the game is 'scaled'
            // newImage.style.clip = "rect(0,64px,64px,0)"

            // size?
            // to adjust size, we have to take the whole image and scale
            newImage.style.width = parseInt($("#tempMonster").css("width")) * scaleValue
            newImage.style.height = parseInt($("#tempMonster").css("height")) * scaleValue
            // newImage.style.height = global.spriteSize.height * scaleValue
            
            // clip needs to scaled now
            newImage.style.clip = "rect(0,"+ global.spriteSize.width*scaleValue + "px," + global.spriteSize.height*scaleValue + "px,0)"
            
           // positioning
           // takes into account screen res scaling and the margin of the screen
           // even the margin has to be scaled up
            newImage.style.left = (targetObject.x * scaleValue) + (global.margin.value * scaleValue) + "px"
            newImage.style.top = (targetObject.y * scaleValue)  + (global.margin.value * scaleValue) + "px"
          
            // $("#tempMonster").addClass("clip")
            $("#tempMonster").css("zIndex","109")
            
            var $target = $("#tempMonster");
 
            
         function explodeImage() {
            $target.explodeRestore();
            setTimeout(function () {
                $target.explode({
                    maxWidth: 15,  minWidth: 5, radius: 231, release: false, recycle: false,
                    explodeTime: 320, canvas: true,   round: false, maxAngle: 360,
                    gravity: 10, groundDistance: 900,
                });
            }, 300)
        }
        explodeImage();

         //  results = battle(tmpName,"magicbolt","track","spells")
            playSound("audio/hit.mp3")
        

          } 
     } 
    } // for loop through listx
    console.groupEnd()
   
   
 }

    // render the actual spell depending on the math calculated
    // earlier. This is async so that the animation does not interfere
    // with the general game animation
    renderSpell()



} // function pixel
 
  
