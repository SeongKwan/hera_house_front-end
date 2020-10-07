import { observable, action } from 'mobx';

class CommonStore {
    @observable enableScroll = true;

    @action toggleEnableScroll() {
        // console.log('toggle enable scroll')
        this.enableScroll = !this.enableScroll;
    }

    @action clearEnableScroll() {
        this.enableScroll = true;
    }
}

export default new CommonStore();