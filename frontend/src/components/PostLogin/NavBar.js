import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userLogout } from '../../redux/entry/entryActions';
import PostLoginHandshakeLogo from '../PostLoginHandshakeLogo';
import { storedUserInfo } from '../../utility';

const NavBar = (props) => {
  const handleLogout = () => {
    props.logout();
  };
  const profileId = storedUserInfo().profile._id;
  const role = storedUserInfo().type;
  const jobsLink = role === 'Student' ? '/student/job_postings' : '/company/job_postings';
  const eventsLink = `/${role}/show_all_events`;
  const profileLink = `/${role}_profile/${profileId}`;
  const applicationLink = role === 'Student' ? <Nav.Link><Link to={`/student/${profileId}/applications`}>Applications</Link></Nav.Link> : null;
  return (
    <Navbar bg="white" variant="white">
      <Navbar.Brand><Link to="#home">
        {' '}
        <PostLoginHandshakeLogo />
        </Link>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

          <Nav.Link><Link to={profileLink}>My Profile</Link></Nav.Link>
          <Nav.Link><Link to={jobsLink}>Jobs</Link></Nav.Link>
          {applicationLink}
          <Nav.Link><Link to={eventsLink}>Events</Link></Nav.Link>
          <Nav.Link><Link to="/student_profiles">Students</Link></Nav.Link>
          <Nav.Link><Link to='/messages'>Messages</Link></Nav.Link>
          <Nav.Link><Link to="#" onClick={handleLogout}>Logout</Link></Nav.Link>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapDispatchToProps = {
  logout: userLogout,
};
const ConnectedNavBar = connect(null, mapDispatchToProps)(NavBar);
export default ConnectedNavBar;
