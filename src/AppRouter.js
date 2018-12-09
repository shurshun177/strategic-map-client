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

const AppRouter =()=>{
    return (
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
    );
};

export default AppRouter;