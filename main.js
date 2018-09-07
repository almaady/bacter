//canvas
var canvas = document.getElementById('juego');
var ctx = canvas.getContext('2d')
var btnPlay = document.getElementById("play")
var btnInstrucciones = document.getElementById("instrucciones")
var textoIns = document.getElementById("instruccionesTexto")
var imagenJ1 = document.getElementsByClassName("jugador1")[0]
var imagenJ2 = document.getElementsByClassName("jugador2")[0]
var cerrar = document.getElementById("close")
var tiempo = document.getElementsByClassName("tiempo")[0]
var btnReplay = document.getElementById("replay")
var titulo = document.getElementById("tituloSVG")
var ganador ;
var porcenJ1 = 50;
var porcenJ2 = 50;



//testing
//ctx.strokeRect(0,0,50,50)

//Variables Globales
var interval;
var frames = 0;
var images ={
    bg:"./imagenes/cuadricula.png",
    bact:"./sprites/sprite.png",
    leuco:"./sprites/sprite-glob.png",
    splashJ2:"./sprites/rastro.png",
    splashJ1:"./sprites/rastro1.png"
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
        this.music = new Audio()
    this.music.src ='./musica/02 Fever.mp3'
    }
        draw (){
            ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
            ctx.fillText(frames,50,50)
    }
    
}
//Microscopio

class Bact {
    constructor(){
        this.x =500
        this.y= 250
        this.cachoX= 0
        this.cachoWidth=150
        this.width= 100
        this.height= 100
        this.image = new Image()
        this.image.src = images.bact
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
        this.y= 250
        this.cachoX= 0
        this.cachoWidth=150
        this.width= 100
        this.height= 100
        this.image = new Image()
        this.image.src = images.leuco
        this.sonido = new Audio()
        this.sonido.src="./musica/blubs_1.mp3"

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
    crashWith(item){
       return  (this.x < item.x + item.width)&&
               (this.x + this. width > item.x)&&
               (this.y < item.y + item.height)&&
               (this.y + this.height > item.y)
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
$("canvas").css("background","white")

total = rastroJ1.length + rastroJ2.length
porcenJ1 = (100/total)*rastroJ1.length
porcenJ2 = (100/total)*rastroJ2.length
//console.log(frames)
    document.getElementById("scoreJ1").innerHTML= (Math.floor(porcenJ1)+ "%")
    document.getElementById("scoreJ2").innerHTML= (Math.floor(porcenJ2)+ "%")

if (frames >= 1800 && porcenJ1!=50 ) gameOver()
checkCollitions()
checkCollitions2()
document.getElementById("tiempo").innerHTML= (30-Math.round((frames/60)) + " segs")
}

function replay(){
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
document.getElementById("ganadorJuego").style.display='none'

}

function start(){
   if(interval)return
     //-------AQUI EMPIEZAN LOS OBSERVADORES PARA HACER QUE PRESIONE VARIAS TECLAS ------ //
  window.addEventListener('keydown', function (e) {
    bg.keys = (bg.keys || []);
    bg.keys[e.keyCode] = true;
    e.preventDefault()
  })
  window.addEventListener('keyup', function (e) {
    bg.keys[e.keyCode] = false; 
  })
  imagenJ1.classList.toggle("ocultate")
  imagenJ2.classList.toggle("ocultate")
  tiempo.classList.toggle("ocultate")
  nombreJ1()
  nombreJ2()
  titulo.classList.toggle("tituloChico")

  
//-------AQUI TERMINAN LOS OBSERVADORES PARA HACER QUE PRESIONE VARIAS TECLAS ------ //
interval = setInterval(update,1000/60) 

}

function nombreJ1() {
    var person = prompt("Team Leucocitos");
    document.getElementById("nombreJ1").innerHTML = person;
}

function nombreJ2() {
    var person = prompt("Team Bacterias");
    document.getElementById("nombreJ2").innerHTML = person;
}


function gameOver(){
        clearInterval(interval)
        // ganador.style.display="inherit"
        if(rastroJ1.length >rastroJ2.length){
            ganador = ganadorJ1()
        }
        if(rastroJ2.length >rastroJ1.length){
          ganador = ganadorJ2()
        }
        // if(rastroJ1.length >rastroJ2.length){
        //     document.getElementById("textoganadorJuego").innerHTML= "¡Felicidades, ninguna bacteria es rival para ti!"
        //     document.getElementById("ganadorJuego").classList.toggle("ganadorJ1")
        //     document.getElementById("imagenGanadorJ1").classList.toggle("ocultate")
        // }
        // if(rastroJ2.length >rastroJ1.length){
        //     document.getElementById("textoganadorJuego").innerHTML= "¡Felicidades, el sistema inmunológico no fue rival para ti!"
        //     document.getElementById("ganadorJuego").classList.toggle("ganadorJ2")
        //     document.getElementById("imagenGanadorJ2").classList.toggle("ocultate")
        // }

        console.log(porcenJ1)
        console.log(porcenJ2)
        document.getElementById("scoreJ1").innerHTML= (Math.floor(porcenJ1)+ "%")
        document.getElementById("scoreJ2").innerHTML= (Math.floor(porcenJ2)+ "%")
       
        //ctx.fillText(Math.floor(porcenJ1) +"%",100,350,300)
        //ctx.fillText(Math.floor(porcenJ2) +"%",300,350,300)
        rastroJ1=[]
        rastroJ2= []
        interval = null
        frames = 0 

        btnReplay.style.display ="inherit"
        bg.music.pause()
    //btnInstrucciones.classList.toggle("ocultate")

}


//funciones auxiliares

function ganadorJ1(){
    document.getElementById("textoganadorJuego").innerHTML= "¡Felicidades, ninguna bacteria es rival para ti!"
    document.getElementById("ganadorJuego").classList.toggle("ganadorJ1")
    document.getElementById("imagenGanadorJ1").classList.toggle("ocultate")
}
function ganadorJ2(){
    document.getElementById("textoganadorJuego").innerHTML= "¡Felicidades, el sistema inmunológico no fue rival para ti!"
    document.getElementById("ganadorJuego").classList.toggle("ganadorJ2")
    document.getElementById("imagenGanadorJ2").classList.toggle("ocultate")
}

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

function checkCollitions(){
        rastroJ1.forEach(function(elemento){
            if(elemento.crashWith(jugador2)){
            rastroJ1.splice(rastroJ1.indexOf(elemento),1)
            }
        })
}
function checkCollitions2(){
    rastroJ2.forEach(function(element){
        if(element.crashWith(jugador1)){
        rastroJ2.splice(rastroJ2.indexOf(element),1)
        }
    })
}


//observador
btnPlay.addEventListener("click",()=>{
    start()
    bg.music.play()
    document.getElementById("scoreJ1").innerHTML = "0%"
    document.getElementById("scoreJ2").innerHTML = "0%"
    btnPlay.classList.toggle("ocultate")
    btnInstrucciones.classList.toggle("ocultate")
})

btnInstrucciones.addEventListener("click",()=>{
    textoIns.style.display="inherit"
    //close.classList.toggle("ocultate")
})

cerrar.addEventListener("click",()=>{
    textoIns.style.display="none"
})

btnReplay.addEventListener("click",()=>{
    replay()
    document.getElementById("scoreJ1").innerHTML = "0%"
    document.getElementById("scoreJ2").innerHTML = "0%"
    btnReplay.style.display ="none"
    ganador = null


    // btnReplay.classList.toggle("replay")
})