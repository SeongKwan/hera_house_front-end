import { action, observable, computed } from 'mobx';
import agent from '../utils/agent';
import _ from 'lodash';
import categoryStore from './categoryStore';

class PostStore {
    @observable isLoading = false;
    @observable registry = [];
    @observable filteredRegistry = [];
    @observable thePost = {};
    @observable value = {
        title: '',
        content: '',
        category: '',
        createdAt: null,
        updatedAt: null,
        isPublished: false,
        thumbnail: ''
    };

    @computed get finedPosts() {
        if (categoryStore.currentCategory != null) return _.filter(this.registry, { category: categoryStore.currentCategory });
        return this.registry;
    }

    @computed get postsLength() {
        return this.filteredRegistry.filter(
            post => post.isPublished === true
        ).length;
    }

    @computed get postsByCreatedAt() {
        return this.registry.sort((a, b) => {
            return a.createdAt > b.createdAt ? -1 : a.createdAt < b.createdAt ? 1 : 0;
        });
    }

    @computed get titleIsEmpty() {
        return this.value['title'].length <= 0;
    }

    @action changeValue(type, value) {
        this.value[type] = value;
    };

    @action uploadImage(formData) {
        return agent.uploadImage(formData)
            .then(action((res) => {
                return res.data;
            }))
            .catch(action((err) => {
                throw err;
            }))
    };

    @action loadPosts() {
        this.isLoading = true;
        return agent.loadPosts()
            .then(action((res) => {
                this.isLoading = false;
                this.registry = res.data;
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    };

    @action loadPost(postId) {
        this.isLoading = true;
        return agent.loadPost(postId)
            .then(action((res) => {
                const {
                    title,
                    category,
                    content,
                    thumbnail,
                    createdAt,
                    updatedAt,
                    isPublished
                } = res.data;
                this.thePost = res.data;
                this.value = {
                    ...this.value,
                    title,
                    category,
                    content,
                    thumbnail,
                    createdAt,
                    updatedAt,
                    isPublished
                };
                return res.data;
            }))
            .then(action((res) => {
                this.isLoading = false;
                return res;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    };

    @action createPost() {
        this.isLoading = true;
        const {
            title,
            content,
            category,
            isPublished,
            thumbnail
        } = this.value;

        return agent.createPost({
            title,
            content,
            category,
            isPublished,
            thumbnail
        })
            .then(action((res) => {
                this.isLoading = false;
                return res.data;
            }))
            .then(action((res) => {
                this.isLoading = false;
                return res;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }

    @action updatePost(postId) {
        this.isLoading = true;
        const {
            title,
            content,
            category,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        } = this.value;

        return agent.updatePost(postId, {
            title,
            content,
            category,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        })
            .then(action((res) => {
                this.isLoading = false;
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }

    @action toggleIsPublishedPost(post) {
        this.isLoading = true;
        const {
            _id,
            title,
            content,
            category,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        } = post;

        return agent.updatePost(_id, {
            title,
            content,
            category,
            createdAt,
            updatedAt,
            isPublished: !isPublished,
            thumbnail
        })
            .then(action((res) => {
                this.isLoading = false;
                this.loadPosts();
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    }

    @action deletePost(postId) {
        this.isLoading = true;
        return agent.deletePost(postId)
            .then(action((res) => {
                this.isLoading = false;
                return res.data;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }))
    };

    @action filterRegistry(posts, category) {
        this.filteredRegistry = _.filter(posts, { category });
    }

    @action clear() {
        this.isLoading = false;
        this.clearValue();
        this.clearThePost();
        this.clearRegistry();
    };

    @action clearValue() {
        this.value = {
            title: '',
            content: '',
            category: '',
            isPublished: false,
            thumbnail: ''
        };
    }

    @action clearThePost() {
        this.thePost = {};
    }

    @action clearRegistry() {
        this.registry = [];
        this.filteredRegistry = [];
    }
}

export default new PostStore();