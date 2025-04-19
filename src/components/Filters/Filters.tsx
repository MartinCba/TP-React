import React from 'react';
import SelectField from '../SelectField/SelectField';
import SearchBar from '../SearchBar/SearchBar';
import { Content } from '../../types/Content';
import './styles.css';

// Props que recibe el componente 
type Props = {
    content: Content[]; // Lista de contenidos disponibles
    filters: {
        search: string; // Texto de búsqueda
        type: string;  // Tipo seleccionado (película o serie)
        genre: string; // Género seleccionado
    };
    onFilterChange: (name: string, value: string) => void; // Función para actualizar cualquier filtro
};

const Filters: React.FC<Props> = ({ content, filters, onFilterChange }) => {
    // Obtiene los tipos únicos del contenido (película o serie)
    const uniqueTypes = Array.from(new Set(content.map((item) => item.tipo)));
    // Obtiene los géneros únicos del contenido
    const uniqueGenres = Array.from(new Set(content.map((item) => item.genero)));

    return (
        <div className="filters-container">
            <div className="filters">
                <div className="filters-left">
                    <SelectField
                        label="Género"
                        name="genre"
                        value={filters.genre}
                        onChange={(e) => onFilterChange('genre', e.target.value)}
                        options={uniqueGenres.map((genre) => ({ value: genre, label: genre }))}
                    />
                    <SelectField
                        label="Tipo"
                        name="type"
                        value={filters.type}
                        onChange={(e) => onFilterChange('type', e.target.value)}
                        options={uniqueTypes.map((type) => ({ value: type, label: type }))}
                    />
                </div>
                <div className="filters-right">
                    <SearchBar
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Filters; 