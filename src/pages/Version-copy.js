import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';

class VersionCopy extends Component {

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
        let createObject = {
            active: formData.active === 'active',
            measure: formData.measure,
            version_desc: formData.version_desc,
            version_name: formData.version_name,
            version_type: formData.version_type,
            version_number: formData.version_number,
            hospital_type: formData.hospital_type
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
        currentVersion.then(result => {
            let item = result.data.items[0];
            delete item['_id'];
            this.setState((prevState, props) => {
                return {
                    data: item,
                    mode: 'clone'
                };
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        return (
            <div>{
                this.state.isCreated ? (<Redirect to="/versions"/>) :
                    (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' mode={this.state.mode}
                           data={this.state.data}/>)

            }</div>
        );
    }
}

export default VersionCopy;