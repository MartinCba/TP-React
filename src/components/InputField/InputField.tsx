import React from 'react';
import './styles.css';

// Definición de las props que recibe el componente
type InputFieldProps = {
    label: string; // Texto de la etiqueta que describe el campo
    type: 'text' | 'number'; // Tipo de input: puede ser texto o número
    name: string; // Nombre del input (también se usa como id)
    value: string | number; // Valor actual del campo
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al cambiar el valor
    required?: boolean; // Define si el campo es obligatorio (opcional, por defecto es false)
    min?: number; // Valor mínimo permitido (opcional, usado en inputs numéricos)
    max?: number; // Valor máximo permitido (opcional, usado en inputs numéricos)
    placeholder?: string; // Texto de ayuda que aparece cuando el input está vacío (opcional)
};

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    required = false,
    min,
    max,
    placeholder,
}) => {
    return (
        <div className="input-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                min={min}
                max={max}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InputField;
