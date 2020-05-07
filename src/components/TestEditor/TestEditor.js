import React, { Component } from 'react';
import styles from './Editor.module.scss';
import classNames from 'classnames/bind';
// import './Editor.css';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import ReactSummernote from 'react-summernote';
import 'react-summernote/lang/summernote-ko-KR'; // you can import any other locale
import 'summernote/dist/summernote-lite.css';
// import 'bootstrap/js/dist/modal';
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/tooltip';

import { FiArrowLeft } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import options from './options';
import optionsForMobile from './optionsForMobile';
import staticUrl from '../../constants/staticUrl';
import Loader from '../Loader/Loader';
import $ from 'jquery';

const summernote = require('summernote/dist/summernote-lite');
const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore')
@observer
class TestEditor extends Component {
    constructor(props) {
        super(props);
    
        // this._onTouchStart = this._onTouchStart.bind(this);
        // this._onTouchMove = this._onTouchMove.bind(this);
        // this._onTouchEnd = this._onTouchEnd.bind(this);
    
        // this._swipe = {};
        // this.minDistance = 50;
        this.summernote = summernote;
    }

    state = {fileName: [], file: [], imageUrls: [], thumbnail: '', thumbnailData: '', thumbnailUrl: '', swiped: false}

    componentDidMount() {
        console.log($('.note-editable').on('focus', () => {console.log('focus')}))
        const { type } = this.props;
        this._initialize(type)
        this.editor.onInit(() => {console.log('init')});
    }

    componentWillUnmount() {
        this.clearState();
        this.props.postStore.clear();
    }

    _initialize = (type) => {
        const { postId } = this.props.match.params;
        this.props.categoryStore.loadCategories()
        .then(res => {
            this.props.postStore.changeValue('category', res[0].name);
        });
        if (type === 'edit') {
            this.props.postStore.loadPost(postId)
            .then(res => {
                this.setState({ thumbnailUrl: res.thumbnail });
            });
        }
    }

    clearState = () => {
        this.setState({fileName: [], file: [], imageUrls: [], thumbnail: '', thumbnailData: '', thumbnailUrl: ''})
    }

    _handleOnChange = (content) => {
        this.props.postStore.changeValue('content', content);
    }

    _handleChangeValue = (e) => {
        const { value, name: type } = e.target;
        this.props.postStore.changeValue(type, value);
    }

    _handleImageChange(e) {
        e.preventDefault();
        const THIS = this;
        let reader = new FileReader();
        let file = e.target.files[0];
        
        return new Promise(function (resolve, reject) {
            if (!!e.target.files[0] === true) {
                reader.onloadend = () => {
                    THIS.setState({
                        thumbnail: file,
                        thumbnailData: reader.result
                    });
                }
                reader.readAsDataURL(file)
                return resolve({success: true});
            } else {
                THIS.setState({
                    thumbnail: '',
                    thumbnailUrl: ''
                });
                THIS.props.postStore.changeValue('thumbnail', '')
                return resolve({success: false});
            }
        });
    }

    _setImagesToState = (images) => {
        const file = images;
        const fileTypes = [
            "image/jpeg",
            "image/pjpeg",
            "image/png",
            "image/svg",
            "image/svg+xml"
        ];
        const THIS = this;
        return new Promise(function (resolve, reject) {
            for (let i = 0 ; i < images.length; i++){
                const reader = new FileReader();
                reader.readAsDataURL(file[i]);
    
                for (let j = 0; j < fileTypes.length; j++) {
                    if (file[i].type === fileTypes[j]) {
                        reader.onloadend = () => {
                            let concatName = [];
                            let concatFile = [];
                            concatName = concatName.concat(file[i].name);
                            concatFile = concatFile.concat({
                                category: file[i].type,
                                multipart_form_data: file[i]
                            });
                            THIS.setState({ fileName: THIS.state.fileName.concat(concatName), file: THIS.state.file.concat(concatFile)}, () => {});
                        };
                    }
                }
            }
            return resolve({success: true});
        });
    }

    _getThumnbnameUrlFromServer = () => {
        let formData = new FormData();
        formData.append(
            "file",
            this.state.thumbnail
        );
        
        return this.props.postStore.uploadImage(formData)
            .then(res => {
                let array = [];
                res.files.forEach(file => {
                    array.push(file.filename);
                })
                // this.setState({imageUrls: array});
                this.setState({thumbnailUrl: array[0]});
                this.props.postStore.changeValue('thumbnail', array[0])
            })
            .catch(err => {
                console.error(err)
            });
    }

    _handleOnImageUpload = (images, insertImage) => {
        this._setImagesToState(images)
        .then(res => {
            if (res.success) {
                setTimeout(() => {
                    let formData = new FormData();

                    for (let i = 0; i < this.state.file.length; i++) {
                        formData.append(
                            "file",
                            this.state.file[i].multipart_form_data
                        );
                    }

                    // for (var key of formData.entries()) {
                    //     console.log(key[0] + ', ' + key[1]);
                    // }

                    return this.props.postStore.uploadImage(formData)
                    .then(res => {
                        let array = [];
                        res.files.forEach(file => {
                            array.push(file.filename);
                        })
                        this.setState({imageUrls: array});
                    })
                    .then(res => {
                        this.state.imageUrls.forEach(url => {
                            insertImage(`${staticUrl}${url}`);
                        });
                        this.setState({fileName: [], file: [], imageUrls: []});
                    })
                    .catch(err => {
                        console.error(err)
                    });
                }, 300);
            }
            return res;
        })
    }

    _handleClickOnButtonBack = () => {
        this.props.history.goBack();
    }

    _handleClickOnButtonPublish = () => {
        const { type, match: {params: {postId}} } = this.props;
        const contents = type === 'write' ? '작성한 내용대로 글을 작성할까요?' : '변경한 내용으로 수정할까요?';
        if (window.confirm(contents)) {
            if (type === 'write') {
                return this.props.postStore.createPost()
                .then((res) => {
                    this.props.history.goBack();
                });
            }
            if (type === 'edit') {
                return this.props.postStore.updatePost(postId)
                .then((res) => {
                    this.props.history.goBack();
                });
            }
        }
        return false;
    }

    _renderOptions = () => {
        return this.props.categoryStore.registry.map((category, i) => {
            return <option key={category.name} value={category.name}>{category.name}</option>
        });
    }

    renderTextarea = () => {
        $('#summernote').summernote({
            height: 300,                 // 에디터 높이
            minHeight: null,             // 최소 높이
            maxHeight: null,             // 최대 높이
            focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
            lang: "ko-KR",					// 한글 설정
            placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정
            
      });
    }



    _onTouchStart(e) {
        console.log('touch start')
        const touch = e.touches[0];
        this._swipe = { x: touch.clientX };
        this.setState({ swiped: false });
    }
    
    _onTouchMove(e) {
        console.log('touch move')
        if (e.changedTouches && e.changedTouches.length) {
            const touch = e.changedTouches[0];
            this._swipe.swiping = true;
        }
    }
    
    _onTouchEnd(e) {
        console.log('touch end')
        const touch = e.changedTouches[0];
        const absX = Math.abs(touch.clientX - this._swipe.x);
        if (this._swipe.swiping && absX > this.minDistance ) {
          this.props.onSwiped && this.props.onSwiped();
          this.setState({ swiped: true });
        }
        this._swipe = {};
      }

    render() {
        const { isLoading, value: {title, category, content} } = this.props.postStore;
        const { type } = this.props;

        if (isLoading) {
            return <div className={cx('Editor', {isLoading})}>
                <Loader />
                <p>에디터를 준비중입니다 ^^</p>
            </div>
        }
        return (
            <div className={cx('')}>     
                {/* <div
                    onTouchStart={this._onTouchStart}
                    onTouchMove={this._onTouchMove}
                    onTouchEnd={this._onTouchEnd}>
                    {`Component-${this.state.swiped ? 'swiped' : ''}`}
                </div> */}

                {/* <textarea name="summernote" id="summernote" /> */}

                <div role="textbox" contenteditable="true" aria-placeholder="5-digit zipcode" aria-labelledby="txtboxLabel" style={{background: 'red'}}></div> 


                <ReactSummernote
                    className={cx('')}
                    value={type === 'edit' ? content : ''}
                    ref={ref => this.editor = ref}
                    options={isMobile ? optionsForMobile : options}
                    onChange={this._handleOnChange}
                    onImageUpload={this._handleOnImageUpload}
                />
            </div>
        );
    }
}

export default TestEditor;