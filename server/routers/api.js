let router = require('express').Router();
let userCon = require('../controllers/users')
let User=require('../models/users')
let LocalStrategy = require('passport-local').Strategy;
let crypto=require('crypto');
let jwt = require('jsonwebtoken');
var passport = require('passport');

passport.use(new LocalStrategy({
        usernameField: 'email',
        session: false
    },
    function(email, password, done) {
      console.log('masuk');
        User.findOne({
            email:email
        },function(err,user){
       if (err) {
         done(null,false)
       } else {
         if (user) {
           if (user.password===crypto.createHmac('sha256',user.salt)
               .update(password).digest('hex')) {
             done(null,user)
           } else {
              done(null,false)
           }
         } else {
           done(null,false)
         }
       }
        })
    }
));


router.post('/user',userCon.create)
router.post('/login',passport.authenticate('local',{session:false}),
function(req,res){
  let user=res.req.user;
  let token=jwt.sign({
            userid:user.id,
            name:user.name,
            email:user.email
          },"rahasia",{ expiresIn: 60 * 60 });
  let senduser={name:user.name,email:user.email}
  let senddata={
    token:token,
    user:senduser
  }
  res.send(senddata)
})
router.get('/user',userCon.views)
router.get('/user',userCon.view)
router.delete('/user',userCon.delete)
module.exports=router
