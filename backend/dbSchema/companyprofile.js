'use strict';

var mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // validate: {
      //   notNull: 'Name cannot be empty'
      // }
    },
    location: {
      type: String,
      required: true,
      // validate: {
      //   notNull: 'Location cannot be empty'
      // }
    },
    description:{
      type: String
    },
    contactInformation:{
      type: String
    },
    jobPostings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JobPosting' 
    }],
    events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    messageWindows:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MessageWindow'
    }]
  },
  {
    timestamps: true
  },
)
  
module.exports = mongoose.models.CompanyProfile || mongoose.model('CompanyProfile', CompanyProfileSchema);