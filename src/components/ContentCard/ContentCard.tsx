import React from 'react';
import styles from './ContentCard.module.css';
import { Content } from '../../types/Content';

const DEFAULT_IMAGE = 'https://images.wondershare.com/recoverit/article/2019/11/common-video-errors-01.jpg';

type Props = {
    data: Content; 
    onMarkAsViewed?: () => void; 
    onDelete: () => void; 
    onEdit?: () => void; 
};
// OBSERVACIONES:
// - Decidí mantener los botones HTML nativos por las siguientes razones:
// 1. Ya tienen un diseño específico con íconos que funciona bien con las tarjetas
// 2. Los estilos están personalizados para este caso de uso (con íconos, efectos hover, etc.)
// 3. El componente Button está más orientado a botones de acción principales sin íconos.
const ContentCard: React.FC<Props> = ({ data, onMarkAsViewed, onDelete, onEdit }) => {
    return (
        <div className={styles['content-card']}>
            <div className={styles['content-card-header']}>
                <div
                    className={styles['content-card-image']}
                    style={{
                        backgroundImage: `url(${data.imagen || DEFAULT_IMAGE})`
                    }}
                />
                <div className={styles['content-overlay']}>
                    <div className={styles['type-badge']}>{data.tipo}</div>
                    <div className={styles['rating']}>
                        <span className={styles['star']}>★</span>
                        <span>{data.rating}/5</span>
                    </div>
                </div>
            </div>
            <div className={styles['content-card-info']}>
                <div className={styles['content-main']}>
                    <h3>{data.titulo}</h3>
                    <div className={styles['content-details']}>
                        <p><strong>Director:</strong> {data.director}</p>
                        <p><strong>Año:</strong> {data.anio}</p>
                    </div>
                </div>
                <div className={styles['actions']}>
                    {onMarkAsViewed && (
                        <button className={`${styles['action-button']} ${styles['primary']}`} onClick={onMarkAsViewed}>
                            <span className={styles['button-icon']}>✓</span>
                            Visto
                        </button>
                    )}
                    {onEdit && (
                        <button className={`${styles['action-button']} ${styles['secondary']}`} onClick={onEdit}>
                            <span className={styles['button-icon']}>✎</span>
                            Editar
                        </button>
                    )}
                    <button className={`${styles['action-button']} ${styles['danger']}`} onClick={onDelete}>
                        <span className={styles['button-icon']}>×</span>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
