import { gql } from 'apollo-boost';

const getjobSearchQuery= gql`
    query($input: String){
        jobs(input: $input){
        postingDate
        applicationDeadline
        location
        salary
        jobDescription
        jobCategory
        }
    }`;

const getstudentenrolledQuery= gql`
    query($student_id: String){
        student(student_id: $student_id){
            firstName
            lastName
            currentCollegeName
            city
            state
            country
            skillSet
            careerObjective
            phoneNumber
            dob
        }
    }`;
    
    
const getjobApplicantQuery= gql`
    query($student_id: String){
        student(student_id: $student_id){
            firstName
            lastName
            currentCollegeName
            city
            state
            country
            skillSet
            careerObjective
            phoneNumber
            dob
        }
    }`;

export { getjobSearchQuery, getstudentenrolledQuery, getjobApplicantQuery };