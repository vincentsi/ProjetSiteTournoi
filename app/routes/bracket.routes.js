const controller = require("../controllers/bracket.controller");

module.exports = function (app) {
    app.post("/app/bracket/adduser", controller.updateBracket);
    app.post("/app/bracket/deluser", controller.updateBracketDel);
    app.post("/app/searchOneUserBracket", controller.searchOneUserBracket);
    app.post("/app/bracketRandomiser", controller.startBracketRandomiser);
    app.post("/app/matches/all", controller.getAllMatches);
    app.put("/app/bracket/updateMatch", controller.updateMatch);
    app.post("/app/bracket/affParticipant", controller.affParticipant);
    app.post("/app/bracket/matches", controller.getUserMatches);
  };