import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';

class MeasureDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false
        }
    }

    handleFormSubmit(formData){
        //formData.active = formData.active === true
        //formData.separate_thousands = formData.separate_thousands === true
        let url = `measures/`;
        const createMeasure = RestAPI().post(url, formData, {withCredentials: true});
        createMeasure.then(result => {
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
            <div className="main-content">{
                this.state.isCreated ? (<Redirect to="/measures"/>) :
                    (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='measure'/>)
            }
            </div>
        );
    }
}

export default MeasureDetails;