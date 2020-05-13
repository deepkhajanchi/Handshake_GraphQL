import React from 'react';
import {
  Card, Row, Col, Image, Button,
} from 'react-bootstrap';
import LocationSvg from '../../../svg/LocationSvg';
import EditProfileSvg from '../../../svg/EditProfileSvg';
import { storedUserInfo } from '../../../../utility';

export default function CompanyBasicInfo(props) {
  const { companyProfile } = props;
  const image_path = `http://localhost:3001/images/profile_pics/${companyProfile.user}.png`;
  let editButton = null;
  if (companyProfile._id === storedUserInfo().profile._id) {
    editButton = (
      <Button variant="link" href={`/company_profile/${companyProfile._id}/edit`} style={{ float: 'right', width: '10px' }}>
        <EditProfileSvg />
      </Button>
    );
  }
  return (
    <Card>
      <Card.Body>
        {editButton}
        <Row>
          <Col style={{ maxWidth: '100px' }}>
            <Image style={{ 'max-width': '80px', 'max-height': '80px' }} variant="center" src={image_path} thumbnail fluid />
          </Col>
          <Col>
            <Card.Title>{companyProfile.name}</Card.Title>
            <Card.Text>
              <LocationSvg />
&nbsp;
              {companyProfile.location}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
