import React from 'react';
import './styles.css';

// Props que recibe el componente
type ButtonProps = {
    text: string; // Texto que se mostrará dentro del botón
    onClick: () => void; // Función que se ejecuta al hacer clic
    variant?: 'primary' | 'secondary' | 'danger'; // Variante visual (por defecto: 'primary')
};

const Button: React.FC<ButtonProps> = ({ text, onClick, variant = 'primary' }) => {
    return (
        // Se aplica una clase CSS dinámica según la variante: btn primary / btn danger / btn secondary
        <button className={`btn ${variant}`} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
