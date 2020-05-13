const User = require("../dbSchema/user");
const StudentProfile= require("../dbSchema/studentprofile");
const CompanyProfile= require("../dbSchema/companyprofile");
const passwordHash = require('password-hash');
let createJwtToken = require('./../utility/search').createJwtToken;
//const { secret } = require('../config');

async function handle_request(msg, callback) {
    if(msg.params.path === 'post_login'){
      let emailId = msg.body.emailId;
      let password = msg.body.password;
      let user = await User.findOne({emailId: emailId});
      let error = 'Invalid email id or password';
      if (!user || !user.is_password_valid(password)){
        return callback(null,{error:error});
      }
      let profile = await eval(user.role + 'Profile').findOne({user: user._id});
      callback(null,createJwtToken(user,profile));
    };
}
exports.handle_request = handle_request;