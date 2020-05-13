import React, { useState } from 'react';
import WorkExperience from './WorkExperience';
import { Card } from 'react-bootstrap';

export default function WorkExperiences(props) {
  const experienceDetails = (props.studentProfile.experienceDetails || []);
  let experienceDetailsTag =  experienceDetails.map(experienceDetail =>{
    return <WorkExperience experienceDetail={experienceDetail}/>
  });
  experienceDetailsTag.push(<hr />)
  experienceDetailsTag.push(<WorkExperience state='new' experienceDetail={{studentProfile: props.studentProfile._id}}/>)
  return <Card>
    <Card.Body>
      <Card.Title>Work Experience</Card.Title>
        {experienceDetailsTag}
      </Card.Body>
    </Card>
}
