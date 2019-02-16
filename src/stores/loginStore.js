import { decorate, observable, action } from 'mobx';
import RestAPI from '../api';


class AuthStore {

    values = {
        username: '',
        email: '',
        type: '',
    };

    setUsername(username) {
        this.values.username = username;
    }

    setEmail(email) {
        this.values.email = email;
    }

    setUserType(type) {
        this.values.type = type;
    }

    reset() {
        this.values.username = '';
        this.values.email = '';
        this.values.type = '';
    }

    login(name, password) {
        this.inProgress = true;
        this.errors = undefined;
        let url = 'auth';
        let submission = RestAPI().post(url, {name, password});
        return submission.then( result => {
            this.setUsername(result.user);
            this.setUserType(result.user_type);
        }).catch( (error) => {
            // this.setState(()=>{
            //     return {
            //         isError: true
            //     }
            // });

                // this.setUsername('kuku');
                // this.setUserType('wowowowow');
        });
    }

    get user(){
        return this.values;
    }

    // @action register() {
    //     // this.inProgress = true;
    //     // this.errors = undefined;
    //     // return agent.Auth.register(this.values.username, this.values.email, this.values.password)
    //     //     .then(({ user }) => commonStore.setToken(user.token))
    //     //     .then(() => userStore.pullUser())
    //     //     .catch(action((err) => {
    //     //         this.errors = err.response && err.response.body && err.response.body.errors;
    //     //         throw err;
    //     //     }))
    //     //     .finally(action(() => { this.inProgress = false; }));
    // }
    //
    // @action logout() {
    //     return Promise.resolve();
    // }
}

decorate(AuthStore, {
    values: observable,
    setUsername: action,
    setEmail: action,
    setUserType: action,
    reset: action,
    login: action
});


export default new AuthStore();