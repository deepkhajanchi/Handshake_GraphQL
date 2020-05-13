import React from 'react';
import { Card, Image, Button } from 'react-bootstrap';
import EditProfileSvg from '../../../svg/EditProfileSvg';
//
import { storedUserInfo } from '../../../../utility';
import Avatar from 'react-avatar'
import ProfileMessage from './ProfileMessage';

function IdentityCardShow(props) {
  const { studentProfile } = props;
  const educationDetails = (props.studentProfile.educationDetails || [])[0] || {};
  const image_path = `http://localhost:3001/images/profile_pics/${studentProfile.user}.png`;
  let editButton = null;
  if (studentProfile._id === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" onClick={(e) => props.setstateObj({ state: 'edit', studentProfile })} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card className="text-center" fluid>
      <Card.Body>
        <div>
          {editButton}
        </div>
        <Avatar name={`${studentProfile.firstName} ${studentProfile.lastName}`} src={image_path}/>
        {/* <Image style={{ 'max-width': '200px', 'max-height': '200px' }} variant="center" src={image_path} roundedCircle thumbnail fluid /> */}
        <Card.Title>
          {studentProfile.firstName}
          {' '}
          {studentProfile.lastName}
        </Card.Title>
        <Card.Text>{studentProfile.currentCollegeName}</Card.Text>
        <Card.Text>
          {educationDetails.degree}
          ,
          {' '}
          {educationDetails.major}
        </Card.Text>
        <Card.Text>
          Year of Passing
          {educationDetails.yearOfPassing}
        </Card.Text>
        <Card.Text>
          <ProfileMessage studentProfile={studentProfile}/>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default IdentityCardShow;
