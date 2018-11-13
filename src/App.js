import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListView from "./components/ListView";
import AppHeader from './components/AppHeader';

import ListViewTable from './components/ListViewTable'
class App extends Component {
  componentWillUnmount() {
        document.body.style.dir = "rtl";
  }
  render() {
    return (
      <div>
        <AppHeader/>
        <ListViewTable/>
      </div>
    );
  }
}

export default App;
