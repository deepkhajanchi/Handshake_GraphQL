import React from 'react';
import { Route } from 'react-router-dom';
import PreLoginHeader from './PreLoginHeader';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import StudentSignUp from './StudentSignUp';
import CompanySignUp from './CompanySignUp';

function PreLoginMain() {
  return (
    <div className="prelogin-main">
      <PreLoginHeader />
      <Route exact path="/" component={Home} />
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/student_signup" component={StudentSignUp} />
      <Route exact path="/company_signup" component={CompanySignUp} />
    </div>
  );
}
export default PreLoginMain;
