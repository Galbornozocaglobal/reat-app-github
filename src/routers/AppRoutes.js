import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { DashboardRoutes } from './DashboardRoutes';
export const AppRoutes = () => {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="*" element={
                    <DashboardRoutes />
                }
                />
            </Routes>
        </BrowserRouter>
    )
}
