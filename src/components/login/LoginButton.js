import React from 'react';
import PropTypes from 'prop-types';

const LoginButton = (props) => {
  return (
    <button className="log_in_button" onClick={props.onSubmit}>('login_page.login)</button>
  );
};

LoginButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginButton;
