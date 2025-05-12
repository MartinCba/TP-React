import React from 'react';
import './styles.css';

type ButtonProps = {
    text: string; 
    onClick?: () => void; 
    variant?: 'primary' | 'secondary' | 'danger'; 
    type?: 'button' | 'submit' | 'reset';
};

const Button: React.FC<ButtonProps> = ({ 
    text, 
    onClick, 
    variant = 'primary',
    type = 'button'
}) => {
    return (
        <button 
            className="p-2 w-10 border-rounded " 
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};

export default Button;
