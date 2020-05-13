let JobApplication= require('../dbSchema/jobapplication');
let StudentProfile= require('../dbSchema/studentprofile');
let JobPosting= require('../dbSchema/jobposting');
const formidable = require('formidable');
let searchableQuery=require('../utility/search').searchableQuery;

async function handle_request(msg, callback) {
if(msg.params.path === 'create_job_application'){
    var createData = {
      jobPosting: msg.fields.jobPostingId,
      studentProfile: msg.fields.studentProfileId,
      resumePath: `${msg.fields.jobPostingId}_${msg.fields.studentProfileId}_resume.pdf`
    }
    var jobApplication = await JobApplication.findOne({
      jobPosting: msg.fields.jobPostingId, 
      studentProfile: msg.fields.studentProfileId
    });
    if(jobApplication){
      callback(null,{error: 'Application already submitted'});
    } 
    var newJobApplication = new JobApplication(createData);
    newJobApplication.save()
    .then(async jobApplication => {
      let studentProfile = await StudentProfile.findById(msg.fields.studentProfileId);
      let jobPosting = await JobPosting.findById(msg.fields.jobPostingId);
      studentProfile.jobApplications.push(jobApplication._id);
      jobPosting.jobApplications.push(jobApplication._id);
      await studentProfile.save();
      await jobPosting.save();
      return jobApplication;
    })
    .then(_ =>{
      callback(null,true);  
    })
    .catch(error => {
      callback(null, {error: error.message});
    })
  }
}

exports.handle_request = handle_request;