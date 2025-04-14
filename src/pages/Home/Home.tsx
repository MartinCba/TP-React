import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import ContentCard from '../../components/ContentCard/ContentCard';
import Button from '../../components/Button/Button';
import Toast from '../../components/Toast/Toast';
import { Content } from '../../types/Content';
import { storage } from '../../utils/storage';
import './styles.css';
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
        <>
            <Title text="Gestor de Películas y Series" />
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
                <Button text="Resetear App" variant="danger" onClick={handleReset} />
            </div>

            <h2 style={{ textAlign: 'center' }}>Por Ver</h2>
            <div className="cards-grid">
                {porVer.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>No hay contenido por ver.</p>
                ) : (
                    porVer.map((item) => (
                        <ContentCard
                            key={item.id}
                            data={item}
                            onMarkAsViewed={() => handleMarkAsViewed(item)}
                            onDelete={() => handleDelete(item.id)}
                            onEdit={() => navigate('/edit', { state: { content: item, from: 'home' } })}
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
        </>
    );
};

export default Home;
