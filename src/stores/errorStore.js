import { action, observable } from 'mobx';
import loginStore from './loginStore';
import agent from '../utils/agent';
import authStore from './authStore';

class ErrorStore {
    @observable errorToken = false;
    @action setErrorToken(status) {
        this.errorToken = status;
    }
    @action async authError(error) {
        const { type } = error;
        if (type === "refresh") {
            setTimeout(() => {
                alert("로그인 시간이 만료되었습니다. 다시 로그인하여 주세요.")
            }, 100);
            setTimeout(() => {
                authStore.logout('expiredRefreshToken');
            }, 150);
            setTimeout(() => {
                window.location.href = "http://hr-archive.com/admin/login/";
            }, 200);
            throw error;
        }
        if (type === "expired") {
            return agent.refreshToken()
                .then(action(async (response) => {
                    const { token } = response.data;
                    this.token = token;
                    await window.localStorage.setItem('token', token);
                    return token;
                }))
                .then((res) => {
                    window.location.reload(true);
                    return res;
                })
                .catch((error) => {
                    throw error
                })
        }
        if (type === "error") {
            // throw error;
            loginStore.logout('expiredRefreshToken');
            window.location.href = "http://hr-archive.com/admin/login/";
        }
    }
}

export default new ErrorStore();