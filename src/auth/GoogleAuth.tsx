import React, { useEffect, useState } from "react";

const GoogleAuth: React.FC = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleLogin = () => {
    chrome.runtime.sendMessage({ action: "signIn" }, (response) => {
      if (response?.idToken) {
        console.log("ID Token received:", response.idToken);
        fetch("http://localhost:4000/user/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken: response.idToken }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Server Response:", data);
            setUser(data.user); // Store user object
          })
          .catch((err) => console.error("Auth Error:", err));
      } else {
        console.error("Auth failed:", response?.error);
      }
    });
  };

  return (
    <div className="text-center">
      <button
        onClick={handleLogin}
        className="px-4 py-2 text-lg font-bold cursor-pointer text-white w-full bg-slate-950 border-none rounded"
      >
        Login with Google
      </button>

      {user && (
        <div className="mt-4">
          <p className="text-white">Welcome, {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;
