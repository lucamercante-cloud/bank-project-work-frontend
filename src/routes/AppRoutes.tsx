import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { HomePage } from "../pages/dashboard/HomePage";

export const AppRoutes = () => {
    const location = useLocation();

    return (
        // AnimatePresence con mode="wait" garantisce che l'uscita termini prima dell'ingresso
        <AnimatePresence mode="wait" initial={false}>
            {/* key={location.pathname} forza il re-render e l'animazione al cambio rotta */}
            <Routes location={location} key={location.pathname}>
                {/* Rotta principale del Login */}
                <Route path="/login" element={<LoginPage />} />

                {/* Registrazione nuovo conto corrente */}
                <Route path="/register" element={<RegisterPage />} />

<<<<<<< HEAD
                {/* Reindirizza qualsiasi altro indirizzo (es. "/") direttamente a "/login" */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </AnimatePresence>
=======
            <Route path="/homepage" element={<HomePage />} />

            {/* Reindirizza qualsiasi altro indirizzo (es. "/") direttamente a "/login" */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
>>>>>>> 9136230 (creation navbar)
    );
};