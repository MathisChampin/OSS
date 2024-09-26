import React from 'react';
import Navbar from './Navbar'; // Make sure the path is correct
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
