function contentStyle(mobile) {
    return {
        content: {
            top: mobile === 'none' ? '45%' : '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: mobile === 'none' ? '95vw' : '800px',
            height: mobile === 'none' ? '75vh' : '500px',
            maxHeight: '500px',
        },
    };
}

export default contentStyle;
