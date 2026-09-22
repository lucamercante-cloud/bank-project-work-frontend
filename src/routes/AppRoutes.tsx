import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { HomePage } from "../pages/dashboard/HomePage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                {/* ROTTE PUBBLICHE */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* ROTTE PROTETTE (Richiedono il Token) */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/homepage" element={<HomePage />} />
                    {/* Qui puoi aggiungere altre rotte che richiedono il login */}
                    {/* <Route path="/ricerca-movimenti" element={<RicercaPage />} /> */}
                </Route>

                {/* Redirect per rotte sconosciute */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AnimatePresence>
    );
};