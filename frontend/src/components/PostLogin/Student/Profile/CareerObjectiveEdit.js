import React, { useState } from 'react';
import {
  Form, Button, Card, Alert,
} from 'react-bootstrap';
import { graphql } from 'react-apollo';
import {updateProfileMutation} from '../../../../mutations/mutations';
import { studentProfileSubmit } from '../../../../utility';

function CareerObjectiveEdit(props) {
  const [errorMsg, seterrorMsg] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      studentProfile: {
        careerObjective: form.careerObjective.value,
      },
    };
    const resp = await studentProfileSubmit(formData, props.studentProfile._id);
    if (resp.status === 200 && resp.data.success) {
      props.setstateObj({
        state: 'show',
        studentProfile: { ...props.studentProfile, ...formData.studentProfile },
      });
    } else {
      seterrorMsg(<Alert variant="danger">{resp.data.error}</Alert>);
    }
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>My Journey</Card.Title>
        {errorMsg}
        <Form onSubmit={handleOnSubmit}>
          <Card.Text>
            <Form.Label>What are you passionate about? What are you looking for on Handshake? What are your experiences or skills?</Form.Label>
            <Form.Control as="textarea" name="careerObjective" defaultValue={props.studentProfile.careerObjective} />
          </Card.Text>
          <Card.Text style={{ textAlign: 'right' }}>
            <Button variant="secondary" onClick={(_e) => props.setstateObj({ state: 'show', studentProfile: props.studentProfile })}>Cancel</Button>
&nbsp;
            <Button variant="primary" type="submit">Update</Button>
&nbsp;
          </Card.Text>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default graphql(updateProfileMutation,{
  name: "updateProfileMutation"
})(CareerObjectiveEdit);
