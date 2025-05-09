import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import ContentList from '../../components/ContentList/ContentList';
import { Content } from '../../types/Content';
import { storage } from '../../utils/storage';
import styles from './Home.module.css';
import { ToastType } from '../../types/ToastType';

type Props = {
    porVer: Content[];
    setPorVer: React.Dispatch<React.SetStateAction<Content[]>>;
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>;
};

const Home: React.FC<Props> = ({ porVer, setPorVer, setWatched }) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    const handleMarkAsViewed = (item: Content) => {
        setWatched((prev) => [...prev, item]);
        setPorVer((prev) => prev.filter((el) => el.id !== item.id));
        setToast({ message: 'Marcado como visto', type: 'info' });
    };

    const handleDelete = (id: string) => {
        setPorVer((prev) => prev.filter((el) => el.id !== id));
        setToast({ message: 'Contenido eliminado', type: 'error' });
    };

    const handleReset = () => {
        if (window.confirm('¿Estás seguro que querés borrar todos los datos?')) {
            storage.clear();
            setPorVer([]);
            setWatched([]);
            setToast({ message: 'App reseteada', type: 'error' });
        }
    };

    return (
        <div className={styles['home-container']}>
            <div className={styles['header-actions']}>
                <Button text="Agregar Nuevo" variant="primary" onClick={() => navigate('/new')} />
                <Button text="Resetear App" variant="danger" onClick={handleReset} />
            </div>

            <ContentList
                content={porVer}
                title="Gestor de Películas y Series"
                subtitle="Organiza y lleva un registro de todo tu contenido favorito"
                onDelete={handleDelete}
                onMarkAsViewed={handleMarkAsViewed}
                emptyStateMessage="No hay contenido por ver. ¡Agrega algunas películas o series!"
                noResultsMessage="No se encontraron resultados con los filtros aplicados."
            />

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
