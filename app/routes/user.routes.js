const controller = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

const upload = multer();

module.exports = function (app) {
  app.get("/app/user/:id", controller.userInfo);
  app.get("/app/all", controller.getAllUsers);
  app.post("/app/bracket/RankUser", controller.updateRankUser);
  
  app.post("/app/upload", upload.single("file"), uploadController.uploadProfil);
  app.put("/app/user/:id", controller.updateUser);
};
