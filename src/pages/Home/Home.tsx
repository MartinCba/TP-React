import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import ContentCard from '../../components/ContentCard/ContentCard';
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import FilterSection from '../../components/FilterSection/FilterSection';
import StatsCounter from '../../components/StatsCounter/StatsCounter';
import { Content } from '../../types/Content';
import { storage } from '../../utils/storage';
import './styles.css';
import { ToastType } from '../../types/ToastType';

// Props que recibe el componente Home
type Props = {
    porVer: Content[];// Lista de contenido por ver
    setPorVer: React.Dispatch<React.SetStateAction<Content[]>>; // Setter de porVer
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>; // Setter de watched
};

const Home: React.FC<Props> = ({ porVer, setPorVer, setWatched }) => {
    // Hook para navegar entre rutas
    const navigate = useNavigate();
    // Estado para mostrar notificaciones
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);
    // Estados para búsqueda y filtros
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    // Obtiene los géneros únicos disponibles a partir de la lista porVer
    const availableGenres = useMemo(() => {
        const genres = new Set(porVer.map(item => item.genero));
        return Array.from(genres);
    }, [porVer]);

    // Filtra y ordena el contenido según los filtros y el orden seleccionado
    // useMemo memoriza el resultado de esta operación costosa (filtrado + ordenamiento) y solo se vuelve a ejecutar si cambian las dependencias
    const filteredContent = useMemo(() => {
        return porVer
            // FILTRADO
            .filter(item => {
                // Filtro por búsqueda: coincide si el campo de búsqueda está vacío o si el título o director contiene el texto ingresado (sin distinguir mayúsculas/minúsculas)
                const matchesSearch = searchQuery === '' ||
                    item.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.director.toLowerCase().includes(searchQuery.toLowerCase());
                // Filtro por género: si no se seleccionó ninguno, deja pasar todos, si se seleccionó, solo los que coincidan
                const matchesGenre = selectedGenre === '' || item.genero === selectedGenre;
                // Filtro por tipo (película o serie)
                const matchesType = selectedType === '' || item.tipo === selectedType;
                // Devuelve true solo si pasa los 3 filtros
                return matchesSearch && matchesGenre && matchesType;
            })
            // ORDENAMIENTO
            .sort((a, b) => {
                // Si no se seleccionó un campo por el cual ordenar, no se hace ningún ordenamiento
                if (!sortBy) return 0;
                // Función auxiliar para comparar dos elementos basados en el campo seleccionado
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
    }, [porVer, searchQuery, selectedGenre, selectedType, sortBy, sortOrder]);

    // Mueve un contenido de porVer a watched
    const handleMarkAsViewed = (item: Content) => {
        setWatched((prev) => [...prev, item]);
        setPorVer((prev) => prev.filter((el) => el.id !== item.id));
        setToast({ message: 'Marcado como visto', type: 'info' });
    };

    // Elimina un contenido de la lista porVer
    const handleDelete = (id: string) => {
        setPorVer((prev) => prev.filter((el) => el.id !== id));
        setToast({ message: 'Contenido eliminado', type: 'error' });
    };

    // Limpia todos los datos de localStorage y estados
    const handleReset = () => {
        if (window.confirm('¿Estás seguro que querés borrar todos los datos?')) {
            storage.clear();
            setPorVer([]);
            setWatched([]);
            setToast({ message: 'App reseteada', type: 'error' });
        }
    };

    // Cambia los criterios de ordenamiento
    const handleSortChange = (field: string, order: 'asc' | 'desc') => {
        setSortBy(field);
        setSortOrder(order);
    };

    return (
        <div className="home-container">
            <div className="title-section">
                <h1>Gestor de Películas y Series</h1>
                <p>Organiza y lleva un registro de todo tu contenido favorito</p>
            </div>

            <div className="header-actions">
                <Button text="Agregar Nuevo" variant="primary" onClick={() => navigate('/new')} />
                <Button text="Resetear App" variant="danger" onClick={handleReset} />
            </div>

            <div className="stats-section">
                <StatsCounter content={porVer} title="Estadísticas - Por Ver" />
            </div>

            <div className="filter-section">
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
            </div>

            <h2 className="section-title">Contenido Por Ver</h2>

            {filteredContent.length === 0 ? (
                <div className="empty-state">
                    <p>
                        {porVer.length === 0
                            ? 'No hay contenido por ver. ¡Agrega algunas películas o series!'
                            : 'No se encontraron resultados con los filtros aplicados.'}
                    </p>
                    {porVer.length === 0 && (
                        <Button
                            text="Agregar Contenido"
                            variant="primary"
                            onClick={() => navigate('/new')}
                        />
                    )}
                </div>
            ) : (
                <div className="cards-grid">
                    {filteredContent.map((item) => (
                        <ContentCard
                            key={item.id}
                            data={item}
                            onMarkAsViewed={() => handleMarkAsViewed(item)}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => navigate('/edit', { state: { content: item, from: 'home' } })}
                        />
                    ))}
                </div>
            )}

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

export default Home;
