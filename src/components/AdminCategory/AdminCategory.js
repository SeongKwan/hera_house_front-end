import React, { Component } from 'react';
import styles from './AdminCategory.module.scss';
import classNames from 'classnames/bind';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../components/Column/Column';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('categoryStore', 'authStore', 'dndStore')
@observer
class AdminCategory extends Component {
    state = { selectedItem: -1};

    componentDidMount() {
        this.props.dndStore.initialize('category');
    }
    componentWillUnmount() {}

    _handleChangeOnInput = (e) => {
        const { name: type, value: content } = e.target;
        this.props.categoryStore.changeInput(type, content);
    }

    _handleClickOnClear = () => {
        this.props.categoryStore.clearValue('name');
    }

    _handleClickOnAdd = () => {
        this.props.categoryStore.createCategory()
        .then(res => {
            this.props.dndStore.initialize('category')
        })
    }

    handleClickOnListItem = (index) => {
        this.setState({selectedItem: index});
    }

    handleMouseLeaveFromList = () => {
        this.setState({selectedItem: -1});
    }
    
    handleOnDragStart = () => {
        this.setState({selectedItem: -1});
    }

    handleOnDragEnd = (result) => {
        this.props.dndStore.onDragEnd(result);
    }

    _handleClickOnApplyOrder = () => {
        this.props.dndStore.applyUpdatedOrder();
    }

    render() {
        const { value: { name } } = this.props.categoryStore;
        const { categories, columns, columnOrder, isLoading } = this.props.dndStore;

        return (
            <div className={cx('AdminCategory')}>
                <div className={cx('left-container')}>
                    <div className={cx('wrapper-add-category')}>
                        <div className={cx('wrapper-input')}>
                            <input 
                                className={cx('input-category')} 
                                id="name"
                                name="name"
                                type="text" 
                                value={name}
                                autoComplete="off"
                                onChange={this._handleChangeOnInput}
                                onKeyDown={(e) => { if (e.keyCode === 13) {this._handleClickOnAdd();}}}
                            />
                            <label htmlFor="name" hidden>카테고리명</label>
                            <div className={cx('clear')} onClick={this._handleClickOnClear}>X</div>
                        </div>
                        <button className={cx('button-add')} onClick={this._handleClickOnAdd}>
                            등록
                        </button>
                    </div>
                    <div className={cx('list-category')}>
                        {
                            isLoading ?
                            <div className={cx('list-category-fake')}>
                                <div className={cx('fake-list')}></div>
                                <div className={cx('fake-button')}></div>
                            </div>
                            :
                            <>
                                <DragDropContext 
                                    onDragStart={this.handleOnDragStart}
                                    onDragEnd={this.handleOnDragEnd}
                                >
                                    {
                                        columnOrder.map(columnId => {
                                            const column = columns[columnId];
                                            const data = column.categoryIds.map(categoryId => categories[categoryId]);
                                            return <Column 
                                                key={column.id} 
                                                column={column} 
                                                categories={data} 
                                                selectedItem={this.state.selectedItem}
                                                onClickListItem={this.handleClickOnListItem}
                                                onMouseLeaveList={this.handleMouseLeaveFromList}
                                            />
                                        })
                                    }
                                </DragDropContext>
                                <button className={cx('button-apply-order')} onClick={this._handleClickOnApplyOrder}>
                                    적용하기
                                </button>
                            </>
                        }
                    </div>
                    
                </div>
                <div className={cx('right-container')}>
                    <div className={cx('detail-category')}>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminCategory;