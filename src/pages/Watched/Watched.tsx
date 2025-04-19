import React, { useState, useMemo } from 'react';
import Title from '../../components/Title/Title';
import ContentCard from '../../components/ContentCard/ContentCard';
import Toast from '../../components/Toast/Toast';
import FilterSection from '../../components/FilterSection/FilterSection';
import StatsCounter from '../../components/StatsCounter/StatsCounter';
import { Content } from '../../types/Content';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ToastType } from '../../types/ToastType';

// Props que recibe el componente
type Props = {
    watched: Content[]; // Lista de contenidos vistos
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>; // Setter para actualizar la lista de contenidos vistos
};

const Watched: React.FC<Props> = ({ watched, setWatched }) => {
    // Hook para la navegación
    const navigate = useNavigate();
    // Estado para mostrar notificaciones tipo toast
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);
    // Estados para búsqueda y filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Obtiene los géneros únicos desde los contenidos vistos
    const availableGenres = useMemo(() => {
        const genres = new Set(watched.map(item => item.genero));
        return Array.from(genres);
    }, [watched]);

    // Filtrar y ordenar contenido
    const filteredContent = useMemo(() => {
        return watched
            // FILTRADO
            .filter(item => {
                // Filtro por título o director
                const matchesSearch = searchQuery === '' ||
                    item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.director.toLowerCase().includes(searchQuery.toLowerCase());
                // Filtro por género seleccionado
                const matchesGenre = selectedGenre === '' || item.genero === selectedGenre;
                // Filtro por tipo (película o serie)
                const matchesType = selectedType === '' || item.tipo === selectedType;
                // Solo se incluye si pasa los tres filtros
                return matchesSearch && matchesGenre && matchesType;
            })
            // ORDENAMIENTO
            .sort((a, b) => {
                // Si no se seleccionó campo para ordenar, no se aplica orden 
                if (!sortBy) return 0;
                // Función que compara los valores en base al campo sortBy y el orden
                const compareValue = (a: Content, b: Content) => {
                    // Obtiene los valores de 'a' y 'b' correspondientes al campo elegido (sortBy)
                    const aValue = a[sortBy as keyof Content];
                    const bValue = b[sortBy as keyof Content];
                    // Si alguno de los valores es undefined, lo tratamos como el menor
                    if (aValue === undefined) return 1;
                    if (bValue === undefined) return -1;
                    // Compara valores dependiendo del orden seleccionado (ascendente o descendente)
                    if (sortOrder === 'asc') {
                        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                    } else {
                        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
                    }
                };
                // Ejecuta la función de comparación para cada par
                return compareValue(a, b);
            });
        // Dependencias del useMemo: solo se recalcula si alguno de estos cambia
    }, [watched, searchQuery, selectedGenre, selectedType, sortBy, sortOrder]);

    // Elimina un contenido de la lista "vistos"
    const handleDelete = (id: string) => {
        setWatched((prev) => prev.filter((item) => item.id !== id));
        setToast({ message: 'Contenido eliminado de Vistos', type: 'error' });
    };
    // Redirige al formulario de edición, pasando el contenido y el origen
    const handleEdit = (item: Content) => {
        navigate('/edit', { state: { content: item, from: 'watched' } });
    };
    // Cambia el campo y orden de ordenamiento
    const handleSortChange = (field: string, order: 'asc' | 'desc') => {
        setSortBy(field);
        setSortOrder(order);
    };

    return (
        <div className="watched-container">
            <Title text="Contenido Visto" />

            <StatsCounter content={watched} title="Estadísticas - Visto" />

            <FilterSection
                searchQuery={searchQuery}
                selectedGenre={selectedGenre}
                selectedType={selectedType}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSearchChange={setSearchQuery}
                onGenreChange={setSelectedGenre}
                onTypeChange={setSelectedType}
                onSortChange={handleSortChange}
                availableGenres={availableGenres}
            />

            <div className="cards-grid">
                {filteredContent.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>
                        {watched.length === 0
                            ? 'Todavía no marcaste nada como visto.'
                            : 'No se encontraron resultados con los filtros aplicados.'}
                    </p>
                ) : (
                    filteredContent.map((item) => (
                        <ContentCard
                            key={item.id}
                            data={item}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => handleEdit(item)}
                        />
                    ))
                )}
            </div>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default Watched;
