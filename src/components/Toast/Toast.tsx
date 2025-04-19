import React, { useEffect } from 'react';
import './styles.css';

// Definición de las props que recibe el Toast
type ToastProps = {
    message: string; // Mensaje que se va a mostrar
    type?: 'success' | 'error' | 'info'; // Tipo de mensaje (opcional, por defecto es "info")
    onClose: () => void; // Función que se ejecuta para cerrar el toast
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
    // Hook que configura el cierre automático del toast luego de 3 segundos
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        // Limpia el timer si el componente se desmonta antes de los 3 segundos
        return () => clearTimeout(timer);
    }, [onClose]);

    // Función auxiliar que devuelve un ícono según el tipo de toast
    const getIcon = () => {
        switch (type) {
            case 'success':
                return '✅';
            case 'error':
                return '❌';
            case 'info':
            default:
                return 'ℹ️';
        }
    };

    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-icon">{getIcon()}</span>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
