import "./index.css";

import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";

import { useSetUserId } from "./store";
import { LoginPage, TodosPage } from "./pages";
import { apiClientProvider, ThemeProvider } from "./providers";

export default function App() {
  const setUserId = useSetUserId();

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    apiClientProvider.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUserId(session?.user?.id || "");
    });

    const {
      data: { subscription },
    } = apiClientProvider.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserId(session?.user?.id || "");
    });

    return () => subscription.unsubscribe();
  }, [setUserId]);

  return (
    <ThemeProvider>{!session ? <LoginPage /> : <TodosPage />}</ThemeProvider>
  );
}

// const handleLogoutClick = async () => {
//   await apiClient.auth.signOut();
// };

// <button onClick={handleLogoutClick}>Sign out</button>
