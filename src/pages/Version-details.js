import React, {Component} from 'react';
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';
import VersionForm from '../components/VersionForm';
import Notification from '../components/Snackbar';


class VersionDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false,
            versionNumber: null,
            showSnackbar: false
        }
    }


     componentDidMount() {
        let url = 'last_version/';
        //console.log(this.state.versionNumber)
        const last_version = RestAPI().get(url, {withCredentials: true});
        last_version.then(result => {
            let number = result.data.vers_number;
            //console.log(result.data.vers_number)
            this.setState((prevState, props) => {
                return {
                    versionNumber: number
                };
            });

        }).catch((error) => {
            console.log(error);
        });
     }

    handleFormSubmit(formData){
        let url = `versions/`;
        delete formData.measure_names;
        const createVersion = RestAPI().post(url, formData, {withCredentials: true});
        createVersion.then(result => {
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


                // (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' versionNumber={this.state.versionNumber}/>)
                    (<VersionForm handleFormSubmit={this.handleFormSubmit.bind(this)} versionNumber={this.state.versionNumber}/>)
            }

            </div>
            </>)
    }
}

export default VersionDetails;