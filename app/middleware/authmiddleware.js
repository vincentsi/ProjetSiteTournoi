const jwt = require('jsonwebtoken');
const db = require("../models");
const UserModel = db.user;


module.exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                // res.cookies('jwt', '', { maxAge: 1});
                next();
            } else {
                const user = await UserModel.findByPk(decodedToken.id);
                res.locals.user = user.dataValues;

                console.log(res.locals.user);
                // console.log(res.locals.user);
                next();
               
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
    console.log("check user");
}
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error(err);
                res.send(200).json('no token')
            }else {
                console.log(decodedToken.id);

                next();
            }
        });
    }else {
        console.log('no token');
    }
}
module.exports.tokenAdmin = (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // const token = authHeader && authHeader.split(' ')[1]
    const token = req.cookies.jwt;
    //  onsole.log(req.headers)
    console.log(token)
    if (token !== undefined) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
       user = await UserModel.findByPk(decodedToken.id)
       .then(user => {
        user.getRoles().then(roles => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              res.locals.user = user.dataValues;
              console.log(res.locals.user);
              next();
              return;
            }
          }
          res.status(403).send({
            message: "Require Admin Role!"
          });
          return;
        });    
      });   
    });
}else{ res.status(403).send({message: "connecter vous"});return;}
  }
  