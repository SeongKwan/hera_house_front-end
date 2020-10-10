import { observable, action } from 'mobx';

class CommonStore {
    @observable enableScroll = true;

    @action toggleEnableScroll() {
        this.enableScroll = !this.enableScroll;
    }

    @action clearEnableScroll() {
        this.enableScroll = true;
    }
}

export default new CommonStore();