import React from 'react';
import SelectField from '../SelectField/SelectField';
import SearchBar from '../SearchBar/SearchBar';
import { Content } from '../../types/Content';
import styles from './Filters.module.css';

type Props = {
    content: Content[]; 
    filters: {
        search: string; 
        type: string;  
        genre: string; 
    };
    onFilterChange: (name: string, value: string) => void; 
};

const Filters: React.FC<Props> = ({ content, filters, onFilterChange }) => {
    const uniqueTypes = Array.from(new Set(content.map((item) => item.tipo)));
    const uniqueGenres = Array.from(new Set(content.map((item) => item.genero)));

    return (
        <div className={styles['filters-container']}>
            <div className={styles.filters}>
                <div className={styles['filters-left']}>
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
                <div className={styles['filters-right']}>
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