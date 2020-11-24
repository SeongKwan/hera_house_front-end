import { observable, action } from 'mobx';

class CursorStore {
    @observable position = {x: 0, y: 0};

    @action changePosition(position) {
        this.position = {
            ...this.position,
            ...position,
        };
    }

    @action clear() {
        this.position = {x: 0, y: 0};
    }
}

export default new CursorStore();