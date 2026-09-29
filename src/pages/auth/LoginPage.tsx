import { useState } from "react";
import { LoginLayout } from "../../components/layout/LoginLayout";
import { LoginForm } from "../../components/auth/LoginForm";

export const LoginPage = () => {
    const [formKey, setFormKey] = useState(0);

   
    const handleResetSession = () => {
        setFormKey((prevKey) => prevKey + 1); 
    };

    return (
        <LoginLayout onResetSession={handleResetSession}>
            <LoginForm key={formKey} />
        </LoginLayout>
    );
};