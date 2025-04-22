import React, { useMemo } from 'react';
import { Content } from '../../types/Content';
import './styles.css';

type Props = {
    content: Content[]; 
    title?: string; 
};

const StatsCounter: React.FC<Props> = ({ content, title = 'Estadísticas' }) => {
    const stats = useMemo(() => {
        const genreCount: { [key: string]: number } = {};
        const typeCount: { [key: string]: number } = {};
        content.forEach((item) => {
            genreCount[item.genero] = (genreCount[item.genero] || 0) + 1;
            typeCount[item.tipo] = (typeCount[item.tipo] || 0) + 1;
        });

        return {
            total: content.length, 
            byGenre: Object.entries(genreCount)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3),
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