const passport = require('passport');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

exports.login = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) { return res.render('pages/login', { title: 'Home', myVar : 'help', info: info }); }
		
		req.login(user, function(err) {
			if (err) { return next(err); }
			return res.redirect('/');
		});
	})(req, res, next);
};

exports.profileView = function(req, res) {
		res.render('pages/profile', {userID:req.user.userID, username: req.user.username, roleID: req.user.roleID });
};

exports.signup = function(req, res) {
	message = '';
	var username1 = '';
	if(req.method == "POST"){
		var post  = req.body;
		var username = post.username;
		var password = post.password;
		var fname = post.First_Name;
		var lname = post.Last_Name;
		
		//check if username already exists
		db.query("SELECT * FROM Users where Username = '"+username+"'", function (err, results, fields) {
			if (err){
				throw err;//res.render('pages/signup', { data: req.body, message: err });
			}
			if(results.length>0) {
				res.render('pages/signup', { data: req.body, message: "Username already exists" });
			} else {
				
				var passwordHashed = bcrypt.hashSync(password, salt);
				
				console.log("password "+password);
				console.log("passwordHashed "+passwordHashed);
				
				var sql = "INSERT INTO `Users`(`First_Name`,`Last_Name`,`Username`, `Password`) VALUES ('" + fname + "','" + lname + "','" + username + "','" + passwordHashed + "')";
				var query = db.query(sql, function(err, result) {
					if (err){
						throw err;//res.render('pages/signup', { data: req.body, message: err });
					}
					message = "Successfully! Your account has been created.";
					res.render('pages/signupSuccess', { message: message });
				});
			}
		});
	} else {
		res.render('pages/signup', { data: {}, message: message });
	}
};

exports.signupSuccess =  function(req, res) {
	res.render('pages/signupSuccess');
};


exports.teamsAvailable = function(req, res) {
	var message = "An error has occurred message";
	var queryText  = "SELECT tms.Team_ID, Abbreviation, Team_Name, c.Conference_Name, tul.User_ID, u.Username FROM Teams tms ";
			queryText += "inner join Team_Conferences_Link tcl on tms.Team_ID = tcl.Team_ID ";
			queryText += "inner join Conferences c on c.Conference_ID = tcl.Conference_ID ";
			queryText += "left join Team_Users_Link tul on tul.Team_ID = tms.Team_ID ";
			queryText += "left join Users u on tul.User_ID = u.User_ID ";
			queryText += "WHERE tms.Team_ID Not in (Select tul2.Team_ID from Team_Users_Link tul2)";
			queryText += "Order By tms.Team_ID";

		console.log("queryText " + queryText);

	//check if username already exists
	db.query(queryText, function (err, results, fields) {
		
		//console.log("results " + JSON.stringify(results, null, 2) + " fields "+ JSON.stringify(fields, null, 2));

		if (err) throw err;
		if(results.length>0) {
			res.render('pages/user/teams/available', {userID:req.user.userID, username: req.user.username, roleID: req.user.roleID, teams: results, fields: fields });
		} else {
			res.render('pages/user/teams/available', {message: message, userID:req.user.userID, username: req.user.username, roleID: req.user.roleID });
		}
	});
};


exports.teamsRequest = function(req, res) {
	var teamID = req.params.id;
	var userID = req.session.passport.user.userID;
	
	var message = "You have signed up for a team!";
	var queryText  = "INSERT INTO `Team_Users_Requests` (`Team_Id`, `User_Id`) ";
			queryText += "VALUES ('"+teamID+"', '"+userID+"')";
		
		//INSERT INTO `Users`(`First_Name`,`Last_Name`,`Username`, `Password`) VALUES ('" + fname + "','" + lname + "','" + username + "','" + password + "')";
		
		console.log("id " + 	req.params.id + " user id "+req.session.User_ID);
		console.log("req.session.passport.user.userID " + 	req.session.passport.user.userID);
		console.log("sql " + 	queryText);
		
		//console.log("queryText " + queryText);

	//check if username already exists
	db.query(queryText, function (err, results, fields) {
		
		//console.log("results " + JSON.stringify(results, null, 2) + " fields "+ JSON.stringify(fields, null, 2));
		
		if (err) {
			res.render('pages/user/teams/available', {message: err, userID:req.user.userID, username: req.user.username, roleID: req.user.roleID });
		} //throw err;
		
		
		var queryText2  = "SELECT tms.Team_ID, Abbreviation, Team_Name, c.Conference_Name, tul.User_ID, u.Username FROM Teams tms ";
			queryText2 += "inner join Team_Conferences_Link tcl on tms.Team_ID = tcl.Team_ID ";
			queryText2 += "inner join Conferences c on c.Conference_ID = tcl.Conference_ID ";
			queryText2 += "left join Team_Users_Link tul on tul.Team_ID = tms.Team_ID ";
			queryText2 += "left join Users u on tul.User_ID = u.User_ID ";
			queryText2 += "WHERE tms.Team_ID Not in (Select tul2.Team_ID from Team_Users_Link tul2)";
			queryText2 += "Order By tms.Team_ID";
			
		//check if username already exists
		db.query(queryText2, function (err, results, fields) {
			
			//console.log("results " + JSON.stringify(results, null, 2) + " fields "+ JSON.stringify(fields, null, 2));

			if (err) throw err;
			if(results.length>0) {
				res.render('pages/user/teams/available', {successMessage: "Your request has been submitted and an admin will review.", userID:req.user.userID, username: req.user.username, roleID: req.user.roleID, teams: results, fields: fields });
			} else {
				res.render('pages/user/teams/available', {message: message, userID:req.user.userID, username: req.user.username, roleID: req.user.roleID });
			}
		});
	});
};