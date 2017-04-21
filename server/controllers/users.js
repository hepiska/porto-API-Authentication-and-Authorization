let User = require('../models/users')
var jwt = require('jsonwebtoken');
let shortid=require('short-id')
let crypto = require('crypto');
module.exports={
  create(req,res){
    let salt=shortid.generate()
    User.create({
      name:req.body.name,
      email:req.body.email,
      salt:salt,
      password:crypto.createHmac('sha256', salt)
        .update(req.body.password).digest('hex')
    }
      ,function(err,succ){
        if (err) {
          res.send(err);
        } else {
          res.send('register success')
        }
      })
  },
  views(req,res){
    User.find({}
      ,function(err,data){
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
  },
  view(req,res){
    User.findById(req.params.id
      ,function(err,data){
        if (err) {
          res.send(err)
        } else {
          res.send(data)
        }
      })
  },
  delete(req,res){
    User.findOneAndRemove({
      _id: req.params.id
    }
      ,function(err,succ){
        if (err) {
          res.send(err)
        } else {
          res.send('delete success')
        }
      })
  }
}
