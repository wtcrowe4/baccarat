// Slash to be used on the scoreboard

import React from 'react';

interface SlashProps {
    size?: number;
    color?: string;
}

const Slash: React.FC<SlashProps> = ({ size = 5, color = 'blue' }) => {
    const slashStyle: React.CSSProperties = {
        width: size,
        height: size,
        display: 'inline-block',
        backgroundColor: color,
        transform: 'rotate(45deg)',
        margin: '0 5px',
    };

    return <div style={slashStyle}></div>;
};

export default Slash;