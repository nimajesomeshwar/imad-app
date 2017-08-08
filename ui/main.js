console.log('Loaded!');
console.log('Successfully');

//move the image

var img= document.getElementById('img');
var marginLeft=0;
var a=0;
function moveRight(){
  marginLeft=marginLeft+5; 
  img.style.marginLeft=marginLeft+'px';
}
var marginRight=0;
var b=0;
function moveLeft(){
  marginRight=marginRight+5; 
  img.style.marginRight=marginRight+'px';
}

img.onclick=function (){
    if(a<20){
    var interval1=setInterval(moveRight,50);
    a=a+1;
    }
    else{
    var interval2=setInterval(moveLeft,50);
    b=b+1;
    }
};