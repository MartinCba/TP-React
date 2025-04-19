import React from 'react';
import './styles.css';

// Tipo de opción: valor que se guarda y etiqueta visible en el select
type Option = {
    value: string;
    label: string;
};

// Props que recibe el componente SelectField
type Props = {
    label: string; // Texto que se muestra arriba del select
    name: string; // Atributo name e id del select
    value: string; // Valor actual seleccionado
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; // Función que se ejecuta al cambiar de opción
    options: Option[]; // Lista de opciones disponibles para seleccionar
    required?: boolean; // Define si es obligatorio (opcional, por defecto es false)
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
        <div className="select-group">
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
