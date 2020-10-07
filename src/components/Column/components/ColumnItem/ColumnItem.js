import React, { Component } from 'react';
import styles from './ColumnItem.module.scss';
import classNames from 'classnames/bind';
import { Draggable } from 'react-beautiful-dnd';
import { IoIosMenu } from 'react-icons/io';
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@inject('categoryStore', 'dndStore')
@observer
class ColumnItem extends Component {
    _handleClickOnButtonDelete = (category) => {
        if (window.confirm(`'${category.name}'을(를) 삭제하는게 맞나요?`))
            this.props.categoryStore.deleteCategory(category.id)
                .then(res => {
                    this.props.dndStore.initialize('category');
                });
    }

    render() {
        const { index, category } = this.props;
        return (
            <Draggable draggableId={category.id} index={index} >
                {(provided, snapshot) => (
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={cx('column-item', { isDragging: snapshot.isDragging })}
                    >
                        <div {...provided.dragHandleProps} className={cx('drag-handle')}>
                            <IoIosMenu />
                        </div>
                        <div
                            className={cx('wrapper-content')}
                        >
                            <div
                                className={cx('content')}
                                onClick={() => this.props.onClickListItem(index)}
                            >
                                {category.name}
                            </div>
                            {/* <button className={cx('button', 'button-edit')}>수정</button> */}
                            {this.props.selectedItem === index && <button className={cx('button', 'button-delete')} onClick={() => this._handleClickOnButtonDelete(category)}>삭제</button>}

                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default ColumnItem;