import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';
import Home from './components/Prelogin/Home';
import SignIn from './components/Prelogin/SignIn';
import SignUp from './components/Prelogin/SignUp';
import StudentSignUp from './components/Prelogin/StudentSignUp';
import CompanySignUp from './components/Prelogin/CompanySignUp';
import Header from './components/Header';
import StudentProfile from './components/PostLogin/Student/Profile/StudentProfile';
import CompanyProfile from './components/PostLogin/Company/Profile/CompanyProfile';
import CompanyProfileEdit from './components/PostLogin/Company/Profile/CompanyProfileEdit';
import JobPostingShow from './components/PostLogin/Student/Jobs/JobPostingShow';
import JobPostingCreate from './components/PostLogin/Company/Jobs/JobPostingCreate';
import JobPostingsAll from './components/PostLogin/Student/Jobs/JobPostingsAll';
import CompanyJobPostings from './components/PostLogin/Company/Jobs/CompanyJobPostings';
import ShowEventDetails from './components/PostLogin/Entities/ShowEventDetails';
import StudentJobApplications from './components/PostLogin/Student/Applications/StudentJobApplications';
import ShowMessages from './components/PostLogin/Entities/message/ShowMessages';

import {
  PrivateRoute, PrivateCompanyRoute, PrivateOwnCompanyRoute, PrivateStudentRoute, PrivateOwnStudentRoute,
} from './PrivateRoutes';
import ApplyForJobForm from './components/PostLogin/Student/Jobs/ApplyForJobForm';
import AllJobApplications from './components/PostLogin/Company/Jobs/AllJobApplications';
import CreateEvent from './components/PostLogin/Company/Event/CreateEvent';
import ShowEvents from './components/PostLogin/Entities/ShowEvents';
import StudentsRegisteredForEvent from './components/PostLogin/Company/Event/StudentsRegisteredForEvent';
import AllStudents from './components/PostLogin/Entities/AllStudents';


function App({ userInfo }) {
  return (
    <Router>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div className="App">
        <Container>
          <Header userInfo={userInfo} />
          <Switch>
            {/* SignUp and Registrations */}
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/student_signup" component={StudentSignUp} />
            <Route exact path="/company_signup" component={CompanySignUp} />

            {/* Student and company profiles */}
            <PrivateRoute exact path="/student_profiles" component={AllStudents} />
            <PrivateRoute exact path="/student_profile/:id" component={StudentProfile} />
            <PrivateRoute exact path="/company_profile/:id" component={CompanyProfile} />
            <PrivateOwnCompanyRoute exact path="/company_profile/:companyProfileId/edit" component={CompanyProfileEdit} />

            {/* Job postings */}
            <PrivateRoute exect path="/job_postings/:id" component={JobPostingShow} />
            <PrivateRoute exect path="/company/job_postings" component={CompanyJobPostings} />
            <PrivateRoute exect path="/student/job_postings" component={JobPostingsAll} />
            <PrivateOwnStudentRoute exect path="/student/:studentProfileId/job_postings/:id/apply" component={ApplyForJobForm} />
            <PrivateOwnCompanyRoute exect path="/company/:companyProfileId/create/job_postings" component={JobPostingCreate} />
            <PrivateOwnCompanyRoute exact path="/:companyProfileId/job_postings/:id/job_applications" component={AllJobApplications} />
            <PrivateOwnCompanyRoute exact path="/company/:companyProfileId/create_event" component={CreateEvent} />
            <PrivateStudentRoute exact path="/student/show_all_events" component={() => <ShowEvents for="Student" />} />
            <PrivateCompanyRoute exact path="/company/show_all_events" component={() => <ShowEvents for="Company" />} />
            <PrivateRoute exect path="/events/show/:id" component={ShowEventDetails} />
            <PrivateCompanyRoute exact path="/company/events/:id/students" component={StudentsRegisteredForEvent} />
            <PrivateOwnStudentRoute exact path="/student/:studentProfileId/applications" component={StudentJobApplications} />
            <PrivateRoute exect path="/messages" component={ShowMessages} />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}
const mapStateToProps = (state) => ({ 
  userInfo: state.user.userInfo 
});
const ConnectedApp = connect(mapStateToProps)(App);
export default ConnectedApp;
