import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { storedUserInfo } from '../../../../utility';
import {Link} from 'react-router-dom';
import ApplyForJobForm from './ApplyForJobForm';
//import {getJobPostingAppliedStatus} from './../../../../redux/jobPosting/jobPostingActions'
//import { connect } from 'react-redux';
import { graphql } from 'react-apollo';
import {jopapplymutation} from '../../mutations/mutations';

function ApplyForJobButton(props) {
  const usrInfo = storedUserInfo();
  const status = props.status;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (status === null) {
    props.getJobPostingAppliedStatus(props.jobPostingId)
  }
  if(usrInfo.type === 'Company'){
    return null;
  }
  if (status === null) {
    return null;
  }
  if (status === 'Not Applied') {
    return <div>
      <Button variant="primary" onClick={handleShow}>
        Apply
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body><ApplyForJobForm studentProfileId={usrInfo.profile._id} jobProfileId={props.jobPostingId}/></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
  return (
    <div>
      <Button variant="primary">{status}</Button>
    </div>
  );
}
export default graphql(jopapplymutation,{
  name: "jobapplymutation"
})(ApplyForJobButton);
