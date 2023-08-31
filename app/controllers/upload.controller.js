const db = require("../models");
const UserModel = db.user;
const fs = require("fs");
const sharp = require("sharp");
const { uploadErrors } = require("../utils/errors.utils");
const JeuModel = db.listejeu;
const TournoiModel = db.listetournoi;


module.exports.uploadProfil = async (req, res) => {
    //console.log(req.file);
    //renome le fichier avec extension .jpg
    const fileName = req.body.name +".jpg"; 
    try {
      if (
        req.file.mimetype != "image/jpg" &&
        req.file.mimetype != "image/png" &&
        req.file.mimetype != "image/jpeg"
      )
      throw Error("invalid file");

      if (req.file.size > 500000) throw Error("max size");
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
  
    try {
      await sharp(req.file.buffer)
        .resize({ width: 150, height: 150 }) 
        .toFile(`${__dirname}/../../client/public/uploads/profil/${fileName}`
        );
      res.status(200).send("Photo de profil chargé avec succés");
    } catch (err) {
      res.status(400).send(err);
    }
    try{
        await UserModel.findByPk(req.body.userId)
            if (UserModel != null) {
                UserModel.update(
                    {picture: "./uploads/profil/" + fileName},
                    { where: { id: req.body.userId }}
                    )
                }   
            } catch (err) {
              console.log(err);
        }
    };
        // req.body.userId,
        // { $set : {picture : "upload/profil/" + fileName}},
        // { new: true, upsert : true , setDefaultOnInsert : true },
        // (err, docs)=>{
        //     if(!err) return res.send(docs);
        //     else return res.status(500).send({ message: err})
        // }
  
  
        module.exports.uploadImgJeu = async (req, res) => {
          //console.log(req.file);
          //renome le fichier avec extension .jpg
          const fileName = req.body.name +".jpg"; 
          try {
            if (
              req.file.mimetype != "image/jpg" &&
              req.file.mimetype != "image/png" &&
              req.file.mimetype != "image/jpeg"
            )
            throw Error("invalid file");
      
          } catch (err) {
            
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
          }
        
          try {
            await sharp(req.file.buffer)
              // .resize({ width: 350, height: 350 }) 
              .toFile(`${__dirname}/../../client/public/img/imagejeux/${fileName}`
              );
            res.status(200).send("Photo de profil chargé avec succés");
          } catch (err) {
            res.status(400).send(err);
          } 
          try{
            await JeuModel.findByPk(req.body.jeuId)
                if (JeuModel != null) {
                  JeuModel.update(
                        {picture: "./img/imagejeux/" + fileName},
                        { where: { id: req.body.jeuId }}
                        )
                    }   
                } catch (err) {
                  console.log(err);
            } 
        };

        module.exports.uploadImgTournoi = async (req, res) => {
          //console.log(req.file);
          //renome le fichier avec extension .jpg
          const fileName = req.body.name +".jpg"; 
          try {
            if (
              req.file.mimetype != "image/jpg" &&
              req.file.mimetype != "image/png" &&
              req.file.mimetype != "image/jpeg"
            )
            throw Error("invalid file");
      
          } catch (err) {
            
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
          }
        
          try {
            await sharp(req.file.buffer)
              // .resize({ width: 350, height: 350 }) 
              .toFile(`${__dirname}/../../client/public/img/imagetournois/${fileName}`
              );
            res.status(200).send("Photo de profil chargé avec succés");
          } catch (err) {
            res.status(400).send(err);
          } 
          try{
            await TournoiModel.findByPk(req.body.tournoiId)
                if (TournoiModel != null) {
                  TournoiModel.update(
                        {picture: "./../img/imagetournois/" + fileName},
                        { where: { id: req.body.tournoiId }}
                        )
                    }   
                } catch (err) {
                  console.log(err);
            } 
        };