import React from "react";

const home = () => {
  return (
    <div
    // className="background-image"
    // style={{ backgroundImage: `url(./img/homeImg/fond.jpeg)` }}
    >
      <div className="container">
        <header className="header">
          <h1>TournoiGaming</h1>
          <p>
            La plateforme ultime pour organiser et participer à des tournois de
            jeux vidéo
          </p>
        </header>

        <section className="features">
          <div className="feature1_home">
            <img src="./img/homeImg/smash.jpg" alt="Image1" />
            <div className="texte_row">
              <h2>Participez à des tournois gratuits en quelques clics</h2>
              <p>
                Rejoignez des tournois de League of Legends, Valorant, Rocket
                League et bien d'autres jeux populaires. Inscrivez-vous
                facilement, affrontez d'autres joueurs et grimpez dans les
                classements. Nos tournois sont ouverts à tous les niveaux, des
                débutants aux professionnels.
              </p>
            </div>
          </div>

          <div className="feature2_home">
            <img src="./img/homeImg/tgestion.jpg" alt="Image2" />
            <div className="texte_row">
              <h2>Organisez vos propres tournois</h2>
              <p>
                Créez et gérez vos propres compétitions de jeux vidéo.
                Définissez les règles, invitez les participants, suivez les
                matchs en temps réel et distribuez les récompenses. Notre
                plateforme vous offre tous les outils nécessaires pour organiser
                des événements mémorables.
              </p>
            </div>
          </div>

          <div className="feature3_home">
            <img src="./img/homeImg/red.jpg" alt="Communauté Gaming" />
            <div className="texte_row">
              <h2>Rejoignez une communauté passionnée</h2>
              <p>
                Connectez-vous avec des milliers de joueurs passionnés. Partagez
                vos exploits, discutez de stratégies, trouvez des équipes et
                forgez de nouvelles amitiés. Notre communauté est accueillante
                et respectueuse, parfaite pour tous les amateurs de jeux vidéo.
              </p>
            </div>
          </div>
        </section>

        <section className="call-to-action">
          <h2>Prêt à rejoindre la compétition ?</h2>
          <a href="/profil" className="button">
            S'inscrire
          </a>
        </section>

        <footer className="footer">
          <p>Contactez-nous : contact@tournoigaming.com</p>
        </footer>
      </div>
    </div>
  );
};

export default home;
