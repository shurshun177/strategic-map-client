import React from "react";
import { Route } from "react-router-dom";
import App from "./App";
import MeasureDetails from './pages/Measure-details';
import VersionList from './pages/Version-list';
import MeasureList from './pages/Measure-list';
import VersionDetails from './pages/Version-details';
import VersionUpdate from './pages/Version-update';
import MeasureUpdate from './pages/Measure-update';
import VersionCopy from './pages/Version-copy';
import MeasureCopy from './pages/Measure-copy';
import AlertDialog from './pages/New-screen';
import LoginPage from './components/login/LoginPage';
import CustomizedSwitches from './pages/new';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
    typography:{
        fontSize: 18
    },
    content: {
        'margin-right': '25%'
    },
    palette: {
        background:{
            default: '#2196F3',

        },
        primary: {
            light: '#757ce8',
            main: '#2196F3',
            dark: '#002884',
            contrastText: '#fff',
            background:'#757ce8',

        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

const AppRouter =()=>{
    return (
        <MuiThemeProvider theme={theme}>

        <React.Fragment>

            <Route exact path="/" component={LoginPage} />
            <Route path="/app" component={App} />
            <Route exact path="/app/versions" component={VersionList} />
            <Route exact path="/app/measures" component={MeasureList} />
            <Route path="/app/measure-details/:id" component={MeasureDetails} />
            <Route exact path="/app/version-details/:id" component={VersionDetails} />
            <Route exact path="/app/version-update/:id" component={VersionUpdate} />
            <Route exact path="/app/measure-update/:id" component={MeasureUpdate} />
            <Route exact path="/app/version-copy/:id" component={VersionCopy} />
            <Route exact path="/app/measure-copy/:id" component={MeasureCopy} />
            <Route exact path="/app/new" component={AlertDialog} />
            <Route exact path="/app/apple-button" component={CustomizedSwitches} />
        </React.Fragment>
        </MuiThemeProvider>

    );
};

export default AppRouter;