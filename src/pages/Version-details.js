import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';
import { Route, Redirect } from 'react-router';

class VersionDetails extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            isCreated: false,
            versionNumber: null
        }
    }


     componentDidMount() {
        //todo make request to get version id
        //todo restApi........setState(()=>return{versionNumber: result)

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
                this.state.isCreated ? (<Redirect to="/versions"/>) :
                (<Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' versionNumber={this.state.versionNumber}/>)
            }
            </div>)
    }
}

export default VersionDetails;