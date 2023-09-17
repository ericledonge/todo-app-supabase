import "./index.css";
import { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { TodosScreen } from "./screens/todos.screen.tsx";
import { supabase } from "./api/supabase.ts";

export default function App() {
  const [session, setSession] = useState(null);

  const handleLogoutClick = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
            supabaseClient={supabase}
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
