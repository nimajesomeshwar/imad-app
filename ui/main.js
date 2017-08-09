console.log('Loaded!');
console.log('Successfully');

var button=document.getElementById('counter');
button.onclick=function(){
    //create request
    var request=new XMLHttpRequest();
    //response
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
    };
    //make request
    request.open('GET','http://nimajesomeshwar.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onclick=function(){
    //make request to the server and send the name 
    //Capture list of names from server an display it
    var names=['name1','name2','name3'];
    var list='';
};