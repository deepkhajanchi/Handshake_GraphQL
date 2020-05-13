import React, { useState } from 'react';
import {
  Card, Image, Button, Form, Modal, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import CameraSvg from '../../../svg/CameraSvg';
import { graphql } from 'react-apollo';
import {updateProfileMutation} from '../../../../mutations/mutations';
import { studentProfileSubmit } from '../../../../utility';

function IdentityCardEdit(props) {
  const [showModal, setShowModal] = useState(false);
  const [fileUploadErrorMsg, setfileUploadErrorMsg] = useState(null);
  const [profileErrorMsg, setprofileErrorMsg] = useState(null);
  const { studentProfile } = props;
  const image_path = `http://localhost:3001/images/profile_pics/${studentProfile.userId}.png?${showModal}`;

  const handleClose = (e) => setShowModal(false);
  const handleOpen = (e) => setShowModal(true);

  const handleFileUpload = (e) => {
    const formData = new FormData();
    formData.append('profilePic', e.currentTarget.form.elements.profilePic.files[0]);
    axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
axios.post(`http://localhost:3001/student_profile/${studentProfile._id}/upload_profile_pic`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((resp) => {
        if (resp.status === 200 && resp.data.success) {
          setShowModal(false);
        } else {
          setfileUploadErrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
        }
      });
  };
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      studentProfile: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        currentCollegeName: form.currentCollegeName.value,
      },
    };
    const resp = await studentProfileSubmit(formData, studentProfile._id);
    if (resp.status === 200 && resp.data.success) {
      props.setstateObj({
        state: 'show',
        studentProfile: { ...studentProfile, ...formData.studentProfile },
      });
    } else {
      setprofileErrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
    }
  };
  return (
    <Card className="text-center" fluid>
      <Card.Body>
        {profileErrorMsg}
        <Form onSubmit={handleProfileSubmit}>
          <Button variant="secondary" onClick={handleOpen}>
            <Image style={{ 'max-width': '200px', 'max-height': '200px' }} variant="center" src={image_path} roundedCircle thumbnail fluid />
            <div>
              <CameraSvg />
              <div>Edit Photo</div>
            </div>
          </Button>
          <Form.Control name="firstName" placeholder="First Name" defaultValue={studentProfile.firstName} required />
          <Form.Control name="lastName" placeholder="Last Name" defaultValue={studentProfile.lastName} required />
          <Form.Control name="currentCollegeName" placeholder="Current College Name" defaultValue={studentProfile.currentCollegeName} required />
          <Button variant="secondary" onClick={(e) => props.setstateObj({ state: 'show', studentProfile })} style={{ float: 'right' }}>
            Cancel
          </Button>
&nbsp;
          <Button variant="primary" type="submit" style={{ float: 'right' }}>
            Save
          </Button>
        </Form>
        <Modal show={showModal} onHide={handleClose}>
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {fileUploadErrorMsg}
              <Form.Group>
                <Form.Label>Browse Photos</Form.Label>
                <Form.Control type="file" name="profilePic" required accept=".png" />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleFileUpload}>
                Upload
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Card.Body>
    </Card>
  );
}

export default graphql(updateProfileMutation,{
  name: "updateProfileMutation"
})
(IdentityCardEdit);
