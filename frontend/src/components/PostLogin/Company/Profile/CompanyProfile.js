import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CompanyBody from './CompanyBody';
import { connect } from 'react-redux';
import {getCompanyProfile} from './../../../../redux/companyProfile/companyProfileActions';

function CompanyProfile(props) {
  const { id } = useParams();
  if (props.companyProfileResp.status === 'loading') {
    props.getCompanyProfile(id);
    return <h3>Company Profile</h3>;
  } if (props.companyProfileResp.status === 'recordNotFound') {
    return <h3>Company Profile Not Exist</h3>;
  }
  return (
    <div>
      <CompanyBody companyProfileResp={props.companyProfileResp} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  companyProfileResp: state.companyProfile.getProfile
})

export default connect(mapStateToProps,{getCompanyProfile})(CompanyProfile);
