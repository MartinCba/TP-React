import React from 'react';
import SelectField from '../SelectField/SelectField';
import SearchBar from '../SearchBar/SearchBar';
import './styles.css';

// Tipo de props que recibe el componente
type FilterSectionProps = {
    searchQuery: string; // Texto ingresado en la búsqueda
    selectedGenre: string; // Género seleccionado
    selectedType: string; // Tipo (película o serie) seleccionado
    sortBy: string; // Campo por el que se ordena (anio o rating)
    sortOrder: 'asc' | 'desc'; // Orden ascendente o descendente
    onSearchChange: (value: string) => void; // Función para cambiar el texto de búsqueda
    onGenreChange: (value: string) => void; // Función para cambiar el género
    onTypeChange: (value: string) => void; // Función para cambiar el tipo
    onSortChange: (field: string, order: 'asc' | 'desc') => void; // Función para cambiar el campo y el orden de ordenamiento
    availableGenres: string[]; // Lista de géneros disponibles para mostrar en el select
};

const FilterSection: React.FC<FilterSectionProps> = ({
    searchQuery,
    selectedGenre,
    selectedType,
    sortBy,
    sortOrder,
    onSearchChange,
    onGenreChange,
    onTypeChange,
    onSortChange,
    availableGenres,
}) => {
    // Opciones para el select de tipo
    const typeOptions = [
        { value: 'pelicula', label: 'Película' },
        { value: 'serie', label: 'Serie' }
    ];
    // Opciones para el select de ordenamiento
    const sortOptions = [
        { value: 'anio', label: 'Año' },
        { value: 'rating', label: 'Rating' }
    ];
    // Mapea los géneros disponibles en el formato esperado por el componente SelectField
    const genreOptions = availableGenres.map(genre => ({
        value: genre,
        label: genre
    }));

    // Maneja el cambio del campo por el que se ordena
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value, sortOrder); // Mantiene el orden actual
    };

    // Cambia el orden (ascendente ↔ descendente)
    const toggleSortOrder = () => {
        onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="filters-container">
            <div className="filters">
                <div className="filters-left">
                    <SelectField
                        label="Género"
                        name="genre"
                        value={selectedGenre}
                        onChange={(e) => onGenreChange(e.target.value)}
                        options={genreOptions}
                    />
                    <SelectField
                        label="Tipo"
                        name="type"
                        value={selectedType}
                        onChange={(e) => onTypeChange(e.target.value)}
                        options={typeOptions}
                    />
                    <div className="sort-group">
                        <SelectField
                            label="Ordenar"
                            name="sortBy"
                            value={sortBy}
                            onChange={handleSortChange}
                            options={sortOptions}
                        />
                        <button
                            className="sort-order-button"
                            onClick={toggleSortOrder}
                            title={`Orden ${sortOrder === 'asc' ? 'ascendente' : 'descendente'}`}
                        >
                            {sortOrder === 'asc' ? '↑' : '↓'}
                        </button>
                    </div>
                </div>
                <div className="filters-right">
                    <SearchBar
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterSection; 