import React from 'react';

const Bar = ({ height, width, color, id }) => {
    return (
        <div 
            id={`${id}`}
            className='bar'
            style={{
                    height: height,
                    width: width,
                    backgroundColor: color
                }}
        >
        </div>
    );
};

export default Bar;