var aiGlobal = 0
function ai(){



/*if (currentlySelectedCharacterIndex == global.noOfPlayers){
    currentlySelectedCharacterIndex = 1
} else {currentlySelectedCharacterIndex++}*/


handleInput("remove","handleMoves")
console.log("ai: currentlySelectedCharacterIndex: ",currentlySelectedCharacterIndex)

// ai logic (not really ai but oh well)

// how far away is an enemy?


// step 1 move or cast spell?
aiStep1 = ["3","2"]
aiStep1MovementAxis = [0,1]
Step1 = _.sample(aiStep1);
Step1Axis = _.sample(aiStep1MovementAxis)

// override for testing
Step1 = "2"



if (Step1 == "2")  // cast spell
{
    console.log("%c AI =" + "%c Casting Spell", "background: red","background: red;color:white")
   // handleInput("add","handlelock")
    
    mouseClickMenu = "2"
    $(".playArea").click()

  //  handleInput("remove","handlelock")
    

    // always summon monsters first
    summonSpell = _.sample(track[currentlySelectedCharacterIndex].monsterKey)

    // override for testing
  summonSpell = {playerID: "mage2", key: 3, id: "vampire", realid: "Vampire"}

    // if there is a summon available then cast it
    if (summonSpell !== undefined){
        mousePos = track[currentlySelectedCharacterIndex].mousePos.split(',')
        mousePos[0] --
    
       //  track[currentlySelectedCharacterIndex].mousePos = mousePos[0] + "," + mousePos[1]
        console.log(mousePos[0] + "," + mousePos[1])
        console.log("%c AI = Summoning " + summonSpell.id, "background: red")

        rNum = (Math.random() * (10000000 - 10 + 1) ) << 0;
        
        sleep(1500).then(() => {

            if (aiGlobal==0){
     eval('var ' + summonSpell.id + rNum + ' = new Sprite("' + summonSpell.id + rNum + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + summonSpell.id + rNum + '","left",0,gridsWidth-4,gridsHeight-2,1,"monster","' + summonSpell.id + rNum + '","' + summonSpell.id + '")')
 
     eval('generateSprite(' + summonSpell.id + rNum +',1,' + rNum + ')')
     aiGlobal=1
            }

   //     eval('var ' + summonSpell.id + '2 = ' + 'new Sprite("' + summonSpell.id + '2",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + summonSpell.id + '2","down",0,'+ mousePos[0] +','+ mousePos[1] +',1,"monster",monsters["' + summonSpell.id + '"].Type)',summonSpell.id,"vampire")
     //   console.log("vampire2:" + vampire2)
      
            console.log("generating ", summonSpell.id)
         // update gameboard
         updateFakeTrack()
      // generateSprite(vampire2)
         
         console.log("ai current selected index:",currentlySelectedCharacterIndex)
      
         newTurn()
        })
    }

    // no summon spells exist :( 
    // within range of enemy?
    if (summonSpell == undefined){
        console.log("%c AI = Casting Range Attack " + " null ", "background: red","background: red;color:white")
        // document.addEventListener('keydown', handleSpells)
       // document.addEventListener('click', handleSpells)
    }

    
}

if (Step1 == "3")  // move
{
    console.log("%c AI ="+"%c Character Movement", "background: red","background: red;color:white")
   handleInput("add","handlelock")
    
    mouseClickMenu = "2"
    $(".playArea").click()
    handleInput("remove","handlelock")

    mp = track[currentlySelectedCharacterIndex].mousePos.split(",")

    // move what direction
    mp[Step1Axis] --
    sleep(1500).then(() => {
        track[currentlySelectedCharacterIndex].x = mp[0] * global.spriteSize.width
        track[currentlySelectedCharacterIndex].y = mp[1] * global.spriteSize.height
        track[currentlySelectedCharacterIndex].mousePos = mp[0] + "," + mp[1]
        newTurn()
    })

    
   
    
}

if (Step1=="4") newTurn()
// move which direction?

// spell - summon preference


}