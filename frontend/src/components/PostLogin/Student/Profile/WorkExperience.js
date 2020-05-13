import React, { useState } from 'react';
import WorkExperienceShow from './WorkExperienceShow';
import WorkExperienceEdit from './WorkExperienceEdit';
import { Button } from 'react-bootstrap';

export default function WorkExperience(props) {
  const [stateObj, setstateObj] = useState({ state: props.state || 'show', experienceDetail: props.experienceDetail });
  if (stateObj.state === 'show') {
    return <WorkExperienceShow experienceDetail={stateObj.experienceDetail} setstateObj={setstateObj} />;
  }
  if(stateObj.state === 'edit'){
    return <WorkExperienceEdit experienceDetail={stateObj.experienceDetail} setstateObj={setstateObj} />;
  }
  if(stateObj.state === 'deleted'){
    return null;
  }
  if(stateObj.state === 'new'){
    return <Button variant="light" block onClick={e => setstateObj({
        state: 'edit',
        experienceDetail: props.experienceDetail
      })}>
      Add Work Experience
    </Button>
  }
}
