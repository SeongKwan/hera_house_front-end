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
        type: '',
        category: '',
        subCategory: '',
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
        return this.registry.filter(
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
        if (value === 'projects' && this.value['type'] === 'archives') {
            this.value['category'] = '';
            this.value['subCategory'] = '';
        }
        if (value !== 'Work' && this.value['category'] === 'Work') {
            this.value['subCategory'] = '';
        }
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

    @action loadFilteredPosts({ type, category, subCategory }) {
        this.isLoading = true;
        return agent.loadFilteredPosts({ type, category, subCategory })
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
                    type,
                    category,
                    subCategory,
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
                    type,
                    category,
                    subCategory,
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
            type,
            category,
            subCategory,
            isPublished,
            thumbnail
        } = this.value;

        return agent.createPost({
            title,
            content,
            type,
            category,
            subCategory,
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

    @action updatePost(postId) {
        this.isLoading = true;
        const {
            title,
            content,
            type,
            category,
            subCategory,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        } = this.value;

        
        return agent.updatePost(postId, {
            title,
            content,
            type,
            category,
            subCategory,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        })
            .then(action((res) => {
                this.isLoading = false;
                return res.data.updatedPost;
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
            type,
            category,
            subCategory,
            createdAt,
            updatedAt,
            isPublished,
            thumbnail
        } = post;

        return agent.updatePost(_id, {
            title,
            content,
            type,
            category,
            subCategory,
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

    @action filterRegistry(posts, type, category, subCategory) {
        let filter = { type, category, subCategory, };
        // console.log(filter);

        this.filteredRegistry = _.filter(posts, (post) => {
            // console.log(post);
            for (var key in filter) {
                // console.log(key);
                if (post[key] === undefined || post[key] !== filter[key])
                    return false;
            }
            return true;
        });
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
            type: '',
            category: '',
            subCategory: '',
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