const router = require('express').Router();
const { createUser, loginUser } = require('../models/user_model');
const sqoot                     = require('../models/sqoot_model');

router.get('/create_user', function(req,res) {
  res.render('user/create_user', {user: req.session.user});
});

router.post('/create_user', createUser, function(req,res) {
  console.log(req.body);
  res.redirect('/');
});

router.get('/login', function(req,res) {
  res.render('user/login', {user: req.session.user});
});

router.post('/login', loginUser,function(req,res) {
  console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
});

router.get('/collections', function(req,res) {
  res.render('user/collections', {user: req.session.user});
});



router.get('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});




module.exports = router;
