import React, { Component } from 'react';
import AppHeader from './components/AppHeader';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import RTL from './components/RTL';


const theme = createMuiTheme({
    direction: 'rtl',

    typography: {
        fontSize: 14,
        //fontColor:
    },
    palette: {
        type: 'light'
    },

});

class App extends Component {
  componentDidMount() {
        document.body.dir = "rtl";
  }
  render() {
    return (
      <div>
          <RTL>
              <MuiThemeProvider theme={theme}>
                <AppHeader isLoggedIn={this.props.location.state.isLoggedIn}/>
              </MuiThemeProvider>
          </RTL>
      </div>
    );
  }
}

export default App;
