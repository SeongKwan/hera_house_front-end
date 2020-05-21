import React, { Component } from 'react'
import './Aim.css';
import TempImg from '../../styles/img/disappointed-face.svg';

export default class Aim extends Component {
    render() {
        return (
            <header className="top en">
        <div className="header-left">
            <div className="header-left-top">
                <div className="main-category main-category_men align-left en">
                    <li><a id="main-category-anchor_men" href="/product/list.html?cate_no=42">MEN</a></li>
                </div>
            </div>
            <div className="header-left-bottom en">
                <ul>
                    <li><a href="/shopinfo/company.html">ABOUT</a></li>
                    <li><a href="/board/free/list.html?board_no=1">NOTICE</a></li>
                    <li><a href="/board/product/list.html?board_no=6">Q&A</a></li>
                    <li><a href="/board/product/list.html?board_no=4">REVIEW</a></li>
                </ul>
            </div>
        </div>
        <div className="header-center">
            <div className="header-center-logo en">
                <a href="/">SILN</a>
            </div>
        </div>
        <div className="header-right en">
            <div className="header-right-top">
                <div className="header-right-top main-category main-category_women align-right en">
                    <li><a id="main-category-anchor_women" href="/product/list.html?cate_no=43">WOMEN</a></li>
                </div>
            </div>
            <div className="header-right-bottom en">
                <div className="en" module="Layout_stateLogon">
                    
                    <a href="{$action_logout}" className="log">LOGOUT</a>
                    <a href="/myshop/order/list.html">ORDER</a>
                    <a href="/myshop/index.html">MY PAGE</a>
                    
                    <p module="Layout_orderBasketcount">
                        <a href="/order/basket.html" className="btnBasket">CART<span className="forced-display-block count {$basket_count_display|display}">({1})</span></a>
                    </p>
                </div>
                <div className="en" module="Layout_statelogoff">
                    <a href="/member/login.html" className="log">LOGIN</a>
                    <a href="/member/join.html">JOIN</a>
                    <a href="/myshop/order/list.html">ORDER</a>
                    <a href="/myshop/index.html">MY PAGE</a>
                    
                    <p module="Layout_orderBasketcount">
                        <a href="/order/basket.html" className="btnBasket">CART<span className="forced-display-block count {$basket_count_display|display}">({2})</span></a>
                    </p>
                </div>
            </div>
        </div>
    </header>
        )
    }
}


{/* <a id="main-category-anchor_women" href="/product/list.html?cate_no=43">WOMEN</a> */}