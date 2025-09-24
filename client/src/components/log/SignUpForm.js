import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  // Déclaration des états locaux avec le hook useState
  const [formSubmit, setFormSubmit] = useState(false);
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  // Fonction de gestion de l'inscription (soumission du formulaire)
  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const usernameError = document.querySelector(".username.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    // Réinitialisation des messages d'erreur
    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    // Validation des champs (mots de passe et conditions générales)
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      // Requête POST pour créer un nouvel utilisateur
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
        data: {
          username,
          email,
          password,
        },
      })
        .then((res) => {
          console.log(res);
          // Gestion des erreurs côté serveur
          if (res.data.errors) {
            usernameError.innerHTML = res.data.errors.username;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else if (res.data.messageError) {
            usernameError.innerHTML = res.data.messageError;
            emailError.innerHTML = "";
          } else if (res.data.emailError) {
            emailError.innerHTML = res.data.emailError;
            usernameError.innerHTML = "";
          } else {
            // Si l'inscription est réussie, mettez à jour l'état pour afficher un message de succès
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        // Afficher le formulaire de connexion après une inscription réussie
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        // Afficher le formulaire d'inscription par défaut
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Votre nom d'utilisateur"
              onChange={(e) => setusername(e.target.value)}
              value={username}
            />
            <div className="username error"></div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Adresse email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="votre@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="email error"></div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Choisissez un mot de passe sécurisé"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="password error"></div>
          </div>

          <div className="form-group">
            <label htmlFor="password-conf">Confirmer le mot de passe</label>
            <input
              type="password"
              name="password-confirm"
              id="password-conf"
              placeholder="Répétez votre mot de passe"
              onChange={(e) => setControlPassword(e.target.value)}
              value={controlPassword}
            />
            <div className="password-confirm error"></div>
          </div>

          <div className="form-group checkbox-group">
            <div className="checkbox-wrapper">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms">
                J'accepte les{" "}
                <a href="/" target="_blank" rel="noopener noreferrer">
                  conditions générales
                </a>
              </label>
            </div>
            <div className="terms error"></div>
          </div>

          <input type="submit" value="Créer mon compte" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
