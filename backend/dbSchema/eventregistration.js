'use strict';

var mongoose = require('mongoose');

const EventRegistrationSchema = new mongoose.Schema({
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    studentProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'StudentProfile'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model.EventRegistration || mongoose.model('EventRegistration', EventRegistrationSchema);
