import React from 'react';
import { Popcorn } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout: React.FC = () => {
    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <Popcorn size={24} />
                    <span className={styles.brand}>Movie Tracker</span>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/new">Nueva Entrada</Link></li>
                    <li><Link to="/watched">Vistas</Link></li>
                </ul>
            </nav>

            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
