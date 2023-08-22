const controller = require("../controllers/jeu.controller");
const { authmiddleware } = require("../middleware");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");
const upload = multer();
module.exports = function (app) {
    app.get("/app/jeu/:id", controller.jeuInfo);
    app.get("/app/jeux/all", controller.getAlljeux);
    app.post("/app/jeu/jeucreation",[authmiddleware.tokenAdmin], controller.jeuCrée);
    app.put("/app/jeu/:id", controller.updateJeu);
    app.delete("/app/jeu/:id", controller.deleteJeu);
    app.post("/app/jeu/upload", upload.single("file"), uploadController.uploadImgJeu);
    
  };