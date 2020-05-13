'use strict';

var mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true
    },
  description: {
    type: String,
    required: true,
    },
  time: {
    type: time,
    required: true,
    // validate: {
    //   isnotPastTime(time){
    //     if(time.getTime() < new Date().getTime()){
    //       throw new Error("Event Date and Time has to be in future");
    //     }
    //   }
    // }
    },
  location: {
    type: String,
    required: true
    },
  eligibility: {
    type: String,
    required: true
  },
  companyProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyProfile'
  },
  eventRegistrations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EventRegistration'
    }
  ]
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

EventSchema.virtual('readableTime').get(function(){
  return  new Date(this.time).toLocaleString('en-US', { 
    dateStyle: 'full',
  })
}); 

module.exports = mongoose.model.Event || mongoose.model('Event', EventSchema);
      