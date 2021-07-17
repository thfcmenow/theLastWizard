// monster definitions
const menus = 
{
    "gameMenu":
               {
                   "background-color":"gray",
                   "border-color":"gray",
                   "border-width":"1px",
                   "fontsize": "18px",
                   "launchSound":"",
                   "contents" :
                   ["Examine Spells","Select Spell","Move Character","End Turn","View Board"]
                
               },
               "monsterMenu":
               {
                   "background-color":"gray",
                   "border-color":"gray",
                   "border-width":"1px",
                   "fontsize": "18px",
                   "launchSound":"",
                   "contents" :
                   ["Move Monster","Attack","Fire Ranged Attack","End Turn"]
                
               }
}

// makes sure the menu box doesn't fly off the screen
function posMenuHelp(){
    let box = document.querySelector('.aMenu');

    // get height help
    // menuHeight = $(".aMenu div").length // we will say each row of text is roughly a block
    if ((theCursor.y) == gridsHeight-1) {
        boxheight = box.offsetHeight
        realHeight = global.boundary.height - boxheight
        $(".aMenu").css("top",realHeight)

    } // how many grids we have

    if ((theCursor.x) > gridsWidth-7) {
        boxWidth = box.offsetWidth
        realWidth = theCursor.x*64 - boxWidth
        $(".aMenu").css("left",realWidth)

    } // how many grids we have

}

// playerMenu((smx*64)+80,(smy*64)+80,"gameMenu","13px",gameBoard["x" + smx + "y" + smy])
function playerMenu(menu,player=1){
console.groupCollapsed("menu - playerMenu")
    var lock = "";
console.warn("warn:",menu)
    if (menu=="clear"){
        drawText("");
        mouseClickMenu = 0
        $(".aMenu").hide()
       
    } // clear menu

   

    // determine postition of character
    // this should be the same a cursor
    characterX = mX.a
    characterX == 0 ? characterX = 1 : ""
    characterY = mY.b

    // to determine the location of the menu first determine its size
    menuHeight = menus.gameMenu.contents.length
    menuWidth = Math.max(...(menus.gameMenu.contents.map(el => el.length)));
    console.log(menuHeight,"menuHeight") // in characters /n - not currently used
    console.log(menuWidth,"menuWidth") // in characters width

    // 14px per character?
    phaseTwo = menuWidth * 14  // this should be the number of blocks the menu will take
    
    console.log("phaseTwo",phaseTwo)
    phaseThree = phaseTwo
    
    /*4 characters = 1 blocks
    24 characters in Text

    24 characters / 4 =  6 blocks
    phaseTwo = 6 blocks * 64 phasethreeshould be menuwidth*/

    // render box
    // $("#menuLayer").append('<div id="themenu" class="aMenu"></div>')
    $(".aMenu").css("background-color",menus.gameMenu["background-color"])
    $(".aMenu").css("position","absolute")
    $(".aMenu").css("top",(characterY)*global.spriteSize.width)
    $(".aMenu").css("left",((latestSelectedMonster.x * scaleValue) + global.spriteSize.width) + 20)
    $(".aMenu").css("width",phaseThree)
    $(".aMenu").css("font-size",menus.gameMenu.fontsize)
    

    if (menu=="monsterMenu") // initial menu
    {
        $(".aMenu").html("")
        $(".aMenu").css("opacity",0.9)
        menus.monsterMenu.contents.forEach((entry, index) => {
            $(".aMenu").append("<div class='menuItem' id='" + index + "'>" + entry + "</div>")
        })

        $(".aMenu").show()
   
    }

    // position help for menu
    // posMenuHelp()
    

    // map mouse to gameMenu
  /*  $(".menuItem").click(function(){

        mouseClickMenu = $(this).attr("id")

    })*/
    

    
    
    if (menu=="gameMenu") // initial menu
    {
        $(".aMenu").html("")
        $(".aMenu").css("opacity",0.9)
        menus.gameMenu.contents.forEach((entry, index) => {
            $(".aMenu").append("<div class='menuItem' id='" + index + "'>" + entry + "</div>")
        })

        $(".aMenu").show()
   
    }

    // position help for menu
    // posMenuHelp()
    

    // map mouse to gameMenu
    $(".menuItem").click(function(){

        mouseClickMenu = $(this).attr("id")

    })

    

    
    if (menu=="SelectSpells") // spells pickup from playerSpellBooks
    {
        
       $(".aMenu").html("")

        // unbind menu items if needed
        $(".menuItem").off("click")
  
       playerSpellBooks[currentlySelectedCharacterIndex-1].spells.forEach((entry, index) => {
console.log(">> menu111:",entry)
            // determine what player can summon
            if (entry==="summon"){
                 lock = playerSpellBooks[0].monsterKey.find(element => element.key == index)
                 console.log("lock:",lock)
                 tempIndex = index+1
                 console.log("tempindex", tempIndex)
                 console.log("scan for used in monster summon",playerSpellBooks[currentlySelectedCharacterIndex-1].used.includes(tempIndex-1))
                 if (playerSpellBooks[currentlySelectedCharacterIndex-1].used.includes(tempIndex-1) == false){
                 $(".aMenu").append("<div class='menuItem' id='" + tempIndex + "'>" + entry.toProperCase() + " - " +  lock.realid + "</div>")
                 }
            } else
            {
                tempIndex = index+1
                if (playerSpellBooks[currentlySelectedCharacterIndex-1].used.includes(tempIndex-1) == false){
                $(".aMenu").append("<div class='menuItem' id='" + tempIndex + "'>" + entry.toProperCase() + "</div>")
                }
            }

            //update playerSpellBooks with menu number
            playerSpellBooks[0].spells[index] = playerSpellBooks[0].spells[index]
       })

       $(".aMenu").append("<div class='menuItem' id='" + parseInt(tempIndex+1) + "'>"  + "Exit Menu" + "</div>")

       $(".aMenu").show()

       mouseClickMenu = 0

       // map mouse to SelectSpells
    $(".menuItem").click(function(){

        mouseClickMenu = $(this).attr("id")
console.log("m",mouseClickMenu)
console.log(currentlySelectedCharacterIndex)

        // now remove it from the spellbook :(
            console.log("spell trying to remove:", playerSpellBooks[currentlySelectedCharacterIndex-1].spells[mouseClickMenu-1])
            playerSpellBooks[currentlySelectedCharacterIndex-1].used.push(mouseClickMenu-1)
      //  playerSpellBooks[currentlySelectedCharacterIndex-1].spells = playerSpellBooks[currentlySelectedCharacterIndex-1].spells.filter(item => item !==playerSpellBooks[currentlySelectedCharacterIndex-1].spells[mouseClickMenu-1])
        

    })
    }
    console.groupEnd()
}
