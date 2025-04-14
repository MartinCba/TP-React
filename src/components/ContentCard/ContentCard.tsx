import React from 'react';
import './styles.css';
import { Content } from '../../types/Content';
import Button from '../Button/Button';

type Props = {
    data: Content;
    onMarkAsViewed?: () => void;
    onDelete: () => void;
    onEdit?: () => void;
};

const ContentCard: React.FC<Props> = ({ data, onMarkAsViewed, onDelete, onEdit }) => {
    return (
        <div
            className="content-card"
            style={{
                backgroundImage: data.imagen ? `url(${data.imagen})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <h3>{data.titulo}</h3>
            <p><strong>Director:</strong> {data.director}</p>
            <p><strong>Año:</strong> {data.anio}</p>
            <p><strong>Tipo:</strong> {data.tipo}</p>
            <p><strong>Rating:</strong> {data.rating}/5</p>
            <div className="actions">
                {onMarkAsViewed && (
                    <Button text="Visto" onClick={onMarkAsViewed} variant="primary" />
                )}
                {onEdit && <Button text="Editar" onClick={onEdit} variant="secondary" />}
                <Button text="Eliminar" onClick={onDelete} variant="danger" />
            </div>
        </div>
    );
};

export default ContentCard;
