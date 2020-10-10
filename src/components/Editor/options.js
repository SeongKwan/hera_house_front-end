const options = {
    lang: 'ko-KR',
    height: '60vh',
    dialogsFade: true,
    dialogsInBody: true,
    tabDisable: true,
    fontNames: ['Raleway', 'Poiret One', 'Lato', 'Nanum Gothic'],
    fontNamesIgnoreCheck: ['Raleway', 'Poiret One', 'Lato', 'Nanum Gothic'],
    placeholder: '여기에 글을 써주세요.',
    styleTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    lineHeights: ['0.2', '0.4', '0.6', '0.8', '1.0', '1.2', '1.4', '1.5', '2.0', '3.0'],
    fontSizes: ['8', '9', '10', '11', '12', '13', '14', '16', '18', '20', '24', '28', '36', '48', '64', '72', '84', '96'],
    toolbar: [
        ['misc', ['undo', 'redo']],
        ['fontName', ['fontname']],
        ['fontSize', ['fontsize', 'fontsizeunit']],
        ['font', ['color', 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
        ['para', ['style', 'ul', 'ol', 'paragraph', 'height']],
        ['insert', ['link', 'picture', 'video', 'table', 'hr']],
        ['view', ['help']]
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
        // table: [
        //     ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        //     ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
        // ],
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