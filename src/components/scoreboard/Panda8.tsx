import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

const Panda8: React.FC<SvgIconProps> = (props) => {
    return (
        <SvgIcon {...props} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#000" />
            <circle cx="8" cy="10" r="2" fill="#fff" />
            <circle cx="16" cy="10" r="2" fill="#fff" />
            <path d="M8 14c1.5 2 4.5 2 6 0" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            <text x="12" y="18" fill="#fff" fontSize="4" textAnchor="middle" alignmentBaseline="middle">8</text>
        </SvgIcon>
    );
};

export default Panda8;