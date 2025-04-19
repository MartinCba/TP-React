import React from 'react';
import './styles.css';

// Props que recibe el componente
type Props = {
    value: string; // Valor actual del input (texto de búsqueda)
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al escribir
};

const SearchBar: React.FC<Props> = ({ value, onChange }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Buscar por título o director..."
                aria-label="Buscar por título o director"
            />
        </div>
    );
};

export default SearchBar; 