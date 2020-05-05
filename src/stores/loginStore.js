import { observable, action, computed } from 'mobx';
import authStore from './authStore';

class LoginStore {
    @observable loggedIn = false;
    @observable isLoading = false;
    @observable inputValuesForLogin = {
        email: '',
        password: ''
    };
    @observable errors = null;
    @observable errorValues = {
        noIdValue: false,
        noPasswordValue: false,
        inputError: false
    }

    @computed get isLoggedIn() {
        if (authStore.token) {
            return true;
        }
        if (this.loggedIn) {
            return true;
        }
        return false;
    }

    @action changeInput(key, value) {
        this.inputValuesForLogin[key] = value;
        if (key === 'email') {
            if (value === '') {
                return this.errorValues.noIdValue = true;
            }
            this.errorValues.noIdValue = false;
        }
        if (key === 'password') {
            if (value === '') {
                return this.errorValues.noPasswordValue = true;
            }
            this.errorValues.noPasswordValue = false;
        }
    }

    @action setLoggedIn(status) {
        console.log(status)
        console.log('loggedIn setting')
        this.loggedIn = status;
    }

    @action errorHandle({email, password, input}) {
        if (email) {
            this.errorValues.noIdValue = true;
        }
        if (password) {
            this.errorValues.noPasswordValue = true;
        }
        if (input) {
            this.errorValues.inputError = false;
        }
    }

    @action clearInputValuesForLogin() {
        this.inputValuesForLogin = {
            email: '',
            password: ''
        };
    }

    @action clearErrorValues() {
        this.errorValues = {
            noIdValue: false,
            noPasswordValue: false,
            inputError: false
        }
    }

    @action clearLoggedIn() {
        this.loggedIn = false;
    }
}

export default new LoginStore();