import React from 'react';
import {
  Container, Row, Col, Image, Card, Form, Button
} from 'react-bootstrap';
import { MAJORS } from '../../../utility';
import {connect} from 'react-redux';
import { getStudentProfiles } from './../../../redux/studentProfiles/studentProfilesActions'
import AllStudentsSearchResult from './AllStudentsSearchResult';

function AllStudents(props) {
  let perPage = 10;
    props.getStudentProfiles({page: 1, perPage: perPage});

  const handleOnChange = (e) => {
    const { form } = e.currentTarget;
    const queryData = {
      page: 1,
      perPage: perPage,
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      currentCollegeName: form.currentCollegeName.value,
      skillSet: form.skillSet.value,
      educationDetails: {
        major: form.major.value,
      },
    };
    props.getStudentProfiles(queryData);
  };


  const resetForm = (e) => {
    e.currentTarget.form.reset();
    handleOnChange(e);
  };
  const majorOptions = MAJORS.map((major) => <option key={major} value={major}>{major}</option>);
  return (
    <Container>
      <Row>
        <Col xs={3}>
          <Row className="my-3">
            <Col>
              <Card>
                <Form id='search-student-form'>
                  <Card.Body>
                    <Card.Title>
                      Filters
                      <Button style={{ float: 'right' }} onClick={resetForm} variant="secondary">Reset</Button>
                    </Card.Title>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Name</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="firstName" onChange={handleOnChange} placeholder="First Name" className="mr-sm-2" />
                    </Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="lastName" onChange={handleOnChange} placeholder="Last Name" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>College Name</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="currentCollegeName" onChange={handleOnChange} placeholder="College Name" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Skill Set</Card.Text>
                    <Card.Text>
                      <Form.Control type="text" name="skillSet" onChange={handleOnChange} placeholder="Skill Set" className="mr-sm-2" />
                    </Card.Text>
                  </Card.Body>
                  <Card.Body class="list-group-item">
                    <Card.Text>Major</Card.Text>
                    <Card.Text>
                      <Form.Control as="select" name="major" placeholder="selectMajor" onChange={handleOnChange} className="mr-sm-2" style={{ width: '100%' }}>
                        <option key="" value="">All</option>
                        {majorOptions}
                      </Form.Control>
                    </Card.Text>
                  </Card.Body>
                </Form>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
        <Row className="my-3">
          <Col>
            <AllStudentsSearchResult />
          </Col>
        </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default connect(null,{getStudentProfiles})(AllStudents);
