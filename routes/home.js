const router        = require('express').Router()
const sqoot         = require('../models/sqoot_model');

router.get('/',sqoot.dailyDeals ,function(req, res){
  // console.log(res.deals, "Adding Deals")
  res.render('index', {
    user: req.session.user,
    deals: res.deals
  });
}); //router

module.exports = router
