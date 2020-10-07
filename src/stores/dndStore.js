import { observable, action } from 'mobx';
import categoryStore from './categoryStore';
import _ from 'lodash';

class DndStore {
    @observable isLoading = false;
    @observable registry = [];
    @observable oldRegistry = [];
    @observable categories = {};
    @observable posts = {};
    @observable columns = {
        'column-1': {
            id: 'column-1',
            title: '',
            categoryIds: []
        }
    };
    @observable columnOrder = [];
    @observable selectedIndex = null;

    @observable hasChanged = false;

    @action initialize(type) {
        this.isLoading = true;
        let collector = {};

        this.clear();

        categoryStore.loadCategories()
            .then(action(res => {

                this.registry = _.sortBy(res, 'order');
                this.oldRegistry = _.sortBy(res, 'order');

                if (type === 'category') {
                    // part 1
                    this.registry.forEach((category) => {
                        const { _id, name, description, order } = category;
                        collector[_id] = {
                            id: _id,
                            name,
                            description,
                            order
                        }
                        // part 2
                        this.columns['column-1']['categoryIds'].push(_id);
                    });
                    this.categories = collector;

                    // part 2
                    this.columns['column-1']['title'] = 'Category';

                    // part 3
                    this.columnOrder[0] = 'column-1';
                    return this.isLoading = false;
                };
            }))
            .catch(err => {
                this.isLoading = false;
                throw err;
            })

    }

    @action onDragEnd(result) {
        const { categories, columns, columnOrder } = this;
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.draggableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const column = columns[source.droppableId];
        const newCategoryIds = Array.from(column.categoryIds);
        newCategoryIds.splice(source.index, 1);
        newCategoryIds.splice(destination.index, 0, draggableId);
        const newColumn = {
            ...column,
            categoryIds: newCategoryIds,
        };
        const newState = {
            categories,
            columnOrder,
            columns: {
                ...columns,
                [newColumn.id]: newColumn,
            },
        };

        this.categories = newState.categories;
        this.columns = newState.columns;
        this.columnOrder = newState.columnOrder;

        this.columns['column-1']['categoryIds'].forEach((id, index) => {
            let prevCategoryIndex = this.registry.findIndex(x => x._id === id);
            this.registry[prevCategoryIndex]['order'] = index + 1;
        })

        this.compareNewWithOld();
    }

    @action applyUpdatedOrder() {
        this.isLoading = true;
        categoryStore.updateCategoryOrder({ categories: this.registry })
            .then(action((res => {
                this.isLoading = false;
                this.clear();
                return res;
            })))
            .then(action((res) => {
                this.initialize('category');
                return res;
            }))
            .catch(action((err) => {
                this.isLoading = false;
                throw err;
            }));
    }

    @action compareNewWithOld() {
        const lengthOfOld = this.oldRegistry.length;
        const lengthOfNew = this.registry.length;

        if (lengthOfOld !== lengthOfNew) {
            this.hasChanged = true;
        }
        this.hasChanged = (JSON.stringify(this.oldRegistry) !== JSON.stringify(this.registry));
    }

    @action restore() {
        console.log('reso');
        this.clear();
        let collector = {};
        this.registry = JSON.parse(JSON.stringify(this.oldRegistry));
        this.registry.forEach((category) => {
            const { _id, name, description, order } = category;
            collector[_id] = {
                id: _id,
                name,
                description,
                order
            }
            // part 2
            this.columns['column-1']['categoryIds'].push(_id);
        });
        this.categories = collector;

        // part 2
        this.columns['column-1']['title'] = 'Category';

        // part 3
        this.columnOrder[0] = 'column-1';
    }

    @action clear() {
        this.registry = [];
        this.categories = {};
        this.posts = {};
        this.columns = {
            'column-1': {
                id: 'column-1',
                title: '',
                categoryIds: []
            }
        };
        this.columnOrder = [];
        this.selectedIndex = null;
        this.hasChanged = false;
    }
}

export default new DndStore();