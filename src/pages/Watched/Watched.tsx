import React, { useState } from 'react';
import Toast from '../../components/Toast/Toast';
import ContentList from '../../components/ContentList/ContentList';
import { Content } from '../../types/Content';
import { ToastType } from '../../types/ToastType';
import styles from './Watched.module.css';

type Props = {
    watched: Content[];
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>;
};

const Watched: React.FC<Props> = ({ watched, setWatched }) => {
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    const handleDelete = (id: string) => {
        setWatched((prev) => prev.filter((item) => item.id !== id));
        setToast({ message: 'Contenido eliminado de Vistos', type: 'error' });
    };

    return (
        <div className={styles['watched-container']}>
            <ContentList
                content={watched}
                title="Contenido Visto"
                subtitle="Gestiona tu lista de películas y series vistas"
                onDelete={handleDelete}
                emptyStateMessage="No hay contenido visto. ¡Agrega algunas películas o series!"
                noResultsMessage="No se encontraron resultados con los filtros aplicados."
                from="watched"
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

export default Watched;
