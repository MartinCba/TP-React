import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Content } from '../../types/Content';
import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import Title from '../../components/Title/Title';
import Toast from '../../components/Toast/Toast';
import './styles.css';
import { ToastType } from '../../types/ToastType';

// Definición de las props que recibe el componente Edit
type Props = {
    porVer: Content[]; // Lista de contenidos por ver
    setPorVer: React.Dispatch<React.SetStateAction<Content[]>>; // Función para actualizar la lista porVer
    watched: Content[]; // Lista de contenidos vistos 
    setWatched: React.Dispatch<React.SetStateAction<Content[]>>; // Función para actualizar la lista watched
};

// Componente principal Edit
const Edit: React.FC<Props> = ({ porVer, setPorVer, watched, setWatched }) => {
    // Extrae el estado enviado por navegación (puede incluir el contenido a editar y desde dónde se navegó)
    const { state } = useLocation();
    // Hook para navegar entre páginas
    const navigate = useNavigate();
    // Contenido a editar, que llega desde el estado de navegación
    const contentToEdit: Content | null = state?.content || null;
    // Estado local para manejar el formulario con los datos actuales del contenido
    const [formData, setFormData] = useState<Content | null>(null);
    // Estado local para mostrar una notificación (toast)
    const [toast, setToast] = useState<{ message: string; type?: ToastType } | null>(null);

    // Al montar el componente, si hay contenido para editar, se carga en formData
    useEffect(() => {
        if (contentToEdit) {
            setFormData(contentToEdit);
        }
    }, [contentToEdit]);

    // Si no hay datos para editar, se muestra un mensaje de error
    if (!formData) {
        return (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Title text="Error" />
                <p>No se encontró contenido para editar. Volvé al <a href="/">inicio</a>.</p>
            </div>
        );
    }

    // Función que se ejecuta cada vez que el usuario cambia un valor del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        // Actualiza el estado del formulario, convirtiendo a número si es año o rating
        setFormData((prev) =>
            prev
                ? {
                    ...prev,
                    [name]: name === 'anio' || name === 'rating' ? Number(value) : value,
                }
                : prev
        );
    };

    // Función que maneja el envío del formulario
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;

        const updatedItem = formData;
        // Verifica si el contenido está en porVer
        const inPorVer = porVer.some((item) => item.id === updatedItem.id);
        // Verifica si está en watched
        const inWatched = watched.some((item) => item.id === updatedItem.id);

        // Actualiza el contenido editado en porVer si corresponde
        if (inPorVer) {
            setPorVer(porVer.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }
        // Actualiza el contenido editado en watched si corresponde
        if (inWatched) {
            setWatched(watched.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }

        // Muestra mensaje de éxito
        setToast({ message: 'Cambios guardados', type: 'success' });
        // Espera 1 segundo y redirige al home o a la lista de vistos según de dónde venimos
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
                <InputField label="Rating" type="number" name="rating" value={formData.rating} onChange={handleChange} required min={1} max={5} />
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
                <div className="submit-container">
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
        </>
    );
};

export default Edit;
