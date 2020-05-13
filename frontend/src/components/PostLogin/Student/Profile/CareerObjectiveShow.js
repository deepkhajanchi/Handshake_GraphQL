import React from 'react';
import { Card, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';

function CareerObjectiveShow(props) {
  let editButton = null;
  if (props.studentProfile._id === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(e) => props.setstateObj({ state: 'edit', studentProfile: props.studentProfile })} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card>
      <Card.Body>
        <div>
          {editButton}
        </div>
        <Card.Title>My Journey</Card.Title>
        <Card.Text>{props.studentProfile.careerObjective}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CareerObjectiveShow;
