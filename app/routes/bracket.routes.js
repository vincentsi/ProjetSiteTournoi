const controller = require("../controllers/bracket.controller");
const controllerRole = require("../controllers/tournoiRole.controller");

module.exports = function (app) {
  app.post("/app/bracket/adduser", controllerRole.addInscritBracket);
  app.post("/app/bracket/deluser", controller.updateBracketDel);
  app.post("/app/searchOneUserBracket", controller.searchOneUserBracket);
  app.post("/app/generateBracket", controller.generateBracket);

  app.post("/app/matches/all", controller.getAllMatches);
  app.put("/app/bracket/updateMatch", controller.updateMatch);
  app.put("/app/bracket/reportwinner", controller.reportWinner);
  app.put("/app/bracket/cancelWinner", controller.cancelWinner);

  app.post("/app/bracket/affParticipant", controller.affParticipant);
  app.post("/app/bracket/matches", controller.getUserMatches);
};
