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

var submit=document.getElementById('submit_btn');
submit.onclick=function(){
     var request=new XMLHttpRequest();
    //response
    request.onreadystatechange = function(){
        if(request.readyState===XMLHttpRequest.DONE){
            if(request.status===200){
                   var names= request.responseText;
                   names= JSON.parse(names);
    var list='';
    for (var i=0;i<names.length;i++){
        list += '<li>' + names[i] + '</li>';
    }
    var ul= document.getElementById('namelist');
    ul.innerHTML=list;
            }
        }
    };
    //make request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://nimajesomeshwar.imad.hasura-app.io/submit-name?name='+name,true);
    request.send(null);
    //make request to the server and send the name 
    //Capture list of names from server an display it

};