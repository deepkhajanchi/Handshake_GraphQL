import React from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import CompanyBasicInfo from './CompanyBasicInfo';
import CompanyDescription from './CompanyDescription';
import CompanyContactInformation from './CompanyContactInformation';

export default function CompanyBody(props) {
  const { companyProfileResp } = props;

  if (companyProfileResp.status === 'loading') {
    return <h3>Company Profile</h3>;
  } if (companyProfileResp.status === 'recordNotFound') {
    return <h3>Company profile not exist</h3>;
  }

  return (
    <div>
      <Row className="my-3">
        <Col>
          <CompanyBasicInfo companyProfile={companyProfileResp.companyProfile} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col xs={9}>
          <CompanyDescription companyProfile={companyProfileResp.companyProfile} />
        </Col>
        <Col>
          <CompanyContactInformation companyProfile={companyProfileResp.companyProfile} />
        </Col>
      </Row>
    </div>
  );
}
