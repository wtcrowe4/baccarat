import React from 'react';

interface DotProps {
    size?: number;
    color?: string;
}

const Dot: React.FC<DotProps> = ({ size = 5, color = 'blue' }) => {
    const dotStyle: React.CSSProperties = {
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: '50%',
        display: 'inline-block',
    };

    return <div style={dotStyle}></div>;
};

export default Dot;