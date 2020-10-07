import { observable, reaction, action } from 'mobx';
import agent from '../utils/agent';
import loginStore from './loginStore';

class AuthStore {
    @observable isLoading = false;
    @observable token = window.localStorage.getItem('token');
    @observable refreshToken = window.localStorage.getItem('refreshToken');
    @observable email = window.localStorage.getItem('email');
    @observable username = window.localStorage.getItem('username');
    @observable user_id = window.localStorage.getItem('user_id');
    @observable authError = false;
    @observable expiredToken = false;


    constructor() {
        this._initTokenAndUuidWithLocalStorage();

        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('token', token);
                } else {
                    window.localStorage.removeItem('token');
                }
            }
        );

        reaction(
            () => this.refreshToken,
            refreshToken => {
                if (refreshToken) {
                    window.localStorage.setItem('refreshToken', refreshToken);
                } else {
                    window.localStorage.removeItem('refreshToken');
                }
            }
        );

        reaction(
            () => this.email,
            email => {
                if (email) {
                    window.localStorage.setItem('email', email);
                } else {
                    window.localStorage.removeItem('email');
                }
            }
        );

        reaction(
            () => this.user_id,
            user_id => {
                if (user_id) {
                    window.localStorage.setItem('user_id', user_id);
                } else {
                    window.localStorage.removeItem('user_id');
                }
            }
        );
    }

    _initTokenAndUuidWithLocalStorage() {
        if (this.refreshToken && this.token && this.email && this.user_id) {
            this.setTokenAndEmailAndUserTypeAndType(this.token, this.refreshToken, this.email, this.user_id);
        }
    }

    @action setTokenAndEmailAndUserTypeAndType(token, refreshToken, email, user_id) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.email = email;
        this.user_id = user_id;
    }

    @action destroyTokenAndUuid() {
        this.token = undefined;
        this.refreshToken = undefined;
        this.email = undefined;
        this.user_id = undefined;
    }

    @action setToken() {
        this.token = window.localStorage.getItem('token');
    }

    @action setExpiredToken(status) {
        this.expiredToken = status;
    }

    @action validateToken() {
        return agent.validateToken()
            .then(action((response) => {
                if (!response.data) {
                    this.setExpiredToken(true);
                }
                return response;
            }))
            .then((response) => {
                if (!response.data) {
                    setTimeout(() => {
                        alert("로그인 시간이 만료되었습니다. 다시 로그인하여 주세요.")
                    }, 100);
                    setTimeout(() => {
                        this.logout('expiredRefreshToken');
                    }, 150);
                    setTimeout(() => {
                        window.location.href = "http://cloudoc.net.s3-website.ap-northeast-2.amazonaws.com/login";
                    }, 200);
                }
                return response.data;
            })
            .catch((error) => {
                throw error;
            })
    }

    @action clearAuthError() {
        this.authError = false;
    }

    @action login() {
        this.isLoading = true;
        const { email, password } = loginStore.inputValuesForLogin;

        return agent.login({ email, password })
            .then(action((res) => {
                let {
                    token,
                    refreshToken
                } = res.data;
                this.setTokenAndEmailAndUserTypeAndType(token, refreshToken, email, res.data.user.id);

                loginStore.setLoggedIn(true);
                this.isLoading = false;
                return res.data;
            }))
            .catch(action((err) => {
                // this.errors = err.response && err.response.body && err.response.body.errors;
                this.isLoading = false;
                loginStore.setLoggedIn(false);
                // const { email, password } = err.data.errors || {};
                // const { message } = err.data || {};

                // if (email && !password) {
                //     this.errorValues.noIdValue = true;
                //     throw err;
                // } 
                // if (!email && password) {
                //     this.errorValues.noPasswordValue = true;
                //     throw err;
                // } 
                // if (email && password) {
                //     this.errorValues.noIdValue = true;
                //     this.errorValues.noPasswordValue = true;
                //     throw err;
                // }
                // if (message === "unregistered email" || message === "Incorrect password") {
                //     this.errorValues.inputError = true;
                //     throw err;
                // }
            }));
    }

    _removeItem() {
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('refreshToken');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user_id');
    }

    @action logout(type) {
        const THIS = this;
        return new Promise(function (resolve, reject) {
            if (type !== 'expiredRefreshToken') {

                if (true) {
                    THIS._removeItem()
                    loginStore.setLoggedIn(false);
                    THIS.destroyTokenAndUuid();
                    loginStore.clearLoggedIn();
                    return resolve({ success: true });
                } else {
                    return false;
                }
            } else THIS._removeItem();


            loginStore.setLoggedIn(false);
            THIS.destroyTokenAndUuid();
            loginStore.clearLoggedIn();
            return resolve({ success: true });
        });
    }

    @action loadUsers() {
        return agent.loadUsers()
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

}

export default new AuthStore();