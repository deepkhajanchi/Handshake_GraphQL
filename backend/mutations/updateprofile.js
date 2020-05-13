let StudentProfile = require('../dbSchema/studentprofile');
let EducationDetail = require('../dbSchema/educationdetail');
let ExperienceDetail = require('../dbSchema/experiencedetail');
let searchableQuery =  require('../utility/search').searchableQuery;
const formidable = require('formidable');

async function handle_request(msg, callback) {
if(msg.params.path === 'update_student_profile'){
    let id = msg.params.id;
    let studentProfile = await StudentProfile.findById(id);
    if(studentProfile){
      try{
        let educationDetailsData = msg.body.educationDetails;
        if(educationDetailsData){
          educationDetailsData.studentProfile = id;
          await EducationDetail.createOrUpdate(educationDetailsData);
        }
        let studentProfileData = msg.body.studentProfile;
        if(studentProfileData){
          await studentProfile.update(studentProfileData);
        }
        return callback(null, {success: true});
      }catch(error){
        callback(null, {
          success: false,
          error: error.message
        })
      }
    }else{
      callback({error: 'Record not found'});
    }
  };
}

exports.handle_request=handle_request;