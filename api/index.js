const cool = require('cool-ascii-faces')
var express = require('express')
const path = require('path')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const loggedIn = false;

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

var auth = require('./auth');
var admin = require('./routes/admin');
var user = require('./routes/user');
var bodyParser = require('body-parser')
var flash = require('connect-flash');
var session = require('express-session');
const passport = require('passport');
var mysql      = require('mysql');


var fs = require("fs");
var logger = require('morgan');


function isAuthenticated(req, res, next) {
	if (req.user && req.isAuthenticated())
		return next();
	res.redirect('/login');
}

var app = express();
app
	.use(express.static(path.join(__dirname, 'public')))
	.use(bodyParser.json({ type: 'application/*+json' }))
	.use(bodyParser.text({ type: 'text/html' }))
	.use(bodyParser.urlencoded({ extended: true }))
	.set('views', path.join(__dirname, 'views'))
	.set('view engine', 'ejs')
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));


app.use(logger('combined', {
		exitOnError: false,
		stream: fs.createWriteStream('./access.log', {flags: 'a'}),
		level: 'debug',
		"format": "default",
}));

app.use(logger('dev'));




var connection = mysql.createConnection({
	host     : process.env.DBHOST,
	port     : process.env.DBPORT,
	user     : process.env.DBUSER,
	password : process.env.DBPWD,
	database : process.env.DBNAME
});

connection.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});

connection.connect(function(err) {
	
	
	console.log(process.env.DBHOST);
	console.log(process.env.DBPORT);
	console.log(process.env.DBUSER);
	console.log(process.env.DBHOST);
	console.log(process.env.DBPWD);
	console.info("EEEEE");
	
	if (err) throw err;
	
	console.log("Connected!");
	console.info("EEEEE");
	console.info('listening on port: ' + PORT);
	
});



global.db = connection;



db.on('error', function(err) {
  console.log(err.code); // 'ER_BAD_DB_ERROR'
});



/*  PASSPORT SETUP  */
app.use(flash());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

app.use(function(req, res, next){
	res.locals.user = req.user;
	res.locals.myVar = 'sample value';
	next();
});

/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
	function(username, password, done) {
		//Check if username and password exist
		
		var queryText  = "SELECT * FROM Users ";
				queryText += "left join Roles on Roles.Role_ID = Users.Role ";
				queryText += "left join Team_Users_Link tul on tul.User_ID = Users.User_ID ";
				queryText += "left join Teams tms on tms.Team_ID = tul.Team_ID ";
				queryText += "where Username = '"+username+"' ";
				//queryText += "and Password = '"+password+"'";
				
		db.query(queryText, function (err, results, fields) {
			if (err){
				throw err;
				//redirect to error page
				//return;
			}
			if(results.length>0) {
				console.log("login results " + JSON.stringify(results[0], null, 2));
				
				if(bcrypt.compareSync(password, results[0].Password)){
					return done(null, {username: username, userID: results[0].User_ID, roleID: results[0].Role_ID, teamID: results[0].Team_Id, teamAbbr: results[0].Abbreviation	});
				}
				else {
					return done(null, false, { message: 'Username/Password failed, try again. (0)' })
				}
			} else {
				return done(null, false, { message: 'Username/Password failed, try again. (1)' })
			}
		});
	}
));

app.get('/', function(req, res) {
	console.log("app.get / "+req.session);
	
	
	
	db.query("SELECT * FROM Users", function (err, results, fields) {
			if (err) throw err;
			if(results.length>0) {
				
					console.log(results[0]);
					
					if(req.user)
        	{
        		res.render('pages/index', { title: 'Home', myVar : 'help', username: req.user.username, roleID: req.user.roleID });
        	}
        	else{
        		res.render('pages/index', { title: 'Home', myVar : 'help', DBNAME: process.env.DBHOST, host     : process.env.DBHOST,
        	port     : process.env.DBPORT,
        	user     : process.env.DBUSER,
        	password : process.env.DBPWD,
        	database : process.env.DBNAME,
            userHere : JSON.stringify(results[0], null, 2)
        		});
        	}
			} else {
				
			}
			
			
		});
		
		
	
});

app.get('/login', function(req, res) {
	res.render('pages/login', { title: 'Home', myVar : 'help' });
});

app.post('/login', user.login);


app.get('/user/teams/available', isAuthenticated, user.teamsAvailable);
app.get('/user/teams/request/:id', isAuthenticated, user.teamsRequest);

app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/signupSuccess', user.signupSuccess);

app.get('/profile', isAuthenticated, user.profileView);

app.get('/logout', function (req, res){
	req.session.destroy(function (err) {
		res.redirect('/'); //Inside a callback… bulletproof!
	});
});

app.get('/admin/teams/all', isAuthenticated, admin.teamsAll);