import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InputWrapper from './InputWrapper';
import LoginButton from './LoginButton';
import LoginFooter from './LoginFooter';
import FlashError from '../common/FlashError';
import BuildVersion from '../common/BuildVersion';
import * as loginAction from '../../actions/login_actions';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      email:"",
      remember_me: false
     };
  }

  onUserInputChange = (e) => {
    this.setState({ email: e.target.value });
  }

  onPasswordInputChange = (e) => {
    this.setState({ password: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.actions.onSubmit(this.state);
  };

  togglCheckBox = (e) => {
    this.setState({ remember_me: !this.state.remember_me });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="user_input_container">
          <div className="user_input_wraper">
            <InputWrapper
              input_type="text"
              img_src="/images/LoginUsername.svg"
              placeholder_text={'username'}
              onInputChange={this.onUserInputChange}
            />
            <InputWrapper
              input_type="password"
              img_src="/images/LoginPassword.svg"
              placeholder_text={'password'}
              onInputChange={this.onPasswordInputChange}
            />
            <LoginButton onSubmit={this.onSubmit} />
            <LoginFooter
              togglCheckBox={this.togglCheckBox}
              check_box_img={this.state.remember_me ? '/images/remember_me_checked.png' : '/images/remember_me.png'}
            />
            <FlashError message={this.props.login.errors} />
          </div>
          <BuildVersion />
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(loginAction, dispatch),
  };
};

LoginForm.propTypes = {
  login: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
