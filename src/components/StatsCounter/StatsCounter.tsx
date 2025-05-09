import React, { useMemo } from 'react';
import { Content } from '../../types/Content';
import styles from './StatsCounter.module.css';

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
        <div className={styles['stats-counter']}>
            <h3>{title}</h3>
            <div className={styles['stats-grid']}>
                <div className={`${styles['stats-card']} ${styles.total}`}>
                    <h4>Total</h4>
                    <div className={styles.number}>{stats.total}</div>
                </div>

                <div className={styles['stats-card']}>
                    <h4>Por Tipo</h4>
                    <div className={styles['stats-list']}>
                        {stats.byType.map(([type, count]) => (
                            <div key={type} className={styles['stats-item']}>
                                <span>{type}</span>
                                <span className={styles.number}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['stats-card']}>
                    <h4>Top Géneros</h4>
                    <div className={styles['stats-list']}>
                        {stats.byGenre.map(([genre, count]) => (
                            <div key={genre} className={styles['stats-item']}>
                                <span>{genre}</span>
                                <span className={styles.number}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatsCounter; 