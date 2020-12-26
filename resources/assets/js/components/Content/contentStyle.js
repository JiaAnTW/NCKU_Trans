export function contentStyle(mobile) {
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

export const cardStyle = (cardHeight) => ({
    position: 'absolute',
    top: '0px',
    height: cardHeight,
    overflowX: 'inline',
    overflowY: 'auto',
    left: '0px',
    backgroundColor: '#F5F5F5',
    border: 'none',
    transform: 'translate(0,0)',
});

export const cardTextStyle = {
    position: 'relative',
    top: '5px',
    textAlign: 'justify',
};

export const pStyle = { width: '100%', height: '70px' };
