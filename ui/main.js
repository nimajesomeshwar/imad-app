console.log('Loaded!');
console.log('Successfully');

var counter=0;
var button=document.getElementById('counter');
button.onclick=function(){
    //request
    var request=new XMLHttpRequest();
    //response
    request.onreadystatechange = function(){
        if(request.readystate===XMLHttpRequest.DONE){
            
        }
    };
    //rendering
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
};