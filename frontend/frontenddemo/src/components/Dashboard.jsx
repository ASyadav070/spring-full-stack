import React, { useState } from 'react';
import ProductManager from './ProductManager';
import UserManager from './UserManager';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const { user } = useAuth();

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <nav className="dashboard-nav">
                <button 
                    className={activeTab === 'products' ? 'active' : ''}
                    onClick={() => setActiveTab('products')}
                >
                    Products
                </button>
                {user && user.role === 'ADMIN' && (
                    <button 
                        className={activeTab === 'users' ? 'active' : ''}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                )}
            </nav>
            <div className="manager-section">
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'users' && user && user.role === 'ADMIN' && <UserManager />}
            </div>
        </div>
    );
};

export default Dashboard;
