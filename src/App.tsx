import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
    return (
        <BrowserRouter>
            <main className="min-h-screen bg-slate-950 flex flex-col justify-start">
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}

export default App;