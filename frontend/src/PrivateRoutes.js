import React from 'react';
import { Route, Redirect } from 'react-router';
import {
  isLoggedIn, isStudent, isCompany, storedUserInfo,
} from './utility';

export const PrivateStudentRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      const authentic_user = isLoggedIn() && isStudent();
      if (authentic_user) {
        return <Component {...props} />;
      }
      console.log('Not authorized to go this url');
      return <Redirect to="/signin" />;
    }}
  />
);

export const PrivateOwnStudentRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      const authentic_user = isLoggedIn() && isStudent() && storedUserInfo().profile._id === props.match.params.studentProfileId;
      if (authentic_user) {
        return <Component {...props} />;
      }
      console.log('Not authorized to go this url');
      return <Redirect to="/signin" />;
    }}
  />
);

export const PrivateCompanyRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      const authentic_user = isLoggedIn() && isCompany();
      if (authentic_user) {
        return <Component {...props} />;
      }
      console.log('Not authorized to go this url');
      return <Redirect to="/signin" />;
    }}
  />
);

export const PrivateOwnCompanyRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      const authentic_user = isLoggedIn() && isCompany() && storedUserInfo().profile._id === props.match.params.companyProfileId;
      if (authentic_user) {
        return <Component {...props} />;
      }
      console.log('Not authorized to go this url');
      return <Redirect to="/signin" />;
    }}
  />
);

export const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => (
      isLoggedIn() ? <Component {...props} /> : <Redirect to="/signin" />
    )}
  />
);
