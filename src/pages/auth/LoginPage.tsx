import { LoginLayout } from "../../components/layout/LoginLayout"
import { LoginForm } from "../../components/auth/LoginForm";

export const LoginPage = () => {
    return (
        <LoginLayout>
            <LoginForm />
        </LoginLayout>
    );
};