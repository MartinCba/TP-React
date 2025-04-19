import React from 'react';
import './styles.css';

// Define las props que recibe el componente
type Props = {
    text: string; // Texto que se va a mostrar en el título
};

const Title: React.FC<Props> = ({ text }) => {
    return <h1 className="main-title">{text}</h1>;
};

export default Title;
