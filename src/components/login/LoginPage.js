import React, { Component } from 'react';
import LoginHeader from './LoginHeader';
import LoginForm from './LoginForm';
import '../common/Login.scss';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    const loadingDone = () => {
      this.setState({ loading: false });
    };
  }

  render() {

    if (!this.state.loading) {
      return (
        <div className="main_wrapper">
          <div className="login_container">
            <div className="login_header" >
              <div className="header_img" />
            </div>
            {((bowser.chrome || bowser.chromium) && bowser.version >= 56 && bowser.windows) ? <LoginForm /> : <div className='nochrome'> Sorry this application runs on the following browsers only

                <div className="browsers">
                <a href='https://www.google.com/chrome/browser/desktop/index.html'>
                  <div className='chrome'>
                    <div className='chromeimg' />
                    <div className="browsers_text">Google Chrome</div>
                  </div>
                </a>
                <a href='http://browser.qq.com/'>
                  <div className='qq'>
                    <div className='qqimg' />
                    <div className="browsers_text">QQ 浏览器</div>
                  </div>
                </a>
              </div>
              <BuildVersion /> </div>}
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }
}

export LoginPage;
