import React, { Component } from 'react'
import styles from './Cursor.scss';
import classNames from 'classnames/bind';
import { withRouter } from "react-router";
import { inject, observer } from 'mobx-react';

const cx = classNames.bind(styles);

@withRouter
@inject('cursorStore')
@observer
class Cursor extends Component {
    state={position: {x: 0, y: 0}, hidden: false, clicked: false, hovered: false}
    componentDidMount() {
        console.log('CDM');
        console.log(this.props.location.pathname);
        this._addEventListeners();
        this._handleLinkHoverEvents();
    }
    
    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            console.log('CDU');
            return this._handleLinkHoverEvents();
        }
    }

    componentWillUnmount() {
        console.log('CWUM');
        this._removeEventListeners();
    }

    _addEventListeners = () => {
        document.addEventListener("mousemove", this._onMouseMove);
        document.addEventListener("mouseenter", this._onMouseEnter);
        document.addEventListener("mouseleave", this._onMouseLeave);
        document.addEventListener("mousedown", this._onMouseDown);
        document.addEventListener("mouseup", this._onMouseUp);
    }

    _removeEventListeners = () => {
        document.removeEventListener("mousemove", this._onMouseMove);
        document.removeEventListener("mouseenter", this._onMouseEnter);
        document.removeEventListener("mouseleave", this._onMouseLeave);
        document.removeEventListener("mousedown", this._onMouseDown);
        document.removeEventListener("mouseup", this._onMouseUp);
    }

    _onMouseMove = (e) => {
        this.props.cursorStore.changePosition({x: e.clientX, y: e.clientY});
        this.setState({position: {x: e.clientX, y: e.clientY}});
    }  

    _onMouseLeave = () => {
        this.setState({hidden: true});
    };
    
    _onMouseEnter = () => {
        this.setState({hidden: false});
    };

    _onMouseDown = () => {
        this.setState({clicked: true});
    };

    _onMouseUp = () => {
        this.setState({clicked: false});
    };

    _handleLinkHoverEvents = () => {
        document.querySelectorAll("a").forEach(el => {
            el.addEventListener("mouseover", () => this.setState({hovered: true}));
            el.addEventListener("mouseout", () => this.setState({hovered: false}));
        });
    };

    render() {
        let { position: {x, y} } = this.props.cursorStore;
        return <div className={cx('cursor', {'cursor--hidden': this.state.hidden}, {'cursor--hovered': this.state.hovered},  {'cursor--clicked': this.state.clicked})}
        style={{
            left: `${x}px`,
            top: `${y}px`
        }}/>
    
    }
}

export default Cursor;