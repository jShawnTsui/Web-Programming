/**
 * Module dependencies.
 */
var express     = require('express')
  , app = express()
  , http        = require('http')
  , path        = require('path')
  , stylus      = require("stylus")
  , nib         = require("nib")
  , passport    = require('passport')
  , mongoose    = require('mongoose')
  , flash       = require('connect-flash')
  , morgan       = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser   = require('body-parser')
  , session      = require('express-session') 
  , userQuery   = require("./app/routes/userQuery")
  , category    = require("./app/routes/category")
  , cityCate    = require("./app/routes/cityCate")
  , city        = require("./app/routes/city")
  , friendQuery = require("./app/routes/friendQuery")
  , businessQuery = require("./app/routes/businessQuery")
;
// configure database 
var configDB = require('./config/database.js'); 
// configuration 
mongoose.connect("mongodb://localhost:27017/cis550", function (err, db) {
    if (!err) {
        console.log("we are connected to mongo");
    }
})

// Initiate app
init_app(app);

//set up express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// required for passport
app.use(session({secret: 'ilovescotchscotchyscotchscotch'}));// secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes 
console.log('requiring routes')
require('./app/routes/routes.js')(app, passport); 

// pass passport for configuration
require('./config/passport')(passport); 

// Set the express logger: log to the console in dev mode
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function(req,res){
    res.render('index.jade');
});

app.get('/business', businessQuery.do);
app.get('/user', function(req, res) {
  res.render('user.jade');
});
app.get('/userQuery', userQuery.do);
app.get('/category', category.do);
app.get('/cityCate', cityCate.do);
app.get('/city', city.do);
app.get('/friend', friendQuery.do)

app.get('/feedback', function(req,res){
    res.render('feedback.jade');
});

var fs = require('fs');
var feedbackData = require('./data/feedback.json');

app.get('/api', function(req, res) {
  res.json(feedbackData);
});

app.post('/api', function(req, res) {
  feedbackData.unshift(req.body);
  fs.writeFile('data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});


app.delete('/api/:id', function(req, res) {
  feedbackData.splice(req.params.id, 1);
  fs.writeFile('data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});

// Listen on the port we specify
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// This function compiles the stylus CSS files, etc.
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

// This is app initialization code
function init_app() {
  // all environments
  app.set('port', process.env.PORT || 8080);
  
  // Use Jade to do views
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');

  app.use(express.favicon());

  // Use Stylus, which compiles .styl --> CSS
  app.use(stylus.middleware(
    { src: __dirname + '/public'
    , compile: compile
    }
  ));
  app.use(express.static(path.join(__dirname, 'public')));
  // development only
  if ('development' == app.get('env')) {
    app.use(express.errorHandler());
  }
}

