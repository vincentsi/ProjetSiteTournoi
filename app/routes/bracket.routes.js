const controller = require("../controllers/bracket.controller");

module.exports = function (app) {
    app.post("/app/bracket/createbracket", controller.createBracket);
    app.post("/app/bracket/adduser", controller.updateBracket);
    app.post("/app/searchBracket", controller.searchBracket);
    app.post("/app/searchOneUserBracket", controller.searchOneUserBracket);
    app.post("/app/bracketRandomiser", controller.bracketRandomiser);
    app.put("/app/bracket/updateMatch", controller.updateMatch);
  
  };