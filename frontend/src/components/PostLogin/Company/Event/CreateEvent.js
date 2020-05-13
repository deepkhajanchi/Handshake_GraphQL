import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MAJORS } from '../../../../utility';
import { createEvent } from './../../../../redux/event/eventActions';
import {connect} from 'react-redux';

function CreateEvent(props) {
  const { companyProfileId } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = null;
    const form = e.currentTarget;
    formData = {
      companyProfileId,
      eventName: form.eventName.value,
      description: form.description.value,
      time: form.time.value,
      location: form.location.value,
      eligibility: form.eligibility.value,
    };
    props.createEvent(formData);
  };
  if (props.eventResp.success) {
    return (
      <Alert variant="success">
        Event created successfully!
      </Alert>
    );
  }
  let errTag = null;
  if (props.eventResp.error) {
    errTag = (
      <Alert variant="danger">
        {props.eventResp.error}
      </Alert>
    );
  }
  const eligibility_options = MAJORS.map((major) => <option key={major} value={major}>{major}</option>);
  return (
    <div>
      <h2>Create an Event</h2>
      {errTag}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Event name</Form.Label>
          <Form.Control type="text" name="eventName" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Event Date and Time</Form.Label>
          <Form.Control type="datetime-local" name="time" min={new Date().toISOString().split('T')[0]} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Eligibility</Form.Label>
          <Form.Control as="select" name="eligibility" required defaultValue="All">
            <option key="All" value="All">All</option>
            {eligibility_options}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => ({
   eventResp: state.event.createEvent
})
export default connect(mapStateToProps,{createEvent})(CreateEvent);
