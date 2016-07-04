const router        = require('express').Router()
const sqoot         = require('../models/sqoot_model');

router.get('/',sqoot.dailyDeals ,function(req, res){
  res.render('index', {
    user: req.session.user,
    deals: res.deals
  });
}); //router




module.exports = router
