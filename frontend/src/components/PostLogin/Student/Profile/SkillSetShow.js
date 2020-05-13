import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';

function SkillSetShow(props) {
  const skill_span_tags = (props.studentProfile.skillSet || '').split(',').map((skill) => (
    <span className="style__tag___JUqHD" title={skill}><span className=" style__content___2INbm style__children___1bmK9">{skill}</span></span>
  ));
  let editButton = null;
  if (props.studentProfile._id === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(_e) => props.setstateObj({ state: 'edit', studentProfile: props.studentProfile })} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card my-3>
      <Card.Body>
        <div>
          {editButton}
        </div>
        <Card.Title>Skills</Card.Title>
        <Card.Text>
          <div className="student-skills">
            {skill_span_tags}
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SkillSetShow;
