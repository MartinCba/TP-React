import React, { useMemo } from 'react';
import { Content } from '../../types/Content';
import './styles.css';

// Props que recibe el componente
type Props = {
    content: Content[]; // Lista de contenidos (películas o series)
    title?: string; // Título de la sección, por defecto "Estadísticas"
};

const StatsCounter: React.FC<Props> = ({ content, title = 'Estadísticas' }) => {
    // Calcula estadísticas usando useMemo para evitar cálculos innecesarios
    const stats = useMemo(() => {
        // Objetos para contar por género y por tipo
        const genreCount: { [key: string]: number } = {};
        const typeCount: { [key: string]: number } = {};
        // Recorre los contenidos y acumula por género y tipo
        content.forEach((item) => {
            genreCount[item.genero] = (genreCount[item.genero] || 0) + 1;
            typeCount[item.tipo] = (typeCount[item.tipo] || 0) + 1;
        });

        return {
            total: content.length, // Total de elementos
            // Géneros más frecuentes (ordenados de mayor a menor y limitados a 3)
            byGenre: Object.entries(genreCount)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3),
            // Tipos (película o serie), también ordenados de mayor a menor
            byType: Object.entries(typeCount)
                .sort(([, a], [, b]) => b - a)
        };
    }, [content]);

    return (
        <div className="stats-counter">
            <h3>{title}</h3>
            <div className="stats-grid">
                <div className="stats-card total">
                    <h4>Total</h4>
                    <div className="number">{stats.total}</div>
                </div>

                <div className="stats-card">
                    <h4>Por Tipo</h4>
                    <div className="stats-list">
                        {stats.byType.map(([type, count]) => (
                            <div key={type} className="stats-item">
                                <span>{type}</span>
                                <span className="number">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="stats-card">
                    <h4>Top Géneros</h4>
                    <div className="stats-list">
                        {stats.byGenre.map(([genre, count]) => (
                            <div key={genre} className="stats-item">
                                <span>{genre}</span>
                                <span className="number">{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCounter; 