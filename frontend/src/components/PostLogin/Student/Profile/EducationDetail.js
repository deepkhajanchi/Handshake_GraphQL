import React, { useState } from 'react';
import EducationDetailsShow from './EducationDetailsShow';
import EducationDetailsEdit from './EducationDetailsEdit';
import { Button } from 'react-bootstrap';

export default function EducationDetail(props) {
  const [stateObj, setstateObj] = useState({ state: props.state || 'show', educationDetail: props.educationDetail });
  if (stateObj.state === 'show') {
    return <EducationDetailsShow educationDetail={stateObj.educationDetail} setstateObj={setstateObj} />;
  }
  if(stateObj.state === 'edit'){
    return <EducationDetailsEdit educationDetail={stateObj.educationDetail} setstateObj={setstateObj} />;
  }
  if(stateObj.state === 'deleted'){
    return null;
  }
  if(stateObj.state === 'new'){
    return <Button variant="light" block onClick={e => setstateObj({
        state: 'edit',
        educationDetail: props.educationDetail
      })}>
      Add School
    </Button>
  }
}
