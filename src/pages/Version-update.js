import React, { Component } from 'react';
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';
import Notification from '../components/Snackbar';

class VersionUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null,
            isCreated: false,
            isUpdated: false,
            showSnackbar: false
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
            hospital_type: formData.hospital_type,
            retro: formData.retro

        };

        let url = `version/update/${currentId}/`;
        const updateVersion = RestAPI().put(url, updateObject, {withCredentials: true});
        updateVersion.then(result => {
            this.setState((prevState, props) => {
                return {
                    isCreated: true,
                    isUpdated: true,
                    showSnackbar:true
                };
            });
            //TODO if successful, redirect to list with toaster
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            this.setState((prevState, props) => {
                return {
                    isUpdated: false,
                    showSnackbar: true
                };
            });
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

    handleClose=(event, reason)=>{
        this.setState({showSnackbar:false})
    };

    renderNotificationSnackbar=()=>{
        if (this.state.isUpdated){
            return <Notification  message='הנתונים נשמרו בהצלחה' variant='success' showSnackbar={this.state.showSnackbar} onClose={this.handleClose} />
        }
        else {
            return <Notification message='נא לבחור את המדדים' variant='error' showSnackbar={this.state.showSnackbar} onClose={this.handleClose}/>
        }
    };

    render() {
        return (
            <>
            <div>
            {this.state.showSnackbar? this.renderNotificationSnackbar(): null}
            </div>
            <div className="main-content">{

                    // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' mode={this.state.mode}
                    //        data={this.state.data}/>)

                    (<VersionForm handleFormSubmit={this.handleFormSubmit.bind(this)} mode={this.state.mode}
                           data={this.state.data}/>)
            }
            </div>
            </>
        );
    }
}

export default VersionUpdate;