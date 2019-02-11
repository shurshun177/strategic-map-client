import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import MeasureForm from '../components/MeasureForm';
import Notification from '../components/Snackbar';

class MeasureDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false,
            showSnackbar: false
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
                    isCreated: true,
                    showSnackbar: true
                };
            });
        }).catch((error) => {
            this.setState((prevState, props) => {
                return {
                    isCreated: false,
                    showSnackbar: true
                };
            });
            //todo if not successful, display an error with toaster

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
    render() {
        return (
            <>
            <div>
            {this.state.showSnackbar? this.renderNotificationSnackbar(): null}
            </div>
            <div className="main-content">{

                    // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='measure'/>)
                    (<MeasureForm handleFormSubmit={this.handleFormSubmit.bind(this)} />)
            }
            </div>
            </>
        );
    }
}

export default MeasureDetails;