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
      <form action="" onSubmit={handleLogin} id="sign-in-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Votre nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <div className="username error"></div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="password error"></div>
        </div>

        <input type="submit" value="Se connecter" />
      </form>

      {/* Comptes de test */}
      <div className="test-accounts">
        <h4>🔑 Comptes de test</h4>
        <p>
          <strong>Admin:</strong> username: admin, mdp: test
        </p>
        <p>
          <strong>Utilisateur:</strong> username: organisateur1, mdp: test
        </p>
      </div>
    </>
  );
};

export default SignInForm;
