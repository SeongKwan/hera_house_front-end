import { action, observable } from 'mobx';

class EditorStore {
    @observable isLoading = false;

    @action setLoadingState(state) {
        this.isLoading = state;
    }
}

export default new EditorStore();