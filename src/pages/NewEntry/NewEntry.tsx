import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title/Title';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import Toast from '../../components/Toast/Toast';
import { Content } from '../../types/Content';
import './styles.css';

type Props = {
    onAdd: (newMovie: Content) => void;
};

const NewEntry: React.FC<Props> = ({ onAdd }) => {
    const [formData, setFormData] = useState<Content>({
        id: '',
        titulo: '',
        director: '',
        anio: new Date().getFullYear(),
        genero: '',
        rating: 1,
        tipo: 'pelicula',
        imagen: ''
    });

    const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'anio' || name === 'rating' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem = { ...formData, id: uuidv4() };
        onAdd(newItem);

        setToast({ message: 'Contenido agregado con éxito', type: 'success' });

        setTimeout(() => {
            navigate('/');
        }, 1000);
    };

    return (
        <>
            <Title text="Agregar Nueva Película o Serie" />
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
                <InputField
                    label="Imagen (opcional)"
                    type="text"
                    name="imagen"
                    value={formData.imagen || ''}
                    onChange={handleChange}
                />

                <button type="submit">Agregar</button>
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

export default NewEntry;
