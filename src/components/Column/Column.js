import React, { Component } from 'react';
import styles from './Column.module.scss';
import classNames from 'classnames/bind';
import { Droppable } from 'react-beautiful-dnd';
import ListItem from './components/ColumnItem/ColumnItem';

const cx = classNames.bind(styles);

class Column extends Component {
    render() {
        return (
            <div className={cx('Column')}>
                <Droppable droppableId={this.props.column.id}>
                    {(provided, snapshot) => (
                            <div 
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={cx('list', {isDragginOver: snapshot.isDraggingOver})}
                                onMouseLeave={this.props.onMouseLeaveList}
                            >
                                {this.props.categories.map((category, i) => <ListItem key={category.id} category={category} index={i} selectedItem={this.props.selectedItem} onClickListItem={this.props.onClickListItem} />)}
                                {provided.placeholder}
                            </div>
                        )}
                </Droppable>
            </div>
        );
    }
}

export default Column;