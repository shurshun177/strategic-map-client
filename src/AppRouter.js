import React from "react";
import { Route } from "react-router-dom";
import App from "./App";
import MeasureDetails from './pages/Measure-details';
import VersionList from './pages/Version-list';

const AppRouter =()=>{
    return (
        <React.Fragment>
            <Route path="/" component={App} />
            <Route exact path="/versions" component={VersionList} />
            <Route exact path="/measure-details" component={MeasureDetails} />
        </React.Fragment>
    );
};

export default AppRouter;