import React from 'react';
import { mount } from 'enzyme';
import IdentityCard from './IdentityCard';

it('should render correctly', () => {
  sessionStorage.setItem('userInfo','{"id":8,"type":"Student","profile":{"id":2,"firstName":"Andy","lastName":"Flower","currentCollegeName":"SFSU","city":"San Francisco","state":"CA","country":"USA","skillSet":"AJAX,CSS,Front end, Backend,ReactJs,AngularJs","careerObjective":"Hello there, I am Andy Flower. My focus is machine learnig and artificial intelligence. I ave done severl ML projects based on neural networks.","phoneNumber":"123-456-7891","dob":"2020-02-18","createdAt":"2020-04-05T04:24:51.000Z","updatedAt":"2020-04-17T19:32:46.000Z","userId":8}}');
  let studentProfile = {
    "id": 2,
    "firstName": "Mat",
    "lastName": "Prior",
    "collegeName": "SFSU",
    "userId": 9,
    "educationDetails": [
        {
            "collegeName": "Stonybrook",
            "location": "Mew York",
            "degree": "Masters",
            "major": "Data Science",
            "yearOfPassing": 2023,
            "currentCgpa": 3.7,
            "highestDegree": true,
            "studentProfileId": 2,
        }
    ],
  }
  const component = mount(<IdentityCard studentProfile={studentProfile}/>);
  expect(component).toMatchSnapshot();
});