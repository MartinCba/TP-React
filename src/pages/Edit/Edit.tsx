import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Content } from '../../types/Content';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import Title from '../../components/Title/Title';
import Toast from '../../components/Toast/Toast';
import './styles.css';
import { ToastType } from '../../types/ToastType';

type Props = {
    porVer: Content[];
    setPorVer: React.Dispatch<React.SetStateAction<Content[]>>;
    watched: Content[];
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>;
};

const Edit: React.FC<Props> = ({ porVer, setPorVer, watched, setWatched }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const contentToEdit: Content | null = state?.content || null;
    const [formData, setFormData] = useState<Content | null>(null);
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    useEffect(() => {
        if (contentToEdit) {
            setFormData(contentToEdit);
        }
    }, [contentToEdit]);

    if (!formData) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Title text="Error" />
                <p>No se encontró contenido para editar. Volvé al <a href="/">inicio</a>.</p>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) =>
            prev
                ? {
                    ...prev,
                    [name]: name === 'anio' || name === 'rating' ? Number(value) : value,
                }
                : prev
        );
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

    return (
        <>
            <Title text="Editar Contenido" />
            <form onSubmit={handleSubmit} className="formulario">
                <InputField label="Título" type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
                <InputField label="Director" type="text" name="director" value={formData.director} onChange={handleChange} required />
                <InputField label="Año" type="number" name="anio" value={formData.anio} onChange={handleChange} required />
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
                <InputField label="Rating" type="number" name="rating" value={formData.rating} onChange={handleChange} required min={1} max={5} />
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
                <button type="submit">Guardar Cambios</button>
            </form>

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

export default Edit;
