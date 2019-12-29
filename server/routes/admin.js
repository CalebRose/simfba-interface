const passport = require('passport');

exports.teamsAll = function(req, res) {
	var message = "An error has occurred message";
	var queryText  = "SELECT tms.Team_ID, Abbreviation, Team_Name, c.Conference_Name, tul.User_ID, u.Username FROM Teams tms ";
			queryText += "inner join Team_Conferences_Link tcl on tms.Team_ID = tcl.Team_ID ";
			queryText += "inner join Conferences c on c.Conference_ID = tcl.Conference_ID ";
			queryText += "left join Team_Users_Link tul on tul.Team_ID = tms.Team_ID ";
			queryText += "left join Users u on tul.User_ID = u.User_ID ";
			queryText += "Order By tms.Team_ID";

		console.log("queryText " + queryText);

	//check if username already exists
	db.query(queryText, function (err, results, fields) {
		
		console.log("results " + JSON.stringify(results, null, 2) + " fields "+ JSON.stringify(fields, null, 2));

		if (err) throw err;
		if(results.length>0) {
			res.render('pages/admin/teams/all', {userID:req.user.userID, username: req.user.username, roleID: req.user.roleID, teams: results, fields: fields });
		} else {
			res.render('pages/admin/teams/all', {message: message, userID:req.user.userID, username: req.user.username, roleID: req.user.roleID });
		}
	});
};