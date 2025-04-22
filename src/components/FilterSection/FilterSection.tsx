import React from 'react';
import SelectField from '../SelectField/SelectField';
import SearchBar from '../SearchBar/SearchBar';
import './styles.css';

type FilterSectionProps = {
    searchQuery: string; 
    selectedGenre: string; 
    selectedType: string; 
    sortBy: string; 
    sortOrder: 'asc' | 'desc'; 
    onSearchChange: (value: string) => void; 
    onGenreChange: (value: string) => void; 
    onTypeChange: (value: string) => void; 
    onSortChange: (field: string, order: 'asc' | 'desc') => void; 
    availableGenres: string[]; 
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
    const typeOptions = [
        { value: 'pelicula', label: 'Película' },
        { value: 'serie', label: 'Serie' }
    ];
    const sortOptions = [
        { value: 'anio', label: 'Año' },
        { value: 'rating', label: 'Rating' }
    ];
    const genreOptions = availableGenres.map(genre => ({
        value: genre,
        label: genre
    }));

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSortChange(e.target.value, sortOrder); 
    };

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