import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import MeasureForm from '../components/MeasureForm';
import Notification from '../components/Snackbar';


class MeasureCopy extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null,
            isCreated: false,
            showSnackbar: false,
        }

    }
    handleFormSubmit(formData){
        let currentId = this.props.match.params.id;

        let createObject = {
            measure_code: formData.measure_code,
            hospital_type: formData.hospital_type,
            active: formData.active === true,
            measure_name: formData.measure_name,
            measure_desc: formData.measure_desc,
            criteria_inclusion: formData.criteria_inclusion,
            removal_criteria: formData.removal_criteria,
            numerator: formData.numerator,
            denominator: formData.denominator,
            business_topic: formData.business_topic,
            sub_business_topic: formData.sub_business_topic,
            measure_type: formData.measure_type,
            measuring_frequency: formData.measuring_frequency,
            measure_unit: formData.measure_unit,
            digit_num: formData.digit_num,
            separate_thousands: formData.separate_thousands === 'separate_thousands',
            from_date: formData.from_date,
            to_date: formData.to_date,
            target_default: formData.target_default,
            remarks: formData.remarks,
            is_division: formData.is_division
        };

        let url = `measures/`;
        const copyMeasure = RestAPI().post(url, createObject, {withCredentials: true});
        copyMeasure.then(result => {
            this.setState((prevState, props) => {
                return {
                    isCreated: true,
                    showSnackbar: true
                };
            });
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            this.setState((prevState, props) => {
                return {
                    isCreated: false,
                    showSnackbar: true
                };
            });
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
                    mode: 'clone'
                };
            });

        }).catch((error) => {
            console.log(error);
        });
    }

    handleClose=(event, reason)=>{
        this.setState({showSnackbar:false})
    };

    renderNotificationSnackbar=()=>{
        if (this.state.isCreated){
            return <Notification  message='הנתונים נשמרו בהצלחה' variant='success' showSnackbar={this.state.showSnackbar} onClose={this.handleClose} />
        }
        else {
            return <Notification message='הנתונים לא נשמרו !' variant='error' showSnackbar={this.state.showSnackbar} onClose={this.handleClose}/>
        }
    };

    handleClose=(event, reason)=>{
        this.setState({showSnackbar:false})
    };

    renderNotificationSnackbar=()=>{
        if (this.state.isCreated){
            return <Notification  message='הנתונים נשמרו בהצלחה' variant='success' showSnackbar={this.state.showSnackbar} onClose={this.handleClose} />
        }
        else {
            return <Notification message='הנתונים לא נשמרו !' variant='error' showSnackbar={this.state.showSnackbar} onClose={this.handleClose}/>
        }
    };

    render() {
        return (
            <>
            <div>
            {this.state.showSnackbar? this.renderNotificationSnackbar(): null}
            </div>
            <div className="main-content">
                {
                // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='measure' mode={this.state.mode}
                //       data={this.state.data}/>)
                    (<MeasureForm handleFormSubmit={this.handleFormSubmit.bind(this)}
                                  mode={this.state.mode}
                                  data={this.state.data}
                    />)

                }
            </div>
            </>
        );
    }
}

export default MeasureCopy;