import { gql } from 'apollo-boost';

const loginMutation = gql`
    mutation login($emailID: String, $password: String){
        login(emailID: $emailID, password: $password){
            message
            status
        }
    }`;

const updateProfileMutation = gql`
    mutation updateProfile($firstName: String, $lastName: String, $currentCollegeName: String, $city: String, $state: String, $country: String, $skillSet: String, $careerObjective: String, $phoneNumber: String, $dob:String, educationDetails: educationDetails, experienceDetail: experienceDetails){
        updateCustomer($firstName: String, $lastName: String, $currentCollegeName: String, $city: String, $state: String, $country: String, $skillSet: String, $careerObjective: String, $phoneNumber: String, $dob:String, educationDetails: educationDetails, experienceDetail: experienceDetails){
            message
            status
        }
    }`;

const jopapplymutation=gql`
    mutation jobapply($resumePath: String){
        jobapply($resumePath: String){
            message
            status
        }
    }`;

const jobpostingMutation=gql`
    mutation jobposting($jobTitle: String, $postingDate: String, $applicationDeadline: Strinig, $jobCategory: String, $location:String, $salary: String, $jobDescription: String ){
        jobposting($jobTitle: String, $postingDate: String, $applicationDeadline: Strinig, $jobCategory: String, $location:String, $salary: String, $jobDescription: String){
            message
            status
        }
    }`;    

export {loginMutation, updateProfileMutation, jopapplymutation, jobpostingMutation};