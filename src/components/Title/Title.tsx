import React from 'react';
import './styles.css';

type Props = {
    text: string; 
};

const Title: React.FC<Props> = ({ text }) => {
    return <h1 className="main-title">{text}</h1>;
};

export default Title;
