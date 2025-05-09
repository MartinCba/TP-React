import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from '../../components/Title/Title';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import Toast from '../../components/Toast/Toast';
import { Content } from '../../types/Content';
import { ToastType } from '../../types/ToastType';
import styles from './Edit.module.css';

type Props = {
    porVer: Content[];
    setPorVer: React.Dispatch<React.SetStateAction<Content[]>>;
    watched: Content[];
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>;
};

const Edit: React.FC<Props> = ({ porVer, setPorVer, watched, setWatched }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { content: Content; from: string } | null;
    const [formData, setFormData] = useState<Content | null>(null);
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    useEffect(() => {
        if (!state?.content) {
            setToast({ message: 'No se encontró el contenido a editar', type: 'error' });
            setTimeout(() => navigate('/'), 1000);
            return;
        }
        setFormData(state.content);
    }, [state, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!formData) return;
        const { name, value } = e.target;
        setFormData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                [name]: name === 'anio' || name === 'rating' ? Number(value) : value
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        const updatedItem = formData;
        const inPorVer = porVer.some((item) => item.id === updatedItem.id);
        const inWatched = watched.some((item) => item.id === updatedItem.id);

        if (inPorVer) {
            setPorVer(porVer.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }
        if (inWatched) {
            setWatched(watched.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }

        setToast({ message: 'Cambios guardados', type: 'success' });
        setTimeout(() => {
            const redirectTo = state?.from === 'watched' ? '/watched' : '/';
            navigate(redirectTo);
        }, 1000);
    };

    if (!formData) {
        return null;
    }

    return (
        <div className={styles['edit-container']}>
            <Title text="Editar Contenido" />
            <form onSubmit={handleSubmit} className={styles['formulario']}>
                <InputField
                    label="Título"
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Director"
                    type="text"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Año"
                    type="number"
                    name="anio"
                    value={formData.anio}
                    onChange={handleChange}
                    required
                />
                <InputField
                    label="Rating"
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                    min={1}
                    max={5}
                />
                <SelectField
                    label="Género"
                    name="genero"
                    value={formData.genero}
                    onChange={handleChange}
                    required
                    options={[
                        { value: 'Acción', label: 'Acción' },
                        { value: 'Comedia', label: 'Comedia' },
                        { value: 'Drama', label: 'Drama' },
                        { value: 'Ciencia Ficción', label: 'Ciencia Ficción' },
                        { value: 'Romance', label: 'Romance' },
                    ]}
                />
                <SelectField
                    label="Tipo"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    options={[
                        { value: 'pelicula', label: 'Película' },
                        { value: 'serie', label: 'Serie' },
                    ]}
                />
                <div className={styles['field-full']}>
                    <InputField
                        label="Imagen (opcional)"
                        type="text"
                        name="imagen"
                        value={formData.imagen || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles['submit-container']}>
                    <button type="submit">Guardar Cambios</button>
                </div>
            </form>
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

export default Edit;
