import React from 'react';
import {
  Row, Col, Image, Card
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { getStudentProfiles } from '../../../redux/studentProfiles/studentProfilesActions'
import Paginate from './Pagination';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import {getstudentenrolledQuery} from '../../../queries/queries';

function AllStudentsSearchResult(props) {
  let perPage = 10
  let studentProfiles = props.studentProfiles;
  
  if (props.status === 'loading') {
    return <h2> Student Profiles</h2>;
  }
  if (props.status === 'error') {
    return <h2>Not found</h2>;
  }

  const handlePrevPage = (e) => {
    if(studentProfiles.currentPage === 1){
      return true;
    }
    props.getStudentProfiles({
      ...props.studentProfiles.queryParams,
      page: studentProfiles.currentPage - 1, 
      perPage: perPage
    });
  };
  const handleNextPage = (e) => {
    if(studentProfiles.currentPage === studentProfiles.totalPages){
      return true;
    }
    props.getStudentProfiles({
      ...studentProfiles.queryParams,
      page: studentProfiles.currentPage + 1, 
      perPage: perPage
    });
  };

  const students_tag = studentProfiles.students.map((student) => {
    const educationDetails = (student.educationDetails || [])[0] || {};
    const image_path = `http://localhost:3001/images/profile_pics/${student._id}.png`;
    const profile_path = `/student_profile/${student._id}`;
    return (
      <Card>
        <Card.Body>
          <Row>
            <Col xs={3} style={{ 'max-width': '100px', 'max-height': '100px' }}><Link to={profile_path}> <Avatar name={`${student.firstName} ${student.lastName}`} src={image_path} size={50} round="50px"/></Link></Col>
            <Col>
              <Row>
                <Col>
                  <Card.Title>
                    <Link to={profile_path}>
                      {student.firstName}
                      {' '}
                      {student.lastName}
                    </Link>
                  </Card.Title>
                  <div>{student.currentCollegeName}</div>
                  <Row>
                    <Col>
                      {educationDetails.degree}
                      ,
                      {' '}
                      {educationDetails.major}
                    </Col>
                    <Col>
                      Year of Passing&nbsp;&nbsp;
                      {educationDetails.yearOfPassing}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>    
        </Card.Body>
      </Card>
    );
  });
  let noDataTag = <h2>No results found</h2>
  if(!students_tag.length){
    return noDataTag
  }
  return (
    <div>
      {students_tag}
      <Paginate handlePrevPage={handlePrevPage} currentPage={studentProfiles.currentPage} totalPages={studentProfiles.totalPages} handleNextPage={handleNextPage}/>
    </div>
  );
}

export default graphql(getstudentenrolledQuery, {
  options: {
      variables: { student_id: localStorage.getItem("student_id") }
  }
})(AllStudentsSearchResult);