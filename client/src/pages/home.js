import React from "react";

const home = () => {
  return (
    <div
      className="background-image"
      style={{ backgroundImage: `url(./img/homeImg/red.jpg)` }}
    >
      <div className="container">
        <header className="header">
          <h1>Notre Site de Tournois</h1>
          <p>La plateforme ultime pour les joueurs compétitifs</p>
        </header>

        <section className="features">
          <div className="feature">
            <img src="./img/homeImg/smash.jpg" alt="Image1" />
            <h2> Participez à des tournois gratuits en quelques clics</h2>
            {/* <p></p> */}
          </div>

          <div className="feature">
            <img src="./img/homeImg/tgestion.jpg" alt="Image2" />
            <h2>Gérez vos compétitions de jeux</h2>
            <p></p>
          </div>

          <div className="feature">
            <img src="image3.jpg" alt="Image3" />
            <h2>Fonctionnalité 3</h2>
            <p>.</p>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Prêt à rejoindre la compétition ?</h2>
          <a href="/profil" className="button">
            S'inscrire
          </a>
        </section>

        <footer className="footer">
          <p>Contactez-nous : contact@exemple.com</p>
        </footer>
      </div>
    </div>
  );
};

export default home;
