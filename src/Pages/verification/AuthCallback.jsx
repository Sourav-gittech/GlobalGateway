import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../util/Supabase/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/verification?status=success");
        }

        if (event === "SIGNED_OUT") {
          navigate("/verification?status=error");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  return <p>Verifying email…</p>;
}
