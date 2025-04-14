import React from 'react';
import { Popcorn } from 'lucide-react';
import { Link, Outlet } from 'react-router-dom';
import './styles.css';

const Layout: React.FC = () => {
    return (
        <div className="layout">
            <nav className="navbar">
                <div className="logo">
                    <Popcorn size={24} />
                    <span className="brand">Movie Tracker</span>
                </div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/new">Nueva Entrada</Link></li>
                    <li><Link to="/watched">Vistas</Link></li>
                </ul>
            </nav>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
