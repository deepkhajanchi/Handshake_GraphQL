import React, { useState } from 'react';
import {
  Modal, Badge, Button, Form,
} from 'react-bootstrap';
import axios from 'axios';
import {changeJobApplicationStatus} from '../../../../redux/companyJob/companyJobActions'
import { connect } from 'react-redux';

function JobApplicationStatus(props) {
  const status = props.status;
  const [showModel, setshowModel] = useState(false);
  const variant = {
    Pending: 'primary',
    Reviewed: 'success',
    Declined: 'danger',
  };

  const changeStatus = () => {
    setshowModel(true);
  };

  const handleClose = () => {
    setshowModel(false);
  };
  const submitStatus = (e) => {
    e.preventDefault();
    const formData = { status: e.currentTarget.elements.status.value };
    props.changeJobApplicationStatus(props.jobApplication._id,formData);
    setshowModel(false);
  };
  let change = null;
  if (status === 'Pending') {
    change = <Button variant="link" onClick={changeStatus}>Change</Button>;
  }
  return (
    <div>
      <b>Status:</b>
      {' '}
      <Badge variant={variant[status]}>{status}</Badge>
      {change}
      <Modal show={showModel} onHide={handleClose} className="modal-70w">
        <Form onSubmit={submitStatus}>
          <Modal.Header closeButton>
            <Modal.Title>Change Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Check inline label="Reviewed" type="radio" name="status" value="Reviewed" />
            <Form.Check inline label="Declined" type="radio" name="status" value="Declined" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

const mapStateToProps = function(state, ownProps){
  let jobApplication = state.companyJob.allJobApplictions.jobApplications.find(jobApplication =>{
    if(jobApplication._id === ownProps.jobApplication._id){
      return true;
    }
  })
  return ({
    status: jobApplication.status,
  })
}
export default connect(mapStateToProps,{changeJobApplicationStatus})(JobApplicationStatus);
