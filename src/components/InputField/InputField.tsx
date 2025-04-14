import React from 'react';
import './styles.css';

type InputFieldProps = {
    label: string;
    type: 'text' | 'number';
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    min?: number;
    max?: number;
    placeholder?: string;
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
