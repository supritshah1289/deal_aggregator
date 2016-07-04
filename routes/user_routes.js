const router = require('express').Router();
const { createUser, loginUser, saveToCollection, getCollection, removeFromCollection } = require('../models/user_model');
const sqoot                     = require('../models/sqoot_model');

router.get('/create_user', function(req,res) {
  res.render('user/create_user', {user: req.session.user});
});

router.post('/create_user', createUser, function(req,res) {
  // console.log(req.body);
  res.redirect('/');
});

router.get('/login', function(req,res) {
  res.render('user/login', {user: req.session.user});
});

router.post('/login', loginUser,function(req,res) {
  // console.log(res.user);
  req.session.user = res.user;

  req.session.save(function(err) {
    if(err) throw err;
    res.redirect('/');
  });
});


router.get('/collections',getCollection,function(req,res){
  // console.log(res.favorites[0].favorites)
    res.render('user/collections', {
    user: req.session.user,
    favs: res.favorites[0].favorites
  });
});

router.get('/save', saveToCollection, function(req,res){
 res.redirect('/');
})

router.get('/remove', removeFromCollection,function(req, res){
  console.log(req.session.user.email)
  console.log(req.query.img)
  console.log(req.query.link)
  console.log(req.query.title)
  res.redirect('user/collections')
  // console.log(req.query)
})

router.get('/logout', function(req,res) {
  req.session.destroy(function(err) {
    res.redirect('/');
  });
});




module.exports = router;
