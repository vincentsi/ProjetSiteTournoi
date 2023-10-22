import React from "react";

const home = () => {
  return (
    <div
      // className="background-image"
      // style={{ backgroundImage: `url(./img/homeImg/fond.jpeg)` }}
    >
      <div className="container">
        <header className="header">
          <h1>Notre Site de Tournois</h1>
          <p>La plateforme ultime pour les joueurs compétitifs</p>
        </header>

        <section className="features">
          <div className="feature1_home">
            <img src="./img/homeImg/smash.jpg" alt="Image1" />
            <div className="texte_row">
              <h2>Participez à des tournois gratuits en quelques clics</h2>
              <p>
                Atque, ut Tullius ait, ut etiam ferae fame monitae plerumque ad
                eum locum ubi aliquando pastae sunt revertuntur, ita homines
                instar turbinis degressi montibus impeditis et arduis loca
                petivere mari confinia, per quae viis latebrosis sese
                convallibusque occultantes cum appeterent noctes luna etiam tum
                cornuta ideoque nondum solido splendore fulgente nauticos
                observabant quos cum in somnum sentirent effusos per ancoralia,
                quadrupedo gradu repentes seseque suspensis passibus iniectantes
                in scaphas eisdem sensim nihil opinantibus adsistebant et
                incendente aviditate saevitiam ne cedentium quidem ulli parcendo
                obtruncatis omnibus merces opimas velut viles nullis
                repugnantibus avertebant. haecque non diu sunt perpetrata
              </p>
            </div>
          </div>

          <div className="feature2_home">
            <img src="./img/homeImg/tgestion.jpg" alt="Image2" />
            <div className="texte_row">
              <h2>Gérez vos compétitions de jeux</h2>
              <p>
                Atque, ut Tullius ait, ut etiam ferae fame monitae plerumque ad
                eum locum ubi aliquando pastae sunt revertuntur, ita homines
                instar turbinis degressi montibus impeditis et arduis loca
                petivere mari confinia, per quae viis latebrosis sese
                convallibusque occultantes cum appeterent noctes luna etiam tum
                cornuta ideoque nondum solido splendore fulgente nauticos
                observabant quos cum in somnum sentirent effusos per ancoralia,
                quadrupedo gradu repentes seseque suspensis passibus iniectantes
                in scaphas eisdem sensim nihil opinantibus adsistebant et
                incendente aviditate saevitiam ne cedentium quidem ulli parcendo
                obtruncatis omnibus merces opimas velut viles nullis
                repugnantibus avertebant. haecque non diu sunt perpetrata
              </p>
            </div>
          </div>

          <div className="feature3_home">
            <img src="image3.jpg" alt="Image3" />
            <div className="texte_row">
              <h2>Fonctionnalité 3</h2>
              <p>
                Atque, ut Tullius ait, ut etiam ferae fame monitae plerumque ad
                eum locum ubi aliquando pastae sunt revertuntur, ita homines
                instar turbinis degressi montibus impeditis et arduis loca
                petivere mari confinia, per quae viis latebrosis sese
                convallibusque occultantes cum appeterent noctes luna etiam tum
                cornuta ideoque nondum solido splendore fulgente nauticos
                observabant quos cum in somnum sentirent effusos per ancoralia,
                quadrupedo gradu repentes seseque suspensis passibus iniectantes
                in scaphas eisdem sensim nihil opinantibus adsistebant et
                incendente aviditate saevitiam ne cedentium quidem ulli parcendo
                obtruncatis omnibus merces opimas velut viles nullis
                repugnantibus avertebant. haecque non diu sunt perpetrata
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
          <p>Contactez-nous : contact@exemple.com</p>
        </footer>
      </div>
    </div>
  );
};

export default home;
