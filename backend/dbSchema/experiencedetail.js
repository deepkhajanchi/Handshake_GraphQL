'use strict';

var mongoose = require('mongoose');

const ExperienceDetailSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  title: {
    type: String,
  },
  companyLocation: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  workDescription: {
    type: String,
  },
  studentProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StudentProfile'
  }
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

ExperienceDetailSchema.virtual('readableStartDate').get(function(){
  if (this.startDate){
    return new Date(this.startDate).toLocaleString('en-US', { 
      month: 'long',
      year: 'numeric' 
    })
  }
  else{
    return null
  }
});

ExperienceDetailSchema.virtual('readableEndDate').get(function(){
  if (this.endDate){
    return new Date(this.endDate).toLocaleString('en-US', { 
      month: 'long',
      year: 'numeric' 
    })
  }
  else{
    return null
  }
});

ExperienceDetailSchema.statics.createOrUpdate = async function(data){
  let experienceDetail = await this.findOne({_id: data.id});
  delete data.id
  if(experienceDetail){
    this.findOneAndUpdate(
      { _id: experienceDetail._id },
      { $set: data }, 
      {"new": true})
    .exec()
    .then( experienceDetail => experienceDetail);
  }
  let newExperienceDetail = new this(data)
  return newExperienceDetail.save(data).then(async (experienceDetail) => {
    let StudentProfile = mongoose.model('StudentProfile');
    let studentProfile = await StudentProfile.findById(data.studentProfile)
    studentProfile.experienceDetails.push(experienceDetail._id);
    await studentProfile.save();
    return experienceDetail;
  });
}

module.exports = mongoose.model.ExperienceDetail || mongoose.model('ExperienceDetail', ExperienceDetailSchema);