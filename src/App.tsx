import "./index.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  "https://duewffvwiyfyjnafrfim.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1ZXdmZnZ3aXlmeWpuYWZyZmltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMxODgzMjEsImV4cCI6MjAwODc2NDMyMX0.WIzW1Yij8Zha8a9uzYk8h539WuYxiriuVSomnOlEuUo",
);

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
        <p>Logged in!</p>
        <button onClick={handleLogoutClick}>Sign out</button>
      </div>
    );
  }
}
