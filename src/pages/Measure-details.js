import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';

class MeasureDetails extends Component {
    handleFormSubmit(formData){
        formData.active = formData.active === 'active'
        formData.separate_thousands = formData.separate_thousands === 'separate_thousands'
        let url = `measures/`;
        const createMeasure = RestAPI().post(url, formData, {withCredentials: true});
        createMeasure.then(result => {
            let data = result;
            //TODO if successful, redirect to list with toaster
        }).catch((error) => {
            //todo if not successful, display an error with toaster
        });
    }

    render() {
        return (
            <Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='measure'/>
        );
    }
}

export default MeasureDetails;