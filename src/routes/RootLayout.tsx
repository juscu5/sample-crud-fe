import React from 'react';
import { Outlet } from 'react-router-dom';
import ResAppBar from '../components/ResAppBar';

const RootLayout: React.FC = () => {
    const navItems = [
        { text: "User", href: "/crud/user" },
      ];

    return (
        <ResAppBar navlist={navItems} navTitle={"Sample CRUD"}>
            <Outlet />
        </ResAppBar>
    );
};

export default RootLayout;