var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var config={
    user:'nimajesomeshwar',
    database: 'nimajesomeshwar',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//reducing code
var articleOne={
    title:'Article-One|Som',
    heading:'Article-One',
    date:'August 15',
    content:` <h4>Web applications</h4>
         <img src="http://shahwebsetters.com/wp-content/uploads/2015/11/web-applications-development-shahwebsetters.jpg" align="center"/>
          <p>The general distinction between a dynamic web page of any kind and a "web application" is unclear. Web sites most likely to be referred to as "web applications" are those which have similar functionality to a desktop software application, or to a mobile app. HTML5 introduced explicit language support for making applications that are loaded as web pages, but can store data locally and continue to function while offline.</p>
          <p>Single-page applications are more application-like because they reject the more typical web paradigm of moving between distinct pages with different URLs. Single-page frameworks like Sencha Touch and AngularJS might be used to speed development of such a web app for a mobile platform.</p>
         </div>`
};

function createTemplate(dta){
    var title= data.title;
    var date= data.date;
    var heading= data.heading;
    var content= data.heading;
var htmlTemplate=`<html>
      <head>
          <title> ${title} </title>
           <link href="/ui/style.css" rel="stylesheet" />
          <meta name="viewpart" content="width-device-width, initial-scale-1"/>


      </head>
      <body>
          <div class="container">
          <div>
          <a href="/">Home</a>
          </div>
          <hr/>
          <h3> ${heading} </h3>
          <div>
               <p>${date}</p>
          </div>
                ${content}
         </div>
      </body>
</html>
`;
return htmlTemplate;
}

app.get('/article-one', function (req, res) {
  res.send(createTemplate(articleOne));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});


var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req,res){
    //request to server
   // var name= req.params.name;
   var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    //select req
    pool.query('SELECT * FROM test',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send(JSON.stringify(result.rows));
        }
    });
    //return response

});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
