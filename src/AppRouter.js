import React from "react";
import { Route } from "react-router-dom";
import App from "./App";
import MeasureDetails from './pages/Measure-details';
import VersionList from './pages/Version-list';
import MeasureList from './pages/Measure-list';
import VersionDetails from './pages/Version-details';

const AppRouter =()=>{
    return (
        <React.Fragment>
            <Route path="/" component={App} />
            <Route exact path="/versions" component={VersionList} />
            <Route exact path="/measure" component={MeasureList} />
            <Route exact path="/measure-details" component={MeasureDetails} />
            <Route exact path="/version-details" component={VersionDetails} />

        </React.Fragment>
    );
};

export default AppRouter;