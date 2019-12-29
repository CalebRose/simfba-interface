const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const passport = require("passport");
var user = require("../routes/user");

// salt rounds
