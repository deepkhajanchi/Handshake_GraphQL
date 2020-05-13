'use strict';

var mongoose = require('mongoose');

const JobPostingSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'Job title cannot be empty',
    //   },
    //   notEmpty: {
    //     msg: 'Job title cannot be empty'
    //   }
    // }
  },
  postingDate: {
    type: Date,
    required: true,
    // validate: {
    //   notNull: {
    //     msg: 'Posting date cannot be empty',
    //   },
    //   notEmpty: {
    //     msg: 'Posting date cannot be empty'
    //   }
    // }
  },
  applicationDeadline: {
    type: Date,
    required: [true,'Application deadline cannot be empty'],
  },
  location: {
    type: String,
    required: [true,'location cannot be empty'],
  },
  salary: {
    type: String,
    required: [true,'Salary cannot be empty'],
  },
  jobDescription: {
    type: String,
    required: [true,'Job description cannot be empty'],
  },
  jobCategory: {
    type: String,
    required: [true,'Job category cannot be empty'],
  },
  companyProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile'
  },
  jobApplications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'JobApplication'
  }]
},
{
  timestamps: true,
  toObject: {
    virtuals: true
  },
  toJSON: {
    virtuals: true
  }
})

JobPostingSchema.virtual('readableDeadline').get(function(){
  if (this.applicationDeadline){
    return  new Date(this.applicationDeadline).toLocaleString('en-US', { 
      dateStyle: 'full',
    })
  }
  else{
    return null
  }
});

module.exports = mongoose.models.JobPosting || mongoose.model('JobPosting', JobPostingSchema);
