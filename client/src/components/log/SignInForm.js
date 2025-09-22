import axios from "axios";
import React, { useState } from "react";

const SignInForm = () => {
  // Déclaration des états locaux avec le hook useState
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Fonction pour gérer la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();

    // Sélection des éléments d'erreur par classe
    const usernameError = document.querySelector(".username.error");
    const passwordError = document.querySelector(".password.error");

    // Requête POST pour la connexion
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signin`,
        withCredentials: true,
        data: {
          username,
          password,
        },
      });

      console.log(res);
      // Gestion des erreurs côté serveur
      if (res.data.errorsusername) {
        usernameError.innerHTML = res.data.errorsusername;
        passwordError.innerHTML = "";
      } else if (res.data.errorspassword) {
        passwordError.innerHTML = res.data.errorspassword;
        usernameError.innerHTML = "";
      } else {
        // Si la connexion est réussie, rediriger l'utilisateur vers la page d'accueil
        window.location = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form action="" onSubmit={handleLogin} id="sign-up-form">
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <div className="username error"></div>
        <br />
        <label htmlFor="password">mot de passe</label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <br />
        <input type="submit" value="se connecter" />
      </form>

      {/* Comptes de test */}
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "8px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }}
      >
        <h4
          style={{ color: "#ffeb3b", margin: "0 0 10px 0", fontSize: "1rem" }}
        >
          🔑 Comptes de test
        </h4>
        <p style={{ color: "#ffffff", margin: "5px 0", fontSize: "0.9rem" }}>
          <strong style={{ color: "#ff6b6b" }}>Admin:</strong> username: admin,
          mdp: test
        </p>
        <p style={{ color: "#ffffff", margin: "5px 0", fontSize: "0.9rem" }}>
          <strong style={{ color: "#4caf50" }}>Utilisateur:</strong> username:
          organisateur1, mdp: test
        </p>
      </div>
    </>
  );
};

export default SignInForm;
