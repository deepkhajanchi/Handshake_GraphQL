'use strict';

var mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  resumePath: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    // validate: {
    //   isIn: {
    //     args: [['Pending','Reviewed','Declined']],
    //     msg: 'Invalid status',
    //   }
    // },
    default: 'Pending'
  },
  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile',
    required: true
  },
  jobPosting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobPosting',
    required: true
  }
},
{
  timestamps: true
});

module.exports = mongoose.models.JobApplication || mongoose.model('JobApplication', JobApplicationSchema);