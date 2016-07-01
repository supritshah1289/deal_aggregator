var request      = require('request');
var SQOOTPRIVATE = process.env.SQOOTPRIVATE
var SQOOTPUBLIC  = process.env.SQOOTPUBLIC

module.exports = {
dailyDeals (req, res, next){
  request.get({
   url: 'http://api.sqoot.com/v2/deals',
   qs: {
     'api_key': SQOOTPRIVATE,
     'per_page': 50,
     'page': 55,
     'online':true
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
