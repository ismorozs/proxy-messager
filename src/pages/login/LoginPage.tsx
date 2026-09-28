import { AuthLayout } from "../../components/Layout/AuthLayout";
import { LoginForm } from "../../widgets/Auth/components/LoginForm";

export const LoginPage = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}