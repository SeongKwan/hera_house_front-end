import React, { Component } from 'react';
import styles from './Editor.module.scss';
import classNames from 'classnames/bind';
import './Editor.css';
import { withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import TextareaAutosize from 'react-textarea-autosize';
import staticUrl from '../../constants/staticUrl';
import Loader from '../Loader/Loader';

import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.scss';

import ImageUploader from 'quill-image-uploader';
import * as QuillConfig from '../../constants/quillConfig';

const cx = classNames.bind(styles);

var Size = Quill.import('attributors/style/size');
Size.whitelist = QuillConfig.fontSize;
Quill.register(Size, true);
let Font = Quill.import('formats/font');
// We do not add Sans Serif since it is the default
Font.whitelist = QuillConfig.font;
Quill.register(Font, true);

Quill.register('modules/imageUploader', ImageUploader);

var Parchment = window.Quill.import('parchment');
const config = {
    scope: Parchment.Scope.BLOCK,
    whitelist: QuillConfig.AvailableLineHeights,
};
var lineHtClass = new Parchment.Attributor.Class(
    'line-height',
    'ql-line-height',
    config,
);
var lineHtStyle = new Parchment.Attributor.Style(
    'line-height',
    'line-height',
    config,
);

Parchment.register(lineHtClass);
Parchment.register(lineHtStyle);

const CustomToolbar = () => (
    <div id="toolbar">
        <span className="ql-formats">
            <button className="ql-header" value="1" />
            <button className="ql-header" value="2" />
            <select className="ql-font" defaultValue="Spartan400">
                <option value="Spartan100">Spartan100</option>
                <option value="Spartan100">Spartan200</option>
                <option value="Spartan300">Spartan300</option>
                <option value="Spartan400">Spartan400</option>
                <option value="Spartan500">Spartan500</option>
                <option value="Spartan500">Spartan600</option>
                <option value="Spartan700">Spartan700</option>
                <option value="Spartan700">Spartan800</option>
                <option value="Spartan900">Spartan900</option>
                <option value="NotoSansKR100">NotoSansKR100</option>
                <option value="NotoSansKR300">NotoSansKR300</option>
                <option value="NotoSansKR300">NotoSansKR400</option>
                <option value="NotoSansKR500">NotoSansKR500</option>
                <option value="NotoSansKR700">NotoSansKR700</option>
                <option value="NotoSansKR900">NotoSansKR900</option>
            </select>
            <select className="ql-size" defaultValue="13px">
                {Size.whitelist.map((size) => (
                    <option key={`font-size-${size}`} value={size}>
                        {size}
                    </option>
                ))}
            </select>
            <select className="ql-line-height" defaultValue="1.4">
                {[...Array(25).keys()].map((x, index) => (
                    <option
                        key={`line-height-option-${index}`}
                        value={`${(60.0 + x * 10.0) / 100.0}`}
                    ></option>
                ))}
            </select>
            <button className="ql-bold" />
            <button className="ql-italic" />
            <button className="ql-underline" />
            <button className="ql-strike" />
            <select className="ql-color" />
            <select className="ql-background" />
        </span>
        <span className="ql-formats">
            <select className="ql-align" />
            {/* <button className="ql-list" value="ordered" /> */}
            {/* <button className="ql-list" value="bullet" /> */}
            {/* <button className="ql-indent" value="-1" /> */}
            {/* <button className="ql-indent" value="+1" /> */}
            <button className="ql-script" value="sub" />
            <button className="ql-script" value="super" />
        </span>
        <span className="ql-formats">
            <button className="ql-link" />
            <button className="ql-image" />
            {/* <button className="ql-video" /> */}
        </span>
        <span className="ql-formats">
            <button className="ql-clean" />
        </span>
    </div>
);

@withRouter
@inject('postStore', 'categoryStore', 'editorStore')
@observer
class Editor extends Component {
    state = {
        value: '',
        leaving: false,
        fileName: [],
        file: [],
        imageUrls: [],
        thumbnail: '',
        thumbnailData: '',
        thumbnailUrl: '',
    };
    modules = {
        toolbar: {
            container: '#toolbar',
        },
        imageUploader: {
            upload: (file) => {
                let formData = new FormData();
                formData.append('file', file);

                return this.props.postStore
                    .uploadImage(formData)
                    .then((res) => {
                        let array = [];
                        res.files.forEach((file) => {
                            array.push(file.filename);
                        });
                        return `${staticUrl}/${array[0]}`;
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            },
        },
    };

    componentDidMount() {
        const { type } = this.props;
        window.scrollTo(0, 0);
        this._initialize(type);
    }

    componentWillUnmount() {
        this.clearState();
        this.props.postStore.clear();
    }

    imageHandler() {}

    _initialize = async (type) => {
        this.props.editorStore.setLoadingState(true);

        const { postId } = this.props.match.params;
        await this.props.categoryStore
            .loadCategories()
            .then((res) => {
                this.props.postStore.changeValue('category', '');
            })
            .catch((err) => alert(err));
        await this.props.categoryStore
            .loadSubCategories()
            .then((res) => {
                this.props.postStore.changeValue('subCategory', '');
            })
            .catch((err) => alert(err));

        if (type === 'edit') {
            await this.props.postStore
                .loadPost(postId)
                .then((res) => {
                    this.setState({ thumbnailUrl: res.thumbnail });
                })
                .catch((err) => alert(err));
        } else {
            this.props.postStore.changeValue('type', 'projects');
        }
        this._initEditor();
    };
    _initEditor = () => {
        this.props.editorStore.setLoadingState(false);
    };

    clearState = () => {
        this.setState({
            value: '',
            leaving: false,
            fileName: [],
            file: [],
            imageUrls: [],
            thumbnail: '',
            thumbnailData: '',
            thumbnailUrl: '',
        });
    };

    _handleChangeValue = (e) => {
        const { value, name: type } = e.target;
        this.props.postStore.changeValue(type, value);
    };

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
                        thumbnailData: reader.result,
                    });
                };
                reader.readAsDataURL(file);
                return resolve({ success: true });
            } else {
                THIS.setState({
                    thumbnail: '',
                    thumbnailUrl: '',
                });
                THIS.props.postStore.changeValue('thumbnail', '');
                return resolve({ success: false });
            }
        });
    }

    _getThumbnailUrlFromServer = () => {
        let formData = new FormData();
        formData.append('file', this.state.thumbnail);

        return this.props.postStore
            .uploadImage(formData)
            .then((res) => {
                let array = [];
                res.files.forEach((file) => {
                    array.push(file.filename);
                });
                this.setState({ thumbnailUrl: array[0] });
                this.props.postStore.changeValue('thumbnail', array[0]);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    _handleClickOnButtonBack = () => {
        this.props.history.goBack();
    };

    _handleClickOnButtonPublish = () => {
        const {
            type,
            match: {
                params: { postId },
            },
        } = this.props;

        const contents =
            type === 'write'
                ? '작성한 내용대로 글을 저장합니다'
                : '변경한 내용으로 수정할까요?';
        if (window.confirm(contents)) {
            if (type === 'write') {
                return this.props.postStore
                    .createPost()
                    .then((res) => {
                        this.props.history.goBack();
                    })
                    .catch((err) => console.log(err));
            }
            if (type === 'edit') {
                this.setState({ leaving: !this.state.leaving });
                return this.props.postStore
                    .updatePost(postId)
                    .then((res) => {
                        this.props.history.goBack();
                    })
                    .catch((err) => console.log);
            }
        }
        return false;
    };

    _renderOptions = (postType) => {
        return this.props.categoryStore.registry.map((category, i) => {
            if (category.type !== postType) return false;
            return (
                <option key={category.name} value={category.name}>
                    {category.name}
                </option>
            );
        });
    };

    _renderSubCategoryOptions = () => {
        return this.props.categoryStore.registryForSubCategories.map(
            (category, i) => {
                return (
                    <option key={category.name} value={category.name}>
                        {category.name}
                    </option>
                );
            },
        );
    };

    _handleOnChanged = (value) => {
        this.props.postStore.changeValue('content', value);
    };

    render() {
        const {
            value: { title, type: postType, category, content },
            titleIsEmpty,
        } = this.props.postStore;
        const { type: EditorType } = this.props;

        if (this.props.editorStore.isLoading) {
            return (
                <div
                    className={cx('Editor', {
                        isLoading: this.props.editorStore.isLoading,
                    })}
                >
                    <Loader />
                    {!this.state.leaving ? (
                        <p>에디터를 준비중입니다 ^^</p>
                    ) : (
                        <p>목록으로 돌아가는 중...</p>
                    )}
                </div>
            );
        }
        return (
            <div className={cx('Editor', 'Editor-Only')}>
                {/* 제목입력란 */}
                <div className={cx('wrapper-textarea')}>
                    <TextareaAutosize
                        autoFocus={EditorType !== 'edit'}
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
                    {/* 유형선택란 */}
                    <div className={cx('categories-container')}>
                        <div className={cx('type')}>
                            <label hidden htmlFor="select-type">
                                유형
                            </label>
                            <select
                                id="select-type"
                                name="type"
                                value={postType}
                                onChange={this._handleChangeValue}
                            >
                                <option disabled>유형 선택</option>
                                <option value="projects">Projects</option>
                                <option value="archives">Archives</option>
                            </select>
                        </div>
                        {/* 대분류 선택란 */}
                        <div className={cx('category')}>
                            <label hidden htmlFor="select-category">
                                분류
                            </label>
                            <select
                                id="select-category"
                                name="category"
                                value={category}
                                onChange={this._handleChangeValue}
                            >
                                <option disabled>카테고리 선택</option>
                                <option value="">선택안함</option>
                                {this._renderOptions(postType)}
                            </select>
                        </div>
                        {/* 소분류 선택란 */}
                        {/* <div className={cx('subCategory')}>
                            <label hidden htmlFor="select-subCategory">
                                소분류
                            </label>
                            <select
                                id="select-subCategory"
                                name="subCategory"
                                value={subCategory}
                                onChange={this._handleChangeValue}
                                disabled={
                                    postType !== 'archives' ||
                                    category !== 'Work'
                                }
                            >
                                <option disabled>소분류 선택</option>
                                <option value="">선택안함</option>
                                {this._renderSubCategoryOptions()}
                            </select>
                        </div> */}
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
                                    this._handleImageChange(e).then((res) => {
                                        if (res.success) {
                                            setTimeout(() => {
                                                this._getThumbnailUrlFromServer();
                                            }, 300);
                                        }
                                    })
                                }
                            />
                        </label>
                        {this.state.thumbnailUrl !== '' ? (
                            <figure>
                                <img
                                    src={`${staticUrl}/${this.state.thumbnailUrl}`}
                                    alt="thumbnail preview"
                                />
                            </figure>
                        ) : (
                            <div className={cx('fake-img')}>미리보기</div>
                        )}
                        <div className={cx('thumbnail-tip-flexbox')}>
                            <div className={cx('thumbnail-tip')}>
                                썸네일 최적 크기(가로, 세로)
                            </div>
                            <div className={cx('thumbnail-tip')}>
                                - (기본) 540 * 540
                            </div>
                            <div className={cx('thumbnail-tip')}>
                                - (Clothing) 540 * 810
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('editor-toolbar-container')}>
                    <CustomToolbar />
                </div>
                <div
                    id="editor-scroll-container"
                    className={cx('editor-scroll-container')}
                >
                    <ReactQuill
                        ref={(ref) => (this.editor = ref)}
                        theme="snow"
                        placeholder="React Quill Rich Text Editor"
                        modules={this.modules}
                        value={content}
                        onChange={this._handleOnChanged}
                    />
                </div>
                <div className={cx('wrapper-buttons')}>
                    <button
                        className={cx('button', 'button-back')}
                        onClick={this._handleClickOnButtonBack}
                    >
                        취소
                    </button>

                    <button
                        disabled={titleIsEmpty}
                        className={cx('button', 'button-publish', {
                            disabled: titleIsEmpty,
                        })}
                        onClick={this._handleClickOnButtonPublish}
                    >
                        {titleIsEmpty
                            ? '제목이 필요해요'
                            : EditorType === 'write'
                            ? '저장하기'
                            : '수정하기'}
                    </button>
                </div>
            </div>
        );
    }
}

{
    /* <select className="ql-font">
    <option value="NotoSansKR100">NotoSansKR100</option>
    <option value="NotoSansKR300">NotoSansKR300</option>
    <option value="NotoSansKR500">NotoSansKR500</option>
    <option value="NotoSansKR700">NotoSansKR700</option>
    <option value="NotoSansKR900">NotoSansKR900</option>
    <option value="Spartan100">Spartan100</option>
    <option value="Spartan300">Spartan300</option>
    <option value="Spartan500">Spartan500</option>
    <option value="Spartan700">Spartan700</option>
    <option value="Spartan900">Spartan900</option>
</select> */
}

export default Editor;
