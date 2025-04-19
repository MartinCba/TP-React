import React from 'react';
import './styles.css';
import { Content } from '../../types/Content';

// Imagen por defecto si no se carga ninguna imagen
const DEFAULT_IMAGE = 'https://images.wondershare.com/recoverit/article/2019/11/common-video-errors-01.jpg';

// Props que recibe la tarjeta de contenido
type Props = {
    data: Content; // Objeto con los datos del contenido
    onMarkAsViewed?: () => void; // Función opcional para marcar como visto
    onDelete: () => void; // Función para eliminar el contenido
    onEdit?: () => void; // Función opcional para editar el contenido
};
// OBSERVACIONES:
// - Decidí mantener los botones HTML nativos por las siguientes razones:
// 1. Ya tienen un diseño específico con íconos que funciona bien con las tarjetas
// 2. Los estilos están personalizados para este caso de uso (con íconos, efectos hover, etc.)
// 3. El componente Button está más orientado a botones de acción principales sin íconos.
const ContentCard: React.FC<Props> = ({ data, onMarkAsViewed, onDelete, onEdit }) => {
    return (
        <div className="content-card">
            <div className="content-card-header">
                <div
                    className="content-card-image"
                    style={{
                        backgroundImage: `url(${data.imagen || DEFAULT_IMAGE})`
                    }}
                />
                <div className="content-overlay">
                    <div className="type-badge">{data.tipo}</div>
                    <div className="rating">
                        <span className="star">★</span>
                        <span>{data.rating}/5</span>
                    </div>
                </div>
            </div>
            <div className="content-card-info">
                <div className="content-main">
                    <h3>{data.titulo}</h3>
                    <div className="content-details">
                        <p><strong>Director:</strong> {data.director}</p>
                        <p><strong>Año:</strong> {data.anio}</p>
                    </div>
                </div>
                <div className="actions">
                    {onMarkAsViewed && (
                        <button className="action-button primary" onClick={onMarkAsViewed}>
                            <span className="button-icon">✓</span>
                            Visto
                        </button>
                    )}
                    {onEdit && (
                        <button className="action-button secondary" onClick={onEdit}>
                            <span className="button-icon">✎</span>
                            Editar
                        </button>
                    )}
                    <button className="action-button danger" onClick={onDelete}>
                        <span className="button-icon">×</span>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContentCard;
