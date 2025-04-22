import { useState, useMemo } from 'react';
import { Content } from '../types/Content';

interface FilterState {
    searchQuery: string;
    selectedGenre: string;
    selectedType: string;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}

interface UseContentFilterReturn {
    filterState: FilterState;
    setSearchQuery: (query: string) => void;
    setSelectedGenre: (genre: string) => void;
    setSelectedType: (type: string) => void;
    setSortBy: (field: string) => void;
    setSortOrder: (order: 'asc' | 'desc') => void;
    filteredContent: Content[];
    availableGenres: string[];
}

export const useContentFilter = (content: Content[]): UseContentFilterReturn => {
    const [filterState, setFilterState] = useState<FilterState>({
        searchQuery: '',
        selectedGenre: '',
        selectedType: '',
        sortBy: '',
        sortOrder: 'asc'
    });

    const availableGenres = useMemo(() => {
        const genres = new Set(content.map(item => item.genero));
        return Array.from(genres);
    }, [content]);

    const filteredContent = useMemo(() => {
        return content
            .filter(item => {
                const matchesSearch = filterState.searchQuery === '' ||
                    item.titulo.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
                    item.director.toLowerCase().includes(filterState.searchQuery.toLowerCase());
                const matchesGenre = filterState.selectedGenre === '' || item.genero === filterState.selectedGenre;
                const matchesType = filterState.selectedType === '' || item.tipo === filterState.selectedType;
                return matchesSearch && matchesGenre && matchesType;
            })
            .sort((a, b) => {
                if (!filterState.sortBy) return 0;
                
                const compareValue = (a: Content, b: Content) => {
                    const aValue = a[filterState.sortBy as keyof Content];
                    const bValue = b[filterState.sortBy as keyof Content];
                    
                    if (aValue === undefined) return 1;
                    if (bValue === undefined) return -1;
                    
                    return filterState.sortOrder === 'asc' 
                        ? aValue > bValue ? 1 : aValue < bValue ? -1 : 0
                        : aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                };
                
                return compareValue(a, b);
            });
    }, [content, filterState]);

    const setSearchQuery = (query: string) => {
        setFilterState(prev => ({ ...prev, searchQuery: query }));
    };

    const setSelectedGenre = (genre: string) => {
        setFilterState(prev => ({ ...prev, selectedGenre: genre }));
    };

    const setSelectedType = (type: string) => {
        setFilterState(prev => ({ ...prev, selectedType: type }));
    };

    const setSortBy = (field: string) => {
        setFilterState(prev => ({ ...prev, sortBy: field }));
    };

    const setSortOrder = (order: 'asc' | 'desc') => {
        setFilterState(prev => ({ ...prev, sortOrder: order }));
    };

    return {
        filterState,
        setSearchQuery,
        setSelectedGenre,
        setSelectedType,
        setSortBy,
        setSortOrder,
        filteredContent,
        availableGenres
    };
}; 