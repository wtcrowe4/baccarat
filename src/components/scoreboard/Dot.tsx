import React from 'react';

interface DotProps {
    size?: number;
    color?: string;
    filled?: boolean;
}

const Dot: React.FC<DotProps> = ({ size = 5, color = 'blue', filled = true }) => {
    const dotStyle: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: '50%',
        display: 'inline-block',
        border: filled ? 'none' : `2px solid ${color}`,
        backgroundColor: filled ? color : 'transparent',

    };

    return <div style={dotStyle}></div>;
};

export default Dot;