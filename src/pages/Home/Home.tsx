import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // si querés usar ids únicos
import { Content } from '../../types/Content';
import Title from '../../components/Title/Title';

const Home = () => {
    const [porVer, setPorVer] = useState<Content[]>([]);
    //const [vistas, setVistas] = useState<Content[]>([]);

    return (
        <>
            <Title text="Gestor de Películas y Series" />
            <button
                onClick={() =>
                    setPorVer((prev) => [
                        ...prev,
                        {
                            id: uuidv4(),
                            titulo: 'Interstellar',
                            director: 'Christopher Nolan',
                            anio: 2014,
                            genero: 'Ciencia Ficción',
                            rating: 5,
                            tipo: 'pelicula',
                        },
                    ])
                }
            >
                Agregar de prueba
            </button>
            <ul>
                {porVer.map((item) => (
                    <li key={item.id}>
                        {item.titulo} ({item.anio}) - {item.director}
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Home;
