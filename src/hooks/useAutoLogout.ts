import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const INACTIVITY_LIMIT = 30 * 1000; 

export const useAutoLogout = () => {
    const navigate = useNavigate();
    
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const logout = () => {
        
        localStorage.removeItem("token");
        sessionStorage.clear();

        
        navigate("/login", { 
            state: { sessionExpired: true, message: "Sessione scaduta per inattività." } 
        });
    };

    const resetTimer = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(logout, INACTIVITY_LIMIT);
    };

    useEffect(() => {
        
        const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

        
        resetTimer();

        
        events.forEach((event) => {
            window.addEventListener(event, resetTimer);
        });

       
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            events.forEach((event) => {
                window.removeEventListener(event, resetTimer);
            });
        };
    }, []);
};