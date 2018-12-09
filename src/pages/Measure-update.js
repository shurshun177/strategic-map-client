import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';

class MeasureUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null,
            isCreated: true
        }

    }
    handleFormSubmit(formData){
        let currentId = this.props.match.params.id;

        let updateObject = {
            active: formData.active === 'active',
            measure_name: formData.measure_name,
            measure_desc: formData.measure_desc,
            criteria_inclusion: formData.criteria_inclusion,
            removal_criteria: formData.removal_criteria,
            numerator: formData.numerator,
            denominator: formData.denominator,
            business_topic: formData.business_topic,
            measure_type: formData.measure_type,
            measuring_frequency: formData.measuring_frequency,
            measure_unit: formData.measure_unit,
            digit_num: formData.digit_num,
            separate_thousands: formData.separate_thousands === 'separate_thousands',
            from_date: formData.from_date,
            to_date: formData.to_date,
            target_default: formData.target_default,
            remarks: formData.remarks,
        };

        let url = `measure/update/${currentId}/`;
        const updateMeasure = RestAPI().put(url, updateObject, {withCredentials: true});
        updateMeasure.then(result => {
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
        let url = `measures/${currentId}/`;
        const currentMeasure = RestAPI().get(url, {withCredentials: true});
        currentMeasure.then(result => {
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
        console.log(this.state.data, 'STATEDATA')
        return (
            <div>{
                this.state.isCreated ? (<Redirect to="/measures"/>) :
                    (            <Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='measure' mode={this.state.mode} data={this.state.data}/>
                    )
            }</div>
        );
    }
}

export default MeasureUpdate;