import React, { Component } from 'react';
import Form from '../components/Form'
import RestAPI from '../api';

class VersionUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.state = {
            data: {},
            mode: null
        }

    }
    handleFormSubmit(formData){
        let currentId = this.props.match.params.id;

        let updateObject = {
            active: formData.active === 'active',
            measure: formData.measure,
            version_desc: formData.version_desc,
            version_name: formData.version_name,
            version_type: formData.version_type
        };

        let url = `version/update/${currentId}/`;
        const updateVersion = RestAPI().put(url, updateObject, {withCredentials: true});
        updateVersion.then(result => {
            let data = result;
            alert('version was updated succcessfully')
            //TODO if successful, redirect to list with toaster
        }).catch((error) => {
            //todo if not successful, display an error with toaster
            alert('such credentials already exist')
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

    render() {
        console.log(this.state.data, 'STATEDATA')
        return (
            <Form handleFormSubmit={this.handleFormSubmit.bind(this)} type='version' mode={this.state.mode} data={this.state.data}/>
        );
    }
}

export default VersionUpdate;