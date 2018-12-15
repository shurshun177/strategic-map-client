import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';

class VersionDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false
        }
    }
    handleFormSubmit(formData){
        let url = `versions/`;
        const createVersion = RestAPI().post(url, formData, {withCredentials: true});
        createVersion.then(result => {
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



    render() {
        return (
            <div>{
                this.state.isCreated ? (<Redirect to="/versions"/>) :
                (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version'/>)
            }
            </div>)
    }
}

export default VersionDetails;