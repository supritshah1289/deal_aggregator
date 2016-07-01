var request      = require('request');
var SQOOTPRIVATE = process.env.SQOOTPRIVATE
var SQOOTPUBLIC  = process.env.SQOOTPUBLIC

module.exports = {
dailyDeals (req, res, next){
  request.get({
   url: 'http://api.sqoot.com/v2/deals',
   qs: {
     'api_key': SQOOTPRIVATE,
     'per_page': 30,
     'page': 44
   },
   headers: {
     'User-Agent': 'request'
   }
 }, (err, response, data)=>{
   if ( err ) throw err
     let item = JSON.parse(data)
   res.deals = item.deals
   next()
 }//end function

 )//end request.get

}//end daily deals

} // module.exports



  // request('http://api.sqoot.com/v2/deals?api_key=' + SQOOTPRIVATE + '&per_page=20', function(err, res, body) {
  //               if (err) throw err;
  //               let data = JSON.parse(body); //making json object
  //               let results = data.deals
  //               console.log(SQOOTPRIVATE);
  //               results.forEach(function(item) {
  //                   $price = item.deal.price;
  //                   $title = item.deal.short_title;
  //                   console.log(`Title: ${$title}, Price: ${$price}`)
  //                       // console.log(item)
  //               })
  //           });
