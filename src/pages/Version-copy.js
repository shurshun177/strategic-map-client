import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';

class VersionCopy extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null,
            isCreated: false,
            versionNumber: null
        }

    }
    handleFormSubmit(formData){
        let createObject = {
            active: formData.active === true,
            measure: formData.measure,
            version_desc: formData.version_desc,
            version_name: formData.version_name,
            version_type: formData.version_type,
            version_number: formData.version_number,
            hospital_type: formData.hospital_type,
            year: formData.year,
            retro: formData.retro
        };

        let url = `versions/`;
        const copyVersion = RestAPI().post(url, createObject, {withCredentials: true});
        copyVersion.then(result => {
            this.setState((prevState, props) => {
                return {
                    isCreated: true
                };
            });
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('such credentials already exist')
        });
    }


    componentDidMount() {
        let currentId = this.props.match.params.id;
        let url = `versions/${currentId}/`;
        const currentVersion = RestAPI().get(url, {withCredentials: true});
        const last_version = RestAPI().get('last_version/', {withCredentials: true});

        Promise.all([currentVersion, last_version]).then(function(values) {
            let currentVersionResult = values[0];
            let lastVersionResult = values[1];
            let item = currentVersionResult.data.items[0];
            let number = lastVersionResult.data.vers_number;

            delete item['_id'];
            this.setState((prevState, props) => {
                    return {
                        data: item,
                        mode: 'clone',
                        versionNumber: number
                    };
                });

        });
    }

    render() {
        return (
            <div className="main-content">{
                this.state.isCreated ? (<Redirect to="/app/versions"/>) :
                    // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' mode={this.state.mode}
                    //        data={this.state.data}/>)

                    (<VersionForm handleFormSubmit={this.handleFormSubmit.bind(this)} mode={this.state.mode}
                                  data={this.state.data} versionNumber={this.state.versionNumber}/>)

            }</div>
        );
    }
}

export default VersionCopy;