const options = {
    lang: 'ko-KR',
    height: '50vh',
    dialogsFade: true,
    dialogsInBody: true,
    tabDisable: true,
    fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Helvetica', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'NanumPenScript'],
    fontNamesIgnoreCheck: ['NanumPenScript'],
    placeholder: '어떤 글을 쓰고 싶으세요?',
    styleTags: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ],
    lineHeights: ['0.2', '0.4', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontSizes: ['8', '9', '10', '11', '12', '13', '14', '16', '18', '20', '24', '28', '36', '48', '64', '72', '84', '96'],
    
    toolbar: [
        ['misc', ['undo', 'redo']],
        ['fontName', ['fontname']],
        ['fontSize', ['fontsize', 'fontsizeunit']],
        ['font', ['color', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['link', 'picture', 'video', 'table', 'hr']],
        ['view', ['fullscreen', 'codeview', 'help']]
    ],
    popover: {
        image: [
            ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
            ['float', ['floatLeft', 'floatRight', 'floatNone']],
            ['remove', ['removeMedia']]
        ],
        link: [
            ['link', ['linkDialogShow', 'unlink']]
        ],
        table: [
            ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
            ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
        ],
        air: [
            ['color', ['color']],
            ['font', ['bold', 'underline', 'clear']],
            ['para', ['ul', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']]
        ]
    },
}

export default options;