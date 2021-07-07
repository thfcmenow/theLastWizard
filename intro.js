/* Sci-Fi Dramatic Theme by Twisterium | https://www.twisterium.com/
Music promoted by https://www.chosic.com/
Licensed under Creative Commons: Attribution 3.0 Unported (CC BY 3.0)
https://creativecommons.org/licenses/by/3.0/ */

function playMusic(){
    var audioElement = new Audio('intro/intro.mp3');
    audioElement.play();
}

function mainIntro()
{
    var intro01 = document.getElementById("intro01");
    drawText("Intro","canvas2")
    catx.drawImage(intro01,370,100)
    
}

// playground
/*
window.addEventListener("load", () => {
    
    let particleArray = [];
    const numOfParticles = 100;
  
    class Particle {
      constructor() {
        this.x = Math.random() * canvasGrid.width;
        this.y = Math.random() * canvasGrid.height;
        this.size = 10;
        this.ranY = Math.random() * 10 + 5;
        this.alpha = Math.random() * 0.3;
      }
      draw() {
        cde.beginPath();
        cde.fillStyle = `rgb(175,195,204, ${this.alpha})`;
        cde.moveTo(this.x - 2, this.y);
        cde.lineTo(this.x, this.y - 20);
        cde.lineTo(this.x + 2, this.y);
        cde.arc(this.x, this.y, 2, 0, Math.PI);
        cde.closePath();
        cde.fill();
      }
      update() {
          this.y += this.ranY + Math.random() * 1;
          if (this.y > canvasGrid.height) {
            this.y = 0;
          }
          
      }
    }
  
    function init() {
      for (let i = 0; i < numOfParticles; i++) {
        particleArray.push(new Particle());
      }
    }
  
    function animate() {
      // cde.globalAlpha = 0.05;
      cde.fillStyle = "rgb(0, 0, 0)";
      cde.fillRect(0, 0, canvasGrid.width, canvasGrid.height);
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
      }
      requestAnimationFrame(animate);
    }
    init();
    animate();
})*/