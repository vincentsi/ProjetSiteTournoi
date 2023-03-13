const controller = require("../controllers/jeu.controller");

module.exports = function (app) {
    app.get("/app/jeu/:id", controller.jeuInfo);
    app.get("/app/jeux/all", controller.getAlljeux);
    app.post("/app/jeu/jeuuptest", controller.jeuuptest);
  };