//canvas
var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d')


//testing
//ctx.strokeRect(0,0,50,50)

//Variables Globales
var interval;
var frames = 0;
var images ={
    bg:"./cuadricula.png",
    bact:"./sprite.png",
    leuco:"./sprite-glob.png",
    splashJ2:"./rastro.png",
    splashJ1:"./rastro1.png"
}
var rastroJ1=[]
var rastroJ2= []
var total = 0
var porcenJ1 = 50
var porcenJ2 = 50


//Classes
class Board {
    constructor(){
        this.x = 0
        this.y = 0
        this.width = canvas.width
        this.height = canvas.height
        this.image = new Image()
        this.image.src = images.bg
        this.image.onload = () =>{
            this.draw()
        }
    }
        draw (){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            ctx.fillText(frames,50,50)
    }
}
//Microscopio

class Bact {
    constructor(){
        this.x =400
        this.y= 350
        this.cachoX= 0
        this.cachoWidth=150
        this.width= 100
        this.height= 100
        this.image = new Image()
        this.image.src = images.bact
        this.image.onload = () =>{
            this.draw()
        }
    }
    draw (){
        if(frames%10===0)this.changeSprite()
        ctx.drawImage(this.image,this.cachoX,0,this.cachoWidth,150,this.x,this.y,this.width,this.height)
    }
    changeSprite(){
       this.cachoX+=this.cachoWidth
       if(this.cachoX >= this.image.naturalWidth){
           this.cachoX=0
       } 
    }

}
//Bacteria

class Leuco{
    constructor(){
        this.x =0
        this.y= 350
        this.cachoX= 0
        this.cachoWidth=150
        this.width= 100
        this.height= 100
        this.image = new Image()
        this.image.src = images.leuco
        this.image.onload = () =>{
            this.draw()
        }
    }
        draw (){
            if(frames%10===0)this.changeSprite()
            ctx.drawImage(this.image,this.cachoX,0,this.cachoWidth,150,this.x,this.y,this.width,this.height)
        }
        changeSprite(){
           this.cachoX+=this.cachoWidth
           if(this.cachoX >= this.image.naturalWidth){
               this.cachoX=0
           } 
        }
}
//Leucocito

class Rastro{
     constructor(jugador){
         this.x = jugador.x-25
         this.y = jugador.y-25
         this.height = 50
         this.width = 50
         this.cachoX= 0
        this.cachoWidth=150
         this.image = new Image()
         if(jugador==jugador1) this.image.src = images.splashJ1
         if(jugador==jugador2) this.image.src = images.splashJ2
     
        }
     dibujarRastro(){
             if(frames%10===0)this.changeSprite()
             ctx.drawImage(this.image,this.cachoX,0,this.cachoWidth,150,this.x,this.y,this.width,this.height)
    
     } 
     changeSprite(){
        this.cachoX+=this.cachoWidth
        if(this.cachoX >= this.image.naturalWidth){
            this.cachoX=0
        } 
 }
}

 //Rastro


 //Instancias
var bg= new Board()
var jugador2 = new Bact()
var jugador1 = new Leuco()


//funciones principales
function update(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
if (frames%10===0){
if (bg.keys && bg.keys[65]) {
    jugador1.x -= 45
    crearRastro(jugador1)
  }
  if (bg.keys && bg.keys[87]) {
    jugador1.y-=45;
    crearRastro(jugador1)
   }
  if (bg.keys && bg.keys[83]) {
    jugador1.y += 45
    crearRastro(jugador1)
   }
    if(bg.keys && bg.keys[68]){
    jugador1.x+=45;
    crearRastro(jugador1)
    }
    if(bg.keys && bg.keys[37]){
        jugador2.x -= 45
        crearRastro(jugador2)
    }
    if(bg.keys && bg.keys[39]){
      jugador2.x+=45;
      crearRastro(jugador2)
    }
    if(bg.keys && bg.keys[40]){
        jugador2.y += 45
        crearRastro(jugador2)
    }
    if(bg.keys && bg.keys[38]){
      jugador2.y-=45;
      crearRastro(jugador2)
    }
}
rastroJ1.forEach(function(rastrito){
    rastrito.dibujarRastro()
})
rastroJ2.forEach(function(rastrito){
    rastrito.dibujarRastro()
})     
jugador2.draw()
jugador1.draw()
bg.draw()    
frames++
total = rastroJ1.length + rastroJ2.length
porcenJ1 = (100/total)*rastroJ1.length
porcenJ2 = (100/total)*rastroJ2.length
console.log(frames)
if (frames >= 1800 && porcenJ1!=50 ) gameOver()
}

function start(){
   if(interval)return
     //-------AQUI EMPIEZAN LOS OBSERVADORES PARA HACER QUE PRESIONE VARIAS TECLAS ------ //
  window.addEventListener('keydown', function (e) {
    bg.keys = (bg.keys || []);
    bg.keys[e.keyCode] = true;
  })
  window.addEventListener('keyup', function (e) {
    bg.keys[e.keyCode] = false; 
  })
//-------AQUI TERMINAN LOS OBSERVADORES PARA HACER QUE PRESIONE VARIAS TECLAS ------ //
interval = setInterval(update,1000/60) 
}

function gameOver(){
        clearInterval(interval)
        if(rastroJ1.length >rastroJ2.length){
            ctx.fillText("Jugador1",300,300,300)
        }
        if(rastroJ2.length >rastroJ1.length){
            ctx.fillText("Jugador2",300,300,300)
        }

        console.log(porcenJ1)
        console.log(porcenJ2)
        
        ctx.fillText(Math.floor(porcenJ1) +"%",100,350,300)
        ctx.fillText(Math.floor(porcenJ2) +"%",300,350,300)
        rastroJ1=[]
        rastroJ2= []
        interval = null
        frames = 0 
}


//funciones auxiliares
function crearRastro(jugador){
var rastroCreado = new Rastro(jugador)

rastroCreado.x=jugador.x+25
rastroCreado.y=jugador.y+25

if(jugador === jugador1) {
    rastroJ1.forEach(function(rastrito){
        if(rastroCreado.x=== rastrito.x) return
    })
    rastroJ1.push(rastroCreado)
}
if(jugador === jugador2) rastroJ2.push(rastroCreado)
}

start()

