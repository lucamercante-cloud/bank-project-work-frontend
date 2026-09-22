import { LoginLayout } from "../../components/layout/LoginLayout"
import { LoginForm } from "../../components/auth/LoginForm";
import { RegistrationForm } from "../../components/auth/RegistrationForm";

export const LoginPage = () => {
    return (
        <LoginLayout>
            <LoginForm />
        </LoginLayout>
    );
};