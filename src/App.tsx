import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { TodosScreen } from "./screens/todos.screen.tsx";
import { apiClient } from "./api/api-client.ts";
import { Session } from "@supabase/supabase-js";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  const handleLogoutClick = async () => {
    await apiClient.auth.signOut();
  };

  useEffect(() => {
    apiClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = apiClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="container">
        <div className="card">
          <h1 className="app-title">Todo App</h1>
          <Auth
            supabaseClient={apiClient}
            appearance={{ theme: ThemeSupa }}
            providers={[]}
            theme="dark"
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={handleLogoutClick}>Sign out</button>

        <TodosScreen />
      </div>
    );
  }
}
