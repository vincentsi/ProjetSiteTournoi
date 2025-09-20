const controller = require("../controllers/jeu.controller");
const { authmiddleware } = require("../middleware");
const uploadController = require("../controllers/upload.controller");
const { upload } = require("../services/cloudinary.service");
module.exports = function (app) {
  app.get("/app/jeu/:id", controller.jeuInfo);
  app.post("/app/jeu/info", controller.jeuInfo2);
  app.post("/app/jeu/rank", controller.jeuRankInfo);
  app.get("/app/jeux/all", controller.getAlljeux);
  app.post(
    "/app/jeu/jeucreation",
    [authmiddleware.tokenAdmin, upload.single("picture")],
    (err, req, res, next) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            message: "Le fichier image est trop volumineux (max 5MB)",
            error: "FILE_TOO_LARGE",
          });
        }
        if (err.message === "Seules les images sont autorisées!") {
          return res.status(400).json({
            message: "Seules les images sont autorisées",
            error: "INVALID_FILE_TYPE",
          });
        }
        return res.status(500).json({
          message: "Erreur lors de l'upload du fichier",
          error: "UPLOAD_ERROR",
        });
      }
      next();
    },
    controller.jeuCrée
  );
  app.post("/app/jeu/addjeurank", controller.addJeuRank);
  app.put(
    "/app/jeu/:id",
    [
      authmiddleware.tokenAdmin,
      (err, req, res, next) => {
        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
              message: "Le fichier image ne peut pas dépasser 5MB",
              error: "LIMIT_FILE_SIZE",
            });
          }
        }
        if (err.message === "Seules les images sont autorisées!") {
          return res.status(400).json({
            message: "Seules les images sont autorisées",
            error: "INVALID_FILE_TYPE",
          });
        }
        return res.status(500).json({
          message: "Erreur lors de l'upload du fichier",
          error: "UPLOAD_ERROR",
        });
      },
      upload.single("picture"),
    ],
    controller.updateJeu
  );
  app.delete("/app/jeu/:id", [authmiddleware.tokenAdmin], controller.deleteJeu);
  app.post(
    "/app/jeu/upload",
    upload.single("file"),
    uploadController.uploadImgJeu
  );
};
