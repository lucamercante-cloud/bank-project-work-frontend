
import { AppRoutes } from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
 
function App(){
const location = useLocation();
   const isloginoregister = location.pathname === "/login" || location.pathname === "/register";
   return (
        <main className="min-h-screen bg-slate-950 flex flex-col justify-start">
            {!isloginoregister && <Navbar />}

            <AppRoutes />
        </main>
    );
}



export default App;