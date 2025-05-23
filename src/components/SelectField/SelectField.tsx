import React from 'react';
import styles from './SelectField.module.css';

type Option = {
    value: string;
    label: string;
};

type Props = {
    label: string; 
    name: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; 
    options: Option[]; 
    required?: boolean; 
};

const SelectField: React.FC<Props> = ({
    label,
    name,
    value,
    onChange,
    options,
    required = false,
}) => {
    return (
        <div className={styles['select-group']}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                aria-label={label}
            >
                <option value="">-- Seleccionar --</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectField;
