function ai(player){

console.group("AI")
document.removeEventListener('keydown', handleMoves)
document.removeEventListener('click', handleMoves)

// player = the new currentlyselectedindex
currentlySelectedCharacterIndex = player

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
    document.addEventListener('keydown', handlelock)
    document.addEventListener('click', handlelock)
    mouseClickMenu = "2"
    $(".playArea").click()

    document.removeEventListener('keydown', handlelock)
    document.removeEventListener('click', handlelock)
    

    // always summon monsters first
    summonSpell = _.sample(track[currentlySelectedCharacterIndex].monsterKey)

    // override for testing
    summonSpell = {playerID: "mage2", key: 3, id: "vampire", realid: "Vampire"}

    // if there is a summon available then cast it
    if (summonSpell !== undefined){
        mousePos = track[currentlySelectedCharacterIndex].mousePos.split(',')
        mousePos[0] --
    
        track[currentlySelectedCharacterIndex].mousePos = mousePos[0] + "," + mousePos[1]
        console.log(mousePos[0] + "," + mousePos[1])
        console.log("%c AI = Summoning " + summonSpell.id, "background: red")
        eval('var ' + summonSpell.id + ' = ' + 'new Sprite("' + summonSpell.id + '",global.spriteSize.width,128,global.spriteSize.width,global.spriteSize.width,"' + summonSpell.id + '","down",0,'+ mousePos[0] +','+ mousePos[1] +',1,"monster",monsters["' + summonSpell.id + '"].Type)')
        sleep(1500).then(() => {
         eval('generateSprite(' + summonSpell.id + ',1)')
         endTurn()
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
    document.addEventListener('keydown', handlelock)
    document.addEventListener('click', handlelock)
    mouseClickMenu = "3"
    $(".playArea").click()

    mp = track[currentlySelectedCharacterIndex].mousePos.split(",")

    // move what direction
    mp[Step1Axis] --
    sleep(1500).then(() => {
        track[currentlySelectedCharacterIndex].x = mp[0] * global.spriteSize.width
        track[currentlySelectedCharacterIndex].y = mp[1] * global.spriteSize.height
        track[currentlySelectedCharacterIndex].mousePos = mp[0] + "," + mp[1]
    })
    
}



// move which direction?

// spell - summon preference

console.groupEnd
}