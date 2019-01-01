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
//import LoginPage from './login/LoginPage';


import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    direction: 'rtl',
    typography:{
        fontSize: 16
    },
    content: {
        'margin-right': '25%'
    },
    palette: {
        background:{
            default: '#E3F2FD',

        },
        primary: {
            light: '#757ce8',
            main: '#3f50b5',
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
            <Route path="/" component={App} />

            <Route exact path="/versions" component={VersionList} />
            <Route exact path="/measures" component={MeasureList} />
            <Route path="/measure-details/:id" component={MeasureDetails} />
            <Route exact path="/version-details/:id" component={VersionDetails} />
            <Route exact path="/version-update/:id" component={VersionUpdate} />
            <Route exact path="/measure-update/:id" component={MeasureUpdate} />
            <Route exact path="/version-copy/:id" component={VersionCopy} />
            <Route exact path="/measure-copy/:id" component={MeasureCopy} />
        </React.Fragment>
        </MuiThemeProvider>

    );
};

export default AppRouter;