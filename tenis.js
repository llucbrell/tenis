var canvas;
var canvasContexto;
var bolaX= 50;
var bolaY= 50;
var bolaVelocidadX= 5;
var bolaVelocidadY= 4;


var pala1Y;
var pala2Y=50;

const PALA_DIMENSION= 70;
const PALA_ANCHURA= 5;
const PUNTOS_GANADOR=3;

var puntos1=0;
var puntos2=0;
var jugando= true;

window.onload= function (){

   canvas= document.getElementById("canvasTenis");
   canvasContexto= canvas.getContext("2d");
   
   var _framesXsegundo= 30;
   setInterval(function(){
   		calculaTenis();
        dibujaTenis();
   }, 1000/_framesXsegundo);

  canvas.addEventListener('mousedown', manejoClick);


   canvas.addEventListener('mousemove', function(evt){
           var posicionRaton= calculoPosicionRaton(evt);
           pala1Y= posicionRaton.y - (PALA_DIMENSION/2);

   });

}

function manejoClick(){
  if(!jugando){
    puntos1=0;
    puntos2=0;
     jugando=true;
  }
}

function calculaTenis(){
  if(!jugando){

    return;
}
   movimientoComputador();
  

	bolaX = bolaX + bolaVelocidadX;
	bolaY = bolaY + bolaVelocidadY;
    
    if(bolaX <0){
    	if(bolaY > pala1Y && bolaY< pala1Y+ PALA_DIMENSION){
        bolaVelocidadX = -bolaVelocidadX;

        var _anguloY= bolaY -(pala1Y- PALA_DIMENSION/2);
        bolaVelocidadY= _anguloY *0.15;//0.35
    	}
    	else{
        puntos2 +=1;
        resetBola();
       
        }
    }
    if(bolaX> canvas.width){
    	if(bolaY > pala2Y && bolaY< pala2Y+ PALA_DIMENSION){
        bolaVelocidadX = -bolaVelocidadX;
        
        var _anguloY= bolaY -(pala2Y- PALA_DIMENSION/2);
        bolaVelocidadY= _anguloY *0.15;
      }
      else{
        puntos1 +=1;
        resetBola();
        
        }
    }
    if(bolaY <0){
    	bolaVelocidadY = -bolaVelocidadY;
    }
    if(bolaY> canvas.height){
    	bolaVelocidadY = -bolaVelocidadY;
    }

}

function dibujaRed(){
    for(var i=0; i<canvas.height; i+=40){
      rectanguloColor(canvas.width/2-1, i, 2, 20, "white");
    }
}
function dibujaTenis(){
  if(!jugando){
  rectanguloColor(0,0, canvas.width, canvas.height, 'black');
 canvasContexto.fillStyle= "white";
  canvasContexto.fillText("juego finalizado click para volver a jugar", 50, 50);
  return;
}

	rectanguloColor(0,0, canvas.width, canvas.height, 'black');

	rectanguloColor(0, pala1Y, PALA_ANCHURA, PALA_DIMENSION, 'white');

  rectanguloColor((canvas.width)-PALA_ANCHURA, pala2Y, PALA_ANCHURA , PALA_DIMENSION, 'white');  
  dibujaScore(puntos1, puntos2);
  dibujaRed();
	circuloColor(bolaX, bolaY, 5, 'white');
  
}
function dibujaScore(puntos1, puntos2){
  canvasContexto.fillText(puntos1, 50, 50);
  canvasContexto.fillText(puntos2, canvas.width-50, 50);
}

function circuloColor( centroX, centroY, radio, color){
   canvasContexto.fillStyle= color;
   canvasContexto.beginPath();
   canvasContexto.arc(centroX, centroY, radio, 0, Math.PI*2, true);

   canvasContexto.fill();
}

function rectanguloColor( izquierdaX, arribaY, ancho, alto, color){
	canvasContexto.fillStyle= color;
	canvasContexto.fillRect(izquierdaX, arribaY, ancho, alto);
}


function resetBola(){
  if(puntos1 >= PUNTOS_GANADOR || 
      puntos2>= PUNTOS_GANADOR){
    puntos1=0;
    puntos2=0;
    jugando= false;
  }


	bolaX= canvas.width/2;
	bolaY= canvas.height/2;
	bolaVelocidadX = -bolaVelocidadX;
}

function calculoPosicionRaton(evt){
      var rectangulo = canvas.getBoundingClientRect();
      var raiz = document.documentElement;
      var ratonX= evt.clientX - rectangulo.left - raiz.scrollLeft;
      var ratonY= evt.clientY - rectangulo.top - raiz.scrollTop;

     return {
            x:ratonX,
            y:ratonY

     };

}

function movimientoComputador (){
    var pala2Centro= pala2Y+ (PALA_DIMENSION/2);
    if(pala2Centro< bolaY-35){
      pala2Y +=6;
    }
    else if(pala2Centro> bolaY+35){
       pala2Y -=6;
    }
}