import React from 'react';
import PreLoginHandShakeLogoSvg from './svg/PreLoginHandShakeLogoSvg';
import '../Styles/registration.css';
import { Link } from 'react-router-dom';
import NavBar from './PostLogin/NavBar';

const Header = ({ userInfo }) => {
  if (userInfo) {
    return <NavBar />;
  }
  return (
    <div className="prelogin-header">
      <Link to="/">
        <PreLoginHandShakeLogoSvg />
      </Link>
    </div>
  );
};

export default Header;
