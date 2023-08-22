const controller = require("../controllers/tournoi.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

module.exports = function (app) {
    app.get("/app/tournoi/:id", controller.tournoiInfo);
    app.get("/app/tournois/all", controller.getAlltournois);
    app.put("/app/tournoi/:id", controller.updateTournament);
    app.post("/app/tournoi/tournoicreation", controller.tournoiCrée);
    app.post("/app/tournoi/upload", upload.single("file"), uploadController.uploadImgTournoi);
  };