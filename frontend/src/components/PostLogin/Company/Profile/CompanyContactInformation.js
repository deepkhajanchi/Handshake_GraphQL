import React from 'react';
import { Card } from 'react-bootstrap';

export default function CompanyContactInformation(props) {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          Contact Information
        </Card.Title>
        <Card.Text>
          {props.companyProfile.contactInformation}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
