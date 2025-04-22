import React from 'react';
import './styles.css';

type Props = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
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