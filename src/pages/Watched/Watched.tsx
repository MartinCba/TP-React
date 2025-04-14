import React, { useState } from 'react';
import Title from '../../components/Title/Title';
import ContentCard from '../../components/ContentCard/ContentCard';
import Toast from '../../components/Toast/Toast';
import { Content } from '../../types/Content';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { ToastType } from '../../types/ToastType';

type Props = {
    watched: Content[];
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>;
};

const Watched: React.FC<Props> = ({ watched, setWatched }) => {
    const navigate = useNavigate();
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    const handleDelete = (id: string) => {
        setWatched((prev) => prev.filter((item) => item.id !== id));
        setToast({ message: 'Contenido eliminado de Vistos', type: 'error' });
    };

    const handleEdit = (item: Content) => {
        navigate('/edit', { state: { content: item, from: 'watched' } });
    };

    return (
        <div className="watched-container">
            <Title text="Contenido Visto" />
            <div className="cards-grid">
                {watched.length === 0 ? (
                    <p style={{ textAlign: 'center' }}>Todavía no marcaste nada como visto.</p>
                ) : (
                    watched.map((item) => (
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
