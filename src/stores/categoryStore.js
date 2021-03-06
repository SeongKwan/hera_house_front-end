import { action, observable } from 'mobx';
import agent from '../utils/agent';
import _ from 'lodash';

class CategoryStore {
    @observable registry = [];
    @observable registryForSubCategories = [];
    @observable isLoading = false;
    @observable value = {
        name: '',
        description: ''
    };
    @observable currentCategory = '';

    @action changeInput(type, content) {
        this.value[type] = content;
    }

    @action setCurrentCategory(currentCategory) {
        this.currentCategory = currentCategory;
    }

    @action loadCategories() {
        this.isLoading = true;
        return agent.loadCategories()
            .then(action((res) => {
                this.registry = _.sortBy(res.data, 'order');
                this.isLoading = false;
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }
    @action loadSubCategories() {
        
        this.isLoading = true;
        return agent.loadSubCategories()
            .then(action((res) => {
                this.registryForSubCategories = _.sortBy(res.data, 'order');
                this.isLoading = false;
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }

    @action createCategory() {
        this.isLoading = true;
        const { name, description } = this.value;
        return agent.createCategory({ name, description })
            .then(action((res) => {
                this.isLoading = false;
                this.clearValue('name');
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }
    @action createSubCategory() {
        // console.log('create sub category');
        // this.isLoading = true;
        // const { name, description } = this.value;
        // return agent.createSubCategory({ name: 'FOOD STYLING', description: "", mainCategory: "5ec26aa6a444624ceb030729" })
        //     .then(action((res) => {
        //         this.isLoading = false;
        //         this.clearValue('name');
        //         console.log(res.data);
        //         return res.data;
        //     }))
        //     .catch(action((err) => {
        //         this.isLoading = false;
        //         throw err;
        //     }))
    }

    @action updateCategoryOrder({ categories }) {
        return agent.updateCategoryOrder({ categories })
            .then(action(res => {
                this.isLoading = false;
                return res.data;
            }))
            .catch(action(err => {
                this.isLoading = false;
                throw err;
            }))
    }

    @action deleteCategory(id) {
        this.isLoading = true;
        return agent.deleteCategory(id)
            .then(action(res => {
                this.isLoading = false;
                return res.data;
            }))
            .catch(action(err => {
                this.isLoading = false;
                throw err;
            }));
    }

    @action clearValue(type) {
        this.value[type] = '';
    }

    @action clearKeyword() {
        this.registry = [];
        this.value = {
            name: '',
            description: ''
        };
        this.isLoading = false;
    }

    @action clearCurrentCategory() {
        this.currentCategory = '';
    }
}

export default new CategoryStore();