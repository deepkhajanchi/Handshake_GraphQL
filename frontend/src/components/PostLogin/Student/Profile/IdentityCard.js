import React, { useState } from 'react';
import IdentityCardShow from './IdentityCardShow';
import IdentityCardEdit from './IdentityCardEdit';

export default function IdentityCard(props) {
  const [stateObj, setstateObj] = useState({ state: 'show', studentProfile: props.studentProfile });
  const { studentProfile } = stateObj;

  if (stateObj.state === 'show') {
    return <IdentityCardShow studentProfile={studentProfile} setstateObj={setstateObj} />;
  }

  return <IdentityCardEdit studentProfile={studentProfile} setstateObj={setstateObj} />;
}
