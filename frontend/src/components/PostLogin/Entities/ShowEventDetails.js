import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Row, Col, Card, Container,
} from 'react-bootstrap';
import LocationSvg from '../../svg/LocationSvg';
import {connect} from 'react-redux';
import {getEventDetails} from './../../../redux/event/eventActions';


function ShowEventDetails(props) {
  const { id: eventId } = useParams();
  if (props.eventResp.status === 'loading') {
    props.getEventDetails(eventId)
  }
  if (props.eventResp.status === 'loading') {
    return <h3>Event Details</h3>;
  } if (props.eventResp.status === 'error') {
    return <h3>Details not exists</h3>;
  }

  const eventDetails = props.eventResp.data;
  return (
    <Container>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{eventDetails.eventName}</Card.Title>
              <Card.Text>{eventDetails.readableTime}</Card.Text>
              <Card.Text>
                <LocationSvg />
&nbsp;
                {eventDetails.location}
              </Card.Text>
              <Card.Text>
                Eligible for :
                {eventDetails.eligibility}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="m-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Event Description</Card.Title>
              <Card.Text>{eventDetails.description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

const mapStateToProp = (state) =>({
  eventResp: state.event.eventDetails
});

export default connect(mapStateToProp,{getEventDetails})(ShowEventDetails);
