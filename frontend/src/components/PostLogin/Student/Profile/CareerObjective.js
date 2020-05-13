import React, { useState } from 'react';
import CareerObjectiveShow from './CareerObjectiveShow';
import CareerObjectiveEdit from './CareerObjectiveEdit';

export default function CareerObjective(props) {
  const [stateObj, setstateObj] = useState({ state: 'show', studentProfile: props.studentProfile });
  const { studentProfile } = stateObj;
  if (stateObj.state === 'show') {
    return <CareerObjectiveShow studentProfile={studentProfile} setstateObj={setstateObj} />;
  }

  return <CareerObjectiveEdit studentProfile={studentProfile} setstateObj={setstateObj} />;
}
