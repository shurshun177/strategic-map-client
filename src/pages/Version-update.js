import React, { Component } from 'react';
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';

class VersionUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null,
            isCreated: false
        }

    }
    handleFormSubmit(formData){
        let currentId = this.props.match.params.id;

        let updateObject = {
            active: formData.active === true,
            measure: formData.measure,
            version_name: formData.version_name,
            version_type: formData.version_type,
            year: formData.year,
            hospital_type: formData.hospital_type

        };

        let url = `version/update/${currentId}/`;
        const updateVersion = RestAPI().put(url, updateObject, {withCredentials: true});
        updateVersion.then(result => {
            this.setState((prevState, props) => {
                return {
                    isCreated: true
                };
            });
            //TODO if successful, redirect to list with toaster
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('such credentials already exist')
        });
    }


    componentDidMount() {
        let currentId = this.props.match.params.id;
        let url = `versions/${currentId}/`;
        const currentVersion = RestAPI().get(url, {withCredentials: true});
        currentVersion.then(result => {
            let item = result.data.items[0];
            delete item['_id'];
            this.setState((prevState, props) => {
                return {
                    data: item,
                    mode: 'update'
                };
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="main-content">{
                this.state.isCreated ? (<Redirect to="/app/versions"/>) :
                    // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' mode={this.state.mode}
                    //        data={this.state.data}/>)

                    (<VersionForm handleFormSubmit={this.handleFormSubmit.bind(this)} mode={this.state.mode}
                           data={this.state.data}/>)
            }</div>
        );
    }
}

export default VersionUpdate;