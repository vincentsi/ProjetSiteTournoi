const controller = require("../controllers/tournoi.controller");

module.exports = function (app) {
    app.get("/app/tournoi/:id", controller.tournoiInfo);
    app.get("/app/tournois/all", controller.getAlltournois);
    app.post("/app/tournoi/tournoiuptest", controller.tournoiUpTest);
  };