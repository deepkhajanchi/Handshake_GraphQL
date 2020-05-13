'use strict';
const crypto = require('crypto')
var mongoose = require('mongoose');
let StudentProfile = require('./studentprofile')
let CompanyProfile = require('./companyprofile')

const UserSchema = new mongoose.Schema({
  emailId: {
    type: String,
    unique: [true,'Email address has to be unique'],
    required: [true,'Email address has to be unique'],
    isEmail: true,
    // validate: {
    //   notNull: {
    //     msg: 'Email address has to be unique'
    //   },
    //   isEmail: {
    //     args: true,
    //     msg: 'Email not in a valid format'
    //   }
    // }
  },
  password: {
    type: String,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'Password is required'
    //   }
    // }
  },
  salt: {
    type: String
  },
  role: {
    type: String,
    required: true,
    validate: {
      validator: function(role){
        return ['Student','Company'].includes(role);
      },
      message: 'Has to be a Student or Company'
    }
  }
},
{
  timestamps: true
});

UserSchema.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
};
UserSchema.encryptPassword = (plainText, salt) => {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

UserSchema.virtual('profile').get(function(){
  const profile = this.role === 'Student' ? StudentProfile : CompanyProfile;
  return profile.findOne({userId: this._id});
});
UserSchema.methods.is_password_valid = function(password){
    return this.password === UserSchema.encryptPassword(password, this.salt);
};

UserSchema.pre('save',function(next){
  if (this.isNew) {
    this.salt = UserSchema.generateSalt();
    this.password = UserSchema.encryptPassword(this.password, this.salt);
  }
  next();
});

UserSchema.post('save', function(error, doc, next) {
  if (error.message === 'MongoError' && error.code === 11000) {
    next(new Error('email must be unique'));
  } else {
    next(error);
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
