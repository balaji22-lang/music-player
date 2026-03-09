import { useEffect } from "react";

function Callback() {

  useEffect(() => {
    const code =
      new URLSearchParams(window.location.search)
        .get("code");

    getToken(code);
  }, []);

  async function getToken(code) {

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: "c00a33ea",
      code,
      redirect_uri: "https://localhost:5173/callback",
    });

    const res = await fetch(
      "https://api.jamendo.com/v3.0/oauth/grant",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    const data = await res.json();

    localStorage.setItem(
      "token",
      data.access_token
    );

    window.location.href = "/";
  }
  
  return <h2>Logging in...</h2>;
}

export default Callback;