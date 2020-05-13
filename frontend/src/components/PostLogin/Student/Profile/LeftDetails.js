import React from 'react';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import IdentityCard from './IdentityCard';
import SkillSet from './SkillSet';


export default function LeftDetails(props) {
  return (
    <Container>
      <Row className="my-3">
        <Col>
          <IdentityCard studentProfile={props.studentProfile} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <SkillSet studentProfile={props.studentProfile} />
        </Col>
      </Row>
    </Container>
  );
}
