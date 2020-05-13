let JobPosting= require('../dbSchema/jobposting');
let CompanyProfile= require('../dbSchema/companyprofile');
let SearchableQuery= require('../utility/search').searchableQuery;

async function handle_request(msg, callback) {
    console.log(msg);
if(msg.params.path === 'create_job_posting'){
    let companyProfileId = msg.params.company_profile_id;
    let jobPostingData = msg.body;
    jobPostingData.companyProfile = companyProfileId;
    let jobPosting = new JobPosting(jobPostingData);
    jobPosting.save()
    .then(async (job_posting) =>{
      let companyProfile = await CompanyProfile.findById(companyProfileId);
      companyProfile.jobPostings.push(job_posting._id);
      await companyProfile.save();
      return job_posting;
    })
    .then(_ => {
      callback(null,{success: true});
    })
    .catch(e =>{
      callback(null,{
        success: false,
        error: e.message
      });
    })
  }
}
exports.handle_request = handle_request;