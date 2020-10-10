import React, { Component } from 'react';
import styles from './Editor.module.scss';
import classNames from 'classnames/bind';
import './Editor.css';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { isMobile } from 'react-device-detect';
import ReactSummernote from 'react-summernote';
import 'react-summernote/lang/summernote-ko-KR'; // you can import any other locale
import 'summernote/dist/summernote-bs4';
import 'summernote/dist/summernote-bs4.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

import TextareaAutosize from 'react-textarea-autosize';
import options from './options';
import optionsForMobile from './optionsForMobile';
import staticUrl from '../../constants/staticUrl';
import Loader from '../Loader/Loader';

const cx = classNames.bind(styles);

@withRouter
@inject('postStore', 'categoryStore', 'editorStore')
@observer
class Editor extends Component {
    state = { leaving: false, fileName: [], file: [], imageUrls: [], thumbnail: '', thumbnailData: '', thumbnailUrl: '' }

    componentDidMount() {
        const { type } = this.props;
        this._initialize(type);
    }

    componentWillUnmount() {
        this.clearState();
        this.props.postStore.clear();
    }

    _initialize = async (type) => {
        this.props.editorStore.setLoadingState(true);

        const { postId } = this.props.match.params;
        await this.props.categoryStore.loadCategories()
            .then(res => {

                this.props.postStore.changeValue('category', res[0].name);
            })
            .catch(err => alert(err));
        if (type === 'edit') {
            await this.props.postStore.loadPost(postId)
                .then(res => {

                    this.setState({ thumbnailUrl: res.thumbnail });
                }).catch(err => alert(err));
        }
        await this._initEditor();
    }
    _initEditor = () => {

        this.props.editorStore.setLoadingState(false);
        this.editor.onInit(() => { console.log('init') });
    }

    clearState = () => {
        this.setState({ leaving: false, fileName: [], file: [], imageUrls: [], thumbnail: '', thumbnailData: '', thumbnailUrl: '' })
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
                return resolve({ success: true });
            } else {
                THIS.setState({
                    thumbnail: '',
                    thumbnailUrl: ''
                });
                THIS.props.postStore.changeValue('thumbnail', '')
                return resolve({ success: false });
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
            for (let i = 0; i < images.length; i++) {
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
                            THIS.setState({ fileName: THIS.state.fileName.concat(concatName), file: THIS.state.file.concat(concatFile) }, () => { });
                        };
                    }
                }
            }
            return resolve({ success: true });
        });
    }

    _getThumnbnameUrlFromServer = () => {
        let formData = new FormData();
        formData.append(
            "file",
            this.state.thumbnail
        );

        // console.log(formData)

        return this.props.postStore.uploadImage(formData)
            .then(res => {
                // console.log(JSON.parse(JSON.stringify(res.files)))
                let array = [];
                res.files.forEach(file => {
                    array.push(file.filename);
                })
                // this.setState({imageUrls: array});
                this.setState({ thumbnailUrl: array[0] });
                this.props.postStore.changeValue('thumbnail', array[0])
            })
            .catch(err => {
                console.error(err)
            });
    }

    _handleOnImageUpload = (images, insertImage) => {
        // console.log(images)
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
                                this.setState({ imageUrls: array });
                            })
                            .then(res => {
                                this.state.imageUrls.forEach(url => {
                                    insertImage(`${staticUrl}${url}`);
                                });
                                this.setState({ fileName: [], file: [], imageUrls: [] });
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
        const { type, match: { params: { postId } } } = this.props;
        const { category } = this.props.postStore.value;
        const contents = type === 'write' ? '작성한 내용대로 글을 저장합니다' : '변경한 내용으로 수정할까요?';
        if (window.confirm(contents)) {
            if (type === 'write') {
                return this.props.postStore.createPost()
                    .then((res) => {
                        this.props.history.goBack();
                    }).catch(err => console.log(err));
            }
            if (type === 'edit') {
                this.setState({ leaving: !this.state.leaving });
                return this.props.postStore.updatePost(postId)
                    .then((res) => {
                        if (window.confirm('수정된 글을 확인하러 가시겠습니까?')) {
                            return this.props.history.push(`/archive/${category}/${postId}`);
                        }
                        this.props.history.goBack();
                    }).catch(err => console.log);
            }
        }
        return false;
    }

    _renderOptions = () => {
        return this.props.categoryStore.registry.map((category, i) => {
            return <option key={category.name} value={category.name}>{category.name}</option>
        });
    }

    render() {
        const { value: { title, category, content }, titleIsEmpty } = this.props.postStore;
        const { type } = this.props;

        if (this.props.editorStore.isLoading) {
            return <div className={cx('Editor', { 'isLoading': this.props.editorStore.isLoading })}>
                <Loader />
                {
                    !this.state.leaving ?
                        <p>에디터를 준비중입니다 ^^</p>
                        : <p>목록으로 돌아가는 중...</p>
                }
            </div>
        }
        return (
            <div className={cx('Editor', 'Editor-Only')}>
                <div className={cx('wrapper-textarea')}>
                    <TextareaAutosize
                        autoFocus={type !== 'edit'}
                        className={cx('textarea-post-title')}
                        name="title"
                        id="postTitle"
                        type="text"
                        placeholder="제목을 입력해 주세요"
                        onChange={this._handleChangeValue}
                        value={title}
                    />
                </div>
                <div className={cx('wrapper-category-thumbnail')}>
                    <div className={cx('category')}>
                        <label hidden htmlFor="select-category">분류</label>
                        <select
                            id="select-category"
                            name="category"
                            value={category}
                            onChange={this._handleChangeValue}
                        >
                            <option disabled>카테고리 선택</option>
                            {this._renderOptions()}
                        </select>
                    </div>
                    <div className={cx('preview')}>
                        <label htmlFor="input-thumbnail">
                            썸네일 업로드
                            <input
                                id="input-thumbnail"
                                className={cx('file-input')}
                                type="file"
                                hidden
                                onChange={(e) =>
                                    this._handleImageChange(e)
                                        .then(res => {
                                            if (res.success) {
                                                setTimeout(() => {
                                                    this._getThumnbnameUrlFromServer();
                                                }, 300);
                                            }
                                        })
                                }
                            />
                        </label>
                        {
                            this.state.thumbnailUrl !== '' ?
                                <figure>
                                    <img src={`${staticUrl}${this.state.thumbnailUrl}`} alt="thumbnail preview" />
                                </figure>
                                : <div className={cx('fake-img')}>미리보기</div>
                        }
                        <div className={cx('thumbnail-tip-flexbox')}>
                            <div className={cx('thumbnail-tip')}>썸네일 최적 크기(가로, 세로)</div>
                            <div className={cx('thumbnail-tip')}>- (기본) 540 * 540</div>
                            <div className={cx('thumbnail-tip')}>- (Clothing) 540 * 810</div>
                        </div>
                    </div>
                </div>
                <ReactSummernote
                    className={cx('editor-container', 'Post-CSS')}
                    value={type === 'edit' ? content : ''}
                    ref={ref => this.editor = ref}
                    autoFocus={type === 'edit'}
                    options={
                        isMobile ? optionsForMobile : options
                    }

                    onChange={this._handleOnChange}
                    onImageUpload={this._handleOnImageUpload}
                />
                <div className={cx('wrapper-buttons')}>
                    <button className={cx('button', 'button-back')} onClick={this._handleClickOnButtonBack}>취소</button>

                    <button disabled={titleIsEmpty} className={cx('button', 'button-publish', { "disabled": titleIsEmpty })} onClick={this._handleClickOnButtonPublish}>
                        {titleIsEmpty ? '제목이 필요해요' : type === "write" ? '저장하기' : '수정하기'}
                    </button>
                </div>
            </div>
        );
    }
}

export default Editor;