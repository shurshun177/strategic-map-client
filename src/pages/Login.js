import React, { Component } from 'react';
import RestAPI from '../api';
import { Redirect } from 'react-router';
import LoginForm from '../components/LoginForm';


const Greeting = props =>{
    return props.isLoggedIn? (<Redirect to={{
            pathname: '/app/versions',
            state: { isLoggedIn: props.isLoggedIn }
        }} />) :
        (<LoginForm handleSubmit={props.handleSubmit} isError={props.isError}/>)
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            isLoggedIn: false,
            isError: false
        }
    }

    submitForm(name, password) {
        let {loginStore} = this.props;
        let submission =  loginStore.login(name, password);
        // let url = 'auth';
        // let submission = RestAPI().post(url, {name, password});
        submission.then( () => {
            this.setState(()=>{
                return {
                    isLoggedIn: name
                }
            });
        }).catch( (error) => {
            this.setState(()=>{
                return {
                    isError: true
                }
            });
        });
    }
    render() {
        return <Greeting isLoggedIn={this.state.isLoggedIn} handleSubmit = {this.submitForm} isError={this.state.isError}/>
    }
}

export default Login;
