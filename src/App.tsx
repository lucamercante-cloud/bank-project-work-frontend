import { AppRoutes } from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";

function App() {
    const location = useLocation();
    const isLoginOrRegister = location.pathname === "/login" || location.pathname === "/register";

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 font-sans">
            {/* Navbar visibile solo se non siamo in login/register */}
            {!isLoginOrRegister && <Navbar />}

            {/* Contenuto delle pagine con flex-1 per spingere il Footer in basso */}
            <main className="flex-1 w-full">
                <AppRoutes />
            </main>

            {/* Footer visibile solo se non siamo in login/register */}
            {!isLoginOrRegister && <Footer />}
        </div>
    );
}

export default App;