const { MongoClient } = require('mongodb');
const dbConnection = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/users';
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

function loginUser(req,res,next) {
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('user').findOne({"email": email}, function(err, user) {
      if(err) throw err;
      if(user === null) {
        console.log('Can\'t find user with email ',email);
      } else  if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }
      next();
    })
  })
}

function createSecure(email, password, callback) {
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      callback(email,hash);
    })
  })
}

function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser)
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, function(err, db) {
      let userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        favorites: [],
        email: email,
        passwordDigest: hash
      }
      db.collection('user').insertOne(userInfo, function(err, result) {
        if(err) throw err;
        next();
      });
    });
  }
}

function saveToCollection (req,res,next){
  //entire favorites array
  let email = req.session.user.email
  let img = req.query.img;
  let link = req.query.link;
  let title = req.query['title-price']

  MongoClient.connect(dbConnection, function(err,db){

    db.collection('user').update({"email" : email},{"$addToSet" :{"favorites" : {"title" : title, "link" : link, "img" : img }}},
    function (err, user){
      if (err) throw err
        next()

    })//end dbcollection
  })//end mongoClient
}//end save favorite



function getCollection (req, res, next){
  let userEmail = req.session.user.email

  MongoClient.connect(dbConnection, function(err, db){

    db.collection('user')
    .find({email: userEmail},{_id: 0, favorites:[]})
    .toArray(function(err, result){
      if(err) throw err
      res.favorites = result
      next();
    })

  })//end mongo client
}//end get collection



function removeFromCollection(req, res, next) {
       //entire favorites array
  let userEmail = req.session.user.email
  let rimg = req.query.img
  let rlink = req.query.link
  let rtitle = req.query.title
       MongoClient.connect(dbConnection, function(err, db) {
               db.collection('user').update({
                       email: userEmail
                   }, {
                       $pull: {
                           favorites: {
                               title: rtitle,
                               link: rlink,
                               title: rtitle
                           }
                       }
                   }, function(err, user) {
                       if (err) throw err
                       res.user = user;
                       next()
                   }) //end dbcollection
           }) //end mongoClient
   } //end save favorite



// function removeItem (req, res, next){
//   let userEmail = req.session.user.email
//   let rimg = req.query.img
//   let rlink = req.query.link
//   let rtitle = req.query.title

//   MongoClient.connect(dbConnection, function(err, db){

//     db.collection('user').update(
//      {email : userEmail},
//      {$pull :{favorites : {title : rtitle, link : rlink, img: rimg}}},
//    function (err, user){
//      if (err) throw err
//        res.user = user;
//        next()

//    })

//   })//end mongo client
// }//end get collection




module.exports = { createUser, loginUser, saveToCollection, getCollection, removeFromCollection}









