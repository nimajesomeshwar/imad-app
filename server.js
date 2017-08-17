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
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


//reducing code
var articles = {
'article-one': {
    title:'Article-One|Som',
    heading:'Article-One',
    date:'August 15',
    content:` <h4>Web applications</h4>
         <img src="http://shahwebsetters.com/wp-content/uploads/2015/11/web-applications-development-shahwebsetters.jpg" align="center"/>
          <p>The general distinction between a dynamic web page of any kind and a "web application" is unclear. Web sites most likely to be referred to as "web applications" are those which have similar functionality to a desktop software application, or to a mobile app. HTML5 introduced explicit language support for making applications that are loaded as web pages, but can store data locally and continue to function while offline.</p>
          <p>Single-page applications are more application-like because they reject the more typical web paradigm of moving between distinct pages with different URLs. Single-page frameworks like Sencha Touch and AngularJS might be used to speed development of such a web app for a mobile platform.</p>
          <div>
          <a href="/article-two">Article-Two</a>
          <a href="/article-three">Article-Three</a>
            </div>
         </div>`
},
'article-two':{    
    title:'Article-Two|Som',
    heading:'Article-Two',
    date:'August 16',
    content:` <h4>Mobile web applications</h4>
          <p>There are several ways of targeting mobile devices when making a web application:</p>

          <p> Responsive web design can be used to make a web application - whether a conventional web site or a single-page application viewable on small screens and work well with touchscreens.</p>
          <p>Progressive Web Apps are a hybrid of regular web pages (or websites) and a mobile application.</p>
          <p>Native apps or "mobile apps" run directly on a mobile device, just as a conventional software application runs directly on a desktop computer, without a web browser (and potentially without the need for Internet connectivity); these are typically written in Java (for Android devices) or Objective C or Swift (for iOS devices). Recently, frameworks like React Native, Flutter and Xamarin allow the development of native apps for all platforms using languages other than each standard native language.</p>
          <p>Hybrid apps embed a mobile web site inside a native app, possibly using a hybrid framework like Apache Cordova and Ionic or Appcelerator Titanium. This allows development using web technologies (and possibly directly copying code from an existing mobile web site) while also retaining certain advantages of native apps (e.g. direct access to device hardware, offline operation, app store visibility).</p>
          <div>
          <a href="/article-one">Article-One</a>
          <a href="/article-three">Article-Three</a>
            </div>`},
'article-three':{ title:'Article-Three|Som',
    heading:'Article-Three',
    date:'August 17',
    content:`  <p>Through Java, JavaScript, DHTML, Flash, Silverlight and other technologies, application-specific methods such as drawing on the screen, playing audio, and access to the keyboard and mouse are all possible. Many services have worked to combine all of these into a more familiar interface that adopts the appearance of an operating system. General purpose techniques such as drag and drop are also supported by these technologies. Web developers often use client-side scripting to add functionality, especially to create an interactive experience that does not require page reloading. Recently, technologies have been developed to coordinate client-side scripting with server-side technologies such as ASP.NET, J2EE, Perl/Plack and PHP.</p>

         <p>Ajax, a web development technique using a combination of various technologies, is an example of technology which creates a more interactive experience.</p>
         <div>
          <a href="/article-one">Article-One</a>
          <a href="/article-two">Article-Two</a>
            </div>`}
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
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

var names=[];
app.get('/submit-name', function(req,res){
    //request to server
   // var name= req.params.name;
   var name= req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/articles/:articleName', function (req, res) {
    pool.query("SELECT * FROM article WHERE title= '"+req.params.articleName+"'",function(err,result){
        if(err){
            res.status(500).send(err.toString());
        } if(result.rows.length===0){
            res.status(404).send('Article not found');
        } else{
            var articleData=result.rows[0];
            res.send(createTemplate(articleData));
        }
    });

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




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
