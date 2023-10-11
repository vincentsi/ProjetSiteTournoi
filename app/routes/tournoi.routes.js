const controller = require("../controllers/tournoi.controller");
const controllerRole = require("../controllers/tournoiRole.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();

module.exports = function (app) {
    app.get("/app/tournoi/:id", controller.tournoiInfo);
    app.get("/app/tournois/all", controller.getAlltournois);
    app.put("/app/tournoi/:id", controller.updateTournament);
    app.post("/app/tournoi/tournoicreation", controller.tournoiCrée);
    app.post("/app/tournoi/infoOrga/:tournoiId", controllerRole.getOrganisateurTournoi);
    
    app.post("/app/tournoi", upload.single("file"), uploadController.uploadImgTournoi);

    app.post("/app/tournoi/assignRole", controllerRole.assignRoleTournoiAdminToUser);
  };