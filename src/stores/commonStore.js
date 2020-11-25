import { observable, action } from 'mobx';

class CommonStore {
    @observable enableScroll = true;
    @observable screenSize = {
        width: 0,
        height: 0,
    }

    @action changeScreenSize(screenSize) {
        this.screenSize = {
            width: screenSize.width,
            height: screenSize.height,
        }
    }

    @action toggleEnableScroll() {
        this.enableScroll = !this.enableScroll;
    }

    @action clearEnableScroll() {
        this.enableScroll = true;
    }
}

export default new CommonStore();