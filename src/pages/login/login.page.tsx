import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { apiClientProvider } from "../../providers";

export const LoginPage = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 className="app-title">Todo App</h1>
        <Auth
          supabaseClient={apiClientProvider}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
          theme="dark"
        />
      </div>
    </div>
  );
};
