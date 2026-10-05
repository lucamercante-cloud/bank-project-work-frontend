import { useEffect, useState } from "react";
import { LoginLayout } from "../../components/layout/LoginLayout";
import { LoginForm } from "../../components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const [formKey, setFormKey] = useState(0);

    const navigate = useNavigate();

    // Se l'utente ha già il token in localStorage, lo spediamo subito alla homepage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/homepage", { replace: true });
        }
    }, [navigate]);


    const handleResetSession = () => {
        setFormKey((prevKey) => prevKey + 1);
    };

    return (
        <LoginLayout onResetSession={handleResetSession}>
            <LoginForm key={formKey} />
        </LoginLayout>
    );
};