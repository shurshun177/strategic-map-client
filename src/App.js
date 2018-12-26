import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import ListView from "./components/ListView";
import AppHeader from './components/AppHeader';
import ContainedButtons from './components/ContainedButtons';


import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import RTL from './components/RTL';
import ListViewTable from './components/ListViewTable'


const theme = createMuiTheme({
    direction: 'rtl',
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
                <AppHeader/>

              </MuiThemeProvider>
          </RTL>
      </div>
    );
  }
}

export default App;
