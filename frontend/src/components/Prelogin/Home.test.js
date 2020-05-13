import React from 'react';
import { mount } from 'enzyme';
import Home from './Home';

it('should render correctly', () => {
  sessionStorage.setItem('userInfo','{"id":5,"type":"Student","profile":{"id":2,"firstName":"Heally","lastName":"Dough","currentCollegeName":"SUNY Albany","city":"New York","state":"CA","country":"USA","skillSet":"Machine Learning, Deep Learning, Model testing","careerObjective":"Hello, I am a Software Engineering Masters student with 5.5 years of field experience in the Artificial Intelligence and Machine Learning. I want to contribute to society through my skill and passion towards latest technologies in nueral networks. Professionally, I have worked on several projects at SUNY ALbany, black box testing and model based white box testing. These projects allowed me to demonstrate my talent machine learning domain. I am currently looking for full time positions using my skills. I am available from August 2019 and I look forward to working with you on my next big project.","phoneNumber":"123-456-7891","dob":"2020-02-18","createdAt":"2020-03-18T04:24:51.000Z","updatedAt":"2020-03-21T19:32:46.000Z","userId":5}}');
  let studentProfile = {
    "id": 3,
    "firstName": "Robert",
    "lastName": "Matt",
    "collegeName": "San Jose State University",
    "userId": 10,
    "educationDetails": [
        {
            "collegeName": "Florida Tech University",
            "location": "San Jose",
            "degree": "Masters",
            "major": "Aeronautics",
            "yearOfPassing": 2022,
            "currentCgpa": 3.8,
            "highestDegree": true,
            "studentProfileId": 3,
        }
    ],
  }
  const component = mount(<Home studentProfile={studentProfile}/>);
  expect(component).toMatchSnapshot();
});