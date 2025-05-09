import React, { useEffect } from 'react';
import styles from './Toast.module.css';

type ToastProps = {
    message: string; 
    type?: 'success' | 'error' | 'info'; 
    onClose: () => void; 
};

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

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
        <div className={`${styles.toast} ${styles[`toast-${type}`]}`}>
            <span className={styles['toast-icon']}>{getIcon()}</span>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
