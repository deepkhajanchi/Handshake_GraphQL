import React from 'react';
import {
  Button, Container, Row, Col,
} from 'react-bootstrap';
import RedirectToJobsPage from '../RedirectToJobsPage';

function Home() {
  return (
    <Container>
      <br />
      <br />
      {/* <RedirectToJobsPage /> */}
      <Row>
        <Col />
        <Col>
          <Row>
            <Col>
            <Button href="/signup">Sign Up</Button>
            </Col>
            <Col />
            <Col>
              <Button href="/signin">Sign In</Button>
            </Col>
          </Row>
        </Col>
        <Col />
      </Row>
    </Container>
  );
}

export default Home;
