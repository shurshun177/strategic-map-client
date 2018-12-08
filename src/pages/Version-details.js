import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';

class VersionDetails extends Component {
    handleFormSubmit(formData){
        formData.active = formData.active === 'active';
        let url = `versions/`;
        const createVersion = RestAPI().post(url, formData, {withCredentials: true});
        createVersion.then(result => {
            let data = result;
            alert('version was created succcessfully')
            //TODO if successful, redirect to list with toaster
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('such credentials already exist')
        });
    }



    render() {
        console.log('SEARCH', this.props.match.params.id);

        return (
            <Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version'/>
        );
    }
}

export default VersionDetails;