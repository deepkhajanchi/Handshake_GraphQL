import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import { storedUserInfo } from '../../../utility';
import ShowEventsSearchResults from './ShowEventsSearchResults';
import { searchEvents } from '../../../redux/event/eventActions'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


function ShowEvents(props) {
  let perPage = 10;
  props.searchEvents(props.for,{page: 1, perPage: perPage});
  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
      page: 1,
      perPage: perPage,
      eventName: form.eventName.value,
    };
    console.dir(queryData);
    props.searchEvents(props.for,queryData);
  };

  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };

  let create_event_tag = null;
  if (props.for === 'Company') {
    create_event_tag = (
      <div>
        <Link to={`/company/${storedUserInfo().profile._id}/create_event`}>
        <Button style={{ float: 'right' }} variant="primary">Create New Event</Button>
        </Link>
        <br />
        <br />
      </div>
    );
  }
  return (
    <div>
      <Container>
        <br />
        {create_event_tag}
        <Row>
          <Col xs={3}>
            <Row className="my-3">
              <Col>
                <Card>
                  <Form inline>
                    <Card.Body>
                      <Card.Title>
                        Filters
                        <Button style={{ float: 'right' }} variant="secondary" onClick={resetForm}>Reset</Button>
                      </Card.Title>
                    </Card.Body>
                    <Card.Body class="list-group-item">
                      <Card.Text>Event Name</Card.Text>
                      <Card.Text>
                        <Form.Control type="text" name="eventName" onChange={handleOnChange} placeholder="Event Name" className="mr-sm-2" />
                      </Card.Text>
                    </Card.Body>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col>
            <ShowEventsSearchResults/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default connect(null,{searchEvents})(ShowEvents);
