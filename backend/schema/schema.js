const graphql= require('graphql');
var mongoose = require('mongoose');
const { C_login }= require ('../mutations/C_login');
const {updateprofile}= require ('../mutations/updateprofile');
const { jobposting}= require ('../mutations/jobposting');
const { jobapply }= require ('../mutations/jobapply');
const User= require("../dbSchema/user");
const CompanyProfile= require("../dbSchema/companyprofile");
const jobpostingschema=require ("../dbSchema/jobposting");
const studentprofileschema= require("../dbSchema/studentprofile");
const jobapplicationschema= require("../dbSchema/jobapplication");
let searchableQuery =  require('../utility/search').searchableQuery;

const{
    GraphQLID,
    GraphQLBoolean,
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLDate,
    GraphQLTime
} = graphql;

// var CompanyLogin=
// var postingJob=
// var updatingpart of profilepage=
// var job search=
// var applyinjob=
// var gettinglist of students enrolled in handshake
// var gettinglist of applicants for a job posting

const UserType= new GraphQLObjectType({
    name: 'User',
    fields:()=>({
        id:{type: GraphQLID},
        emailID: {type: GraphQLString},
        password: {type: GraphQLString},
        salt: {type: GraphQLString},
        role:{type: GraphQLString}
    })
})

const CompanyProfileType= new GraphQLObjectType({
    name: 'CompanyProfile',
    fields:()=>({
        id:{type: GraphQLID},
        name: {type: GraphQLString},
        location:{type: GraphQLString},
        description:{type: GraphQLString},
        contactInformation:{type: GraphQLString},
        jobPostings:{
            type: new GraphQLList(JobpostingType),
            resolve(parent, args){
                return parent.jobPostings;
            }
        },
        events:{
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return parent.events;
            }
        },
        user:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return parent.user;
            }
        }
        // messageWindows:{
        //     type: new GraphQLList(MessageWindowType),
        //     resolve(parent, args){
        //         return parent.messageWindows;
        //     }
        // },
        
    })
})

const JobpostingType= new GraphQLObjectType({
    name:'Jobposting',
    fields:()=>({
        id:{type: GraphQLID},
        jobTitle:{type:GraphQLString},
        postingDate:{type:GraphQLString},
        applicationDeadline:{type: GraphQLString},
        location:{type: GraphQLString},
        salary:{type: GraphQLString},
        jobDescription:{type: GraphQLString},
        jobCategory: {type: GraphQLString},
        companyProfile:{
            type: new GraphQLList(CompanyProfileType),
            resolve(parent, args){
                return parent.companyProfile; 
        }
    },
        jobApplications:{
            type: new GraphQLList(JobApplicationType),
            resolve(parent, args){
                return parent.jobApplications; 
            }
        },
    })
});

const StudentProfileType= new GraphQLObjectType({
    name: 'Studentprofile',
    fields:()=>({
        id:{type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        currentCollegeName: {type: GraphQLString},
        city:{type: GraphQLString},
        state:{type: GraphQLString},
        country:{type: GraphQLString},
        skillSet:{type: GraphQLString},
        careerObjective:{type: GraphQLString},
        phoneNumber:{type: GraphQLString},
        dob:{ type: GraphQLString},
        user: {
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return parent.user;
            }
        },
        educationDetails:{
            type: new GraphQLList(EducationDetailsType),
            resolve(parent, args){
                return parent.educationDetails;
            }
        },
          experienceDetails:{
            type: new GraphQLList(ExperienceDetailsType),
            resolve(parent, args){
              return parent.experienceDetails;
          }
        },
          jobApplications: {
            type: new GraphQLList(JobApplicationType),
            resolve(parent, args){
                return parent.jobApplications;
            }
        },
        //   messageWindows: {
        //       type: new GraphQLList(MessageWindowType),
        //       resolve(parent,args){
        //           return parent.messageWindows;
        //       }
        //   }
    })
})

const EducationDetailsType= new GraphQLObjectType({
    name: 'Educationdetails',
    fields:()=>({
        id:{type: GraphQLID},
        collegeName: {type: GraphQLString},
          collegeLocation: {type: GraphQLString},
          degree:{type: GraphQLString},
          major: {type: GraphQLString},
          yearOfPassing: { type: GraphQLInt},
          currentCgpa: {type: GraphQLInt},
          highestDegree: {type: GraphQLBoolean},
          studentProfile: {
            type: new GraphQLList(StudentProfileType),
            resolve(parent, args){
                return parent.studentProfile; 
        }
    }
    })
})

const EventType= new GraphQLObjectType({
    name: 'Events',
    fields:()=>({
        id:{type: GraphQLID},
        eventName: {type: GraphQLString},
        description: {type: GraphQLString},
        time: {type: GraphQLString},
        location: {type: GraphQLString},
        eligibility: {type: GraphQLString},
        companyProfile: {
            type: new GraphQLList(CompanyProfileType),
            resolve(parent, args){
                 return parent.companyProfile; 
            }
        },
        eventRegistrations: {
            type: new GraphQLList(EventRegistrationType),
            resolve(arent, args){
            return parent.eventRegistrations; 
            }
        }
    })
})

const EventRegistrationType= new GraphQLObjectType({
    name: 'EventRegistration',
    fields:()=>({
        id:{type: GraphQLID},
        event: {
            type: new GraphQLList(EventType),
            resolve(parent, args){
                return parent.event;
            }
        },
          studentProfile: {
            type: new GraphQLList(StudentProfileType),
            resolve(parent, args){
                return parent.studentProfile; 
        }
    }   
    })
})

const ExperienceDetailsType= new GraphQLObjectType({
    name: 'Experiencedetails',
    fields:()=>({
        id:{type: GraphQLID},
        companyName: {type: GraphQLString},
          title: {type: GraphQLString},
          companyLocation: {type: GraphQLString},
          startDate: {type: GraphQLString},
          endDate: {type: GraphQLString},
          workDescription: {type: GraphQLString},
          studentProfile: {
            type: new GraphQLList(StudentProfileType),
            resolve(parent, args){
                return parent.studentProfile; 
        }
    }   
    })
})

const JobApplicationType= new GraphQLObjectType({
    name: 'JobApplication',
    fields:()=>({
        id:{type: GraphQLID},
        resumePath:  {type: GraphQLString},
          status:  {type: GraphQLString},
          studentProfile: {
            type: new GraphQLList(StudentProfileType),
            resolve(parent, args){
                return parent.studentProfile; 
        }
    },   
          jobPosting: {
            type: new GraphQLList(JobpostingType),
            resolve(parent, args){
                return parent.jobPosting;
            }
        }
    })
})

const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        status: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

const RootQuery= new GraphQLObjectType({
    name :'RootQueryType',
    fields:{
        jobsearch:{
            type: JobpostingType,
            args:{id:{type:GraphQLID}},
            async resolve(parent,args){
                let  job_search= await jobpostingschema.find(id === args.id).populate('companyProfile');      
                if(job_search){
                    callback(null,job_search);
                }else{
                    callback(null,{error: "record not found"})
                }
            }
            
        },

        studentsenrolled:{
            type: StudentProfileType,
            args:{id:{type: GraphQLID}},
            
            async resolve(parent,args){
                let query_params = msg.query;
                let page = parseInt(query_params.page || 1) - 1;
                let perPage = parseInt(query_params.perPage || 10);
                delete query_params.page;
                delete query_params.perPage;
                let educationDetails_query = query_params.educationDetails || null;
                delete query_params.educationDetails;
                let studentProfileQuery = searchableQuery(query_params);
                let educationDetailsQuery = searchableQuery(JSON.parse(educationDetails_query));
                let totalRecordCount= await studentprofileschema.find(studentProfileQuery).count();
                studentprofileschema.find(studentProfileQuery)
                .populate('educationDetails')
                .populate('experienceDetails')
                .skip(page>-1 ? page*perPage :0)
                .limit(perPage)
                .then(studentProfiles=>{
                    if(Object.keys(educationDetailsQuery).length > 0) {
                        studentProfiles = studentProfiles.filter(profile =>{
                          let educationDetail = profile.educationDetails[0];
                          if(!educationDetail){
                            return false;
                          }
                          let match = false;
                          for(let [col_name,col_val] of Object.entries(educationDetailsQuery)){
                            match = educationDetail[col_name].match(col_val.$regex);
                          }
                          return match;
                        });
                      }
                      return callback(null, {totalRecordCount: totalRecordCount, data: studentProfiles});
                    }).catch(e => {
                      return callback(null, {error: e})
                    })
                  }
                },
        jobapplicant:{
            type:JobApplicationType,
            args:{id:{type:GraphQLID}},

            async resolve(parent,args){
                let {studentProfileId} = msg.params;
            let queryParams = msg.query;
            let page = parseInt(queryParams.page || 1) - 1;
            let perPage = parseInt(queryParams.perPage || 10);
            delete queryParams.page;
            delete queryParams.perPage;
            queryParams = searchableQuery(queryParams);
            let totalRecords = await jobapplicationschema.find({
            ...queryParams,
            studentProfile: studentProfileId
            }).count();
            jobapplicationschema.find({
            ...queryParams,
            studentProfile: studentProfileId
            })
            .populate('jobPosting')
            .skip(page > -1 ? page*perPage : 0)
            .limit(perPage)
            .then(jobPostings => {
            callback(null,{data: jobPostings,totalRecords: totalRecords});
            })
            .catch(e => {
                callback(null,{error: e})
            })
            }
            
        }
       
    }
})

const Mutation= new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        C_login:{
            type: StatusType,
            args:{
                emailID:{type: GraphQLString},
                password:{type: GraphQLString}
            },
            resolve(parent, args){
                return C_login(args);
            }
        },
        updateprofile:{
            type: StatusType,
            args:{
                firstName: {type: GraphQLString},
                lastName: {type: GraphQLString},
                currentCollegeName: {type: GraphQLString},
                city:{type: GraphQLString},
                state:{type: GraphQLString},
                country:{type: GraphQLString},
                skillSet:{type: GraphQLString},
                careerObjective:{type: GraphQLString},
                phoneNumber:{type: GraphQLString},
                dob:{ type: GraphQLString},
            },
            resolve(parent, args){
                return updateprofile(args);
            }
        },

        jobposting:{
            type:StatusType,
            args:{
                jobTitle:{type:GraphQLString},
                postingDate:{type:GraphQLString},
                applicationDeadline:{type: GraphQLString},
                location:{type: GraphQLString},
                salary:{type: GraphQLString},
                jobDescription:{type: GraphQLString},
                jobCategory: {type: GraphQLString}
            },
            async resolve(parent,args){
                return jobposting(args);
            }
        },

        jobapply:{
            type: StatusType,
            args:{
                resumePath:  {type: GraphQLString}
            },
            async resolve(parent,args){
                return jobapply(args);
            }
        }
    }
});

module.exports= new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});