import React, { useState } from 'react';
import SkillSetShow from './SkillSetShow';
import SkillSetEdit from './SkillSetEdit';

export default function SkillSet(props) {
  const [stateObj, setstateObj] = useState({ state: 'edit', studentProfile: props.studentProfile });
  const { studentProfile } = stateObj;

  if (stateObj.state === 'show') {
    return <SkillSetShow studentProfile={studentProfile} setstateObj={setstateObj} />;
  }

  return <SkillSetEdit studentProfile={studentProfile} setstateObj={setstateObj} />;
}
