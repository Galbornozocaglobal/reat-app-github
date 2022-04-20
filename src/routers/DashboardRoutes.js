import React from 'react'
import { Routes, Route } from 'react-router-dom';

import { HomeScreen } from '../components/Home/HomeScreen'
import { NavBar } from '../components/NavBar/NavBar'
import { Perfil } from '../components/perfil/Perfil';

export const DashboardRoutes = () => {
    return (
        <>
            <NavBar />
            <div>
                <Routes>
                    <Route path="perfil/:user_name" element={<Perfil />} />
                    <Route path="/*" element={<HomeScreen />} />
                </Routes>
            </div>
        </>
    )
}
