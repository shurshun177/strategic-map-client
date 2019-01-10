import React from 'react';
import PropTypes from 'prop-types';
import RememberMeCheckBox from './RememberMeCheckBox';
import ForgotPassword from './ForgotPassword';

const LoginFooter = (props) => {
  return (
    <div className="login_footer">
      <RememberMeCheckBox togglCheckBox={props.togglCheckBox} check_box_img={props.check_box_img} />
      <ForgotPassword />
    </div>
  );
};

LoginFooter.propTypes = {
  check_box_img: PropTypes.string.isRequired,
  togglCheckBox: PropTypes.func.isRequired,
};

export default LoginFooter;
