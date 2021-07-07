
function sweepTrack()
{
 // cycle through track and remove dead characters-
 // scan for monsters
 
 // find any characters whos health is below 0
 var theDead = []
 for (y = 0; y < track.length; y++){
   console.log(track[y])
 if (track[y].HP < 1)
   {
     // found a dead creature
     // first mark it off the screen
     track[y].x = -9000;

     // change the id to monster + |DEAD
     // renderer has a flag that detects 'DEAD'
     // and should no longer draw it
     track[y].dead = "yes"

    

   }

 }
 console.log("the dead: " + JSON.stringify(theDead) + "<")


}

function battle(defender,attacker,typeOfDefender,typeOfAttacker){
  console.log(defender,attacker,typeOfDefender,typeOfAttacker)
    // define alive state and prepare stats
    let DefAlive = true
    let AttAlive = true
    let strikeFromDefender = 0
    let strikeFromAttacker = 0
    let NewDefHP = 0
    let NewAttHP = 0
    let DefMaxHP = 0
    let DefMaxAP = 0
    let AttMaxHP = 0
    let AttMaxAP = 0

    let Defx = 0
    let Defy = 0
    let Attx = 0
    let Atty = 0
   
    // defender stats
    switch(typeOfDefender){
      case "spells":
        DefMaxHP = 0 // spells are one way
        DefMaxAP = spells[defender].damage;
        break;

      case "track":
        tempobj = track.find(tempobj => tempobj.id === defender);
        DefMaxHP = tempobj.HP
        DefMaxAP = tempobj.AP
        Defx = tempobj.x
        Defy = tempobj.y
        break;
      }
   
    // attacker stats
    switch(typeOfAttacker){
      case "spells":
        AttMaxHP = 0 // spells are one way
        AttMaxAP = spells[attacker].damage;
        break;

      case "track":
        tempobj = track.find(tempobj => tempobj.id === attacker);
        AttMaxHP = tempobj.HP
        AttMaxAP = tempobj.AP
        Attx = tempobj.x
        Atty = tempobj.y
        break;
      }
    

      
    // attacker strikes first
    // attack random number between 0 and AttMaxHP
    strikeFromAttacker = Math.floor(Math.random() * AttMaxAP);
    strikeFromAttacker == 0 ? strikeFromAttacker = 1 : ""
   
    // deduct strike from defender HP   
    NewDefHP = DefMaxHP - strikeFromAttacker
    // console.log("direwolf drops down to: " + NewDefHP + " due to strike of " + strikeFromAttacker)
   
    // defender still alive?
    NewDefHP < 1 ? DefAlive = false : ""
   
    // display stat next to hit character
    if (Defx > 0 && DefAlive)
    {
        drawText("HP= " + NewDefHP, "canvas2",Defx,Defy+82,size="10px Arial")
    }


  
    // defender retialates (if still alive)
    if (typeOfAttacker!=="spells") {  // cant retaliate against a spell cast
    if (DefAlive == true)
    {
     // attack random number between 0 and DefMaAP
     strikeFromDefender = Math.floor(Math.random() * DefMaxAP);
     strikeFromDefender == 0 ? strikeFromDefender = 1 : ""
   
     // deduct strike from attacker HP
     NewAttHP = AttMaxHP - strikeFromDefender
   
     // attacker still alive?
     NewAttHP < 1 ? AttAlive = false : ""
    }
  }
   
   
    // update running total  of monsters
    // defender stats
    switch(typeOfDefender){
      case "track":
        tempind = track.findIndex(tempobj => tempobj.id === defender);
        track[tempind].HP = track[tempind].HP - strikeFromAttacker
        break;
      }

      // update running total  of monsters
    // attacker stats
    switch(typeOfAttacker){
      case "track":
        tempind = track.findIndex(tempobj => tempobj.id === defender);
        track[tempind].HP = track[tempind].HP - strikeFromDefender
        break;
      }

      console.log(track)

      
    
    //sweepTrack - see if any HP are negative and eliminate if needed
    sweepTrack()
   
    // battle complete and return results
    var battleResult = [strikeFromDefender,strikeFromAttacker,NewDefHP,NewAttHP]
   
    return battleResult
   }
   
   /*results = battle("Dire Wolf","Goblin")
   
   console.log("Goblin attacks Dire Wolf !!")
   console.log("Dire Wolf HP: ",monsters["Dire Wolf"].HP)
   console.log("Goblin HP: ",monsters["Goblin"].HP)
   
   console.log("Goblin attacks for " + results[1])
   console.log("Dire Wolf HP drops to " + results[2])
   
   console.log("Dire wolf retialates for " + results[0])
   console.log("Goblin HP drops to " +results[3])*/
   