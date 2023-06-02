const controller = require("../controllers/bracket.controller");

module.exports = function (app) {
    app.post("/app/bracket/adduser", controller.updateBracket);
    app.post("/app/searchOneUserBracket", controller.searchOneUserBracket);
    app.post("/app/bracketRandomiser", controller.bracketRandomiser);
    app.post("/app/matches/all", controller.getAllMatches);
    app.put("/app/bracket/updateMatch", controller.updateMatch);
  
  };