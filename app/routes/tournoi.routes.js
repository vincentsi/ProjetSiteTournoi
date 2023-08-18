const controller = require("../controllers/tournoi.controller");

module.exports = function (app) {
    app.get("/app/tournoi/:id", controller.tournoiInfo);
    app.get("/app/tournois/all", controller.getAlltournois);
    app.put("/app/tournoi/:id", controller.updateTournament);
    app.post("/app/tournoi/tournoicreation", controller.tournoiCrée);
  };