import React from 'react';
import { Card } from 'react-bootstrap';

export default function CompanyDescription(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          About
        </Card.Title>
        <Card.Text>
          {props.companyProfile.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
