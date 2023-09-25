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
            <h2>Gérez vos compétitions de jeux</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>

          <div className="feature">
            <img src="image2.jpg" alt="Image2" />
            <h2>Fonctionnalité 2</h2>
            <p>Nulla facilisi. Sed sed tellus nec lorem finibus.</p>
          </div>

          <div className="feature">
            <img src="image3.jpg" alt="Image3" />
            <h2>Fonctionnalité 3</h2>
            <p>Donec eget semper ante, vel suscipit lorem.</p>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Prêt à rejoindre la compétition ?</h2>
          <a href="/inscription" className="button">
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
