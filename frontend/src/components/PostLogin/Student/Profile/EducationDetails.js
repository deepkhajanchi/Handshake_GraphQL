import React from 'react';
import EducationDetail from './EducationDetail';
import { Card } from 'react-bootstrap';

export default function EducationDetails(props) {
  const educationDetails = (props.studentProfile.educationDetails || []);
  let educationDetailsTag =  educationDetails.map(educationDetail =>{
    return <EducationDetail educationDetail={educationDetail}/>
  });
  educationDetailsTag.push(<hr />)
  educationDetailsTag.push(<EducationDetail state='new' educationDetail={{studentProfile: props.studentProfile._id}}/>)
  return <Card>
    <Card.Body>
      <Card.Title>Education</Card.Title>
        {educationDetailsTag}
      </Card.Body>
    </Card>
}
