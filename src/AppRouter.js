import React from "react";
import { Route } from "react-router-dom";
import App from "./App";
import MeasureDetails from './pages/Measure-details';
import VersionList from './pages/Version-list';
import MeasureList from './pages/Measure-list';
import VersionDetails from './pages/Version-details';
import VersionUpdate from './pages/Version-update';

const AppRouter =()=>{
    return (
        <React.Fragment>
            <Route path="/" component={App} />
            <Route exact path="/versions" component={VersionList} />
            <Route exact path="/measures" component={MeasureList} />
            <Route path="/measure-details/:id" component={MeasureDetails} />
            <Route exact path="/version-details/:id" component={VersionDetails} />
            <Route exact path="/version-update/:id" component={VersionUpdate} />
        </React.Fragment>
    );
};

export default AppRouter;