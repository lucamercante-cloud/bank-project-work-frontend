import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../pages/auth/LoginPage";

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Rotta principale del Login */}
            <Route path="/login" element={<LoginPage />} />

            {/* Reindirizza qualsiasi altro indirizzo (es. "/") direttamente a "/login" */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
};