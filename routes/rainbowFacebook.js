// Variables and dependencies initialization
var express = require('express');
var router = express.Router();
var https = require('https');
var config = require('../config/fbconfig');
// Graph SDK
var FB = require('fb');
var token = null;

/**
 * First route, redirect the client to an URI containing a code that can be
 * exchanged for the access token allowing Rainbow Data to make
 * requests to the social network API
 * @method
 * @return void
 */
router.get('/getFbCode', function(req, res){

   // We re-initialize the token here to prevent conflicts with the social network security
   token = null;
   // The redirection is made to this URI. It is made with parameters that can be changed in the config file.
   const uri = `https://www.facebook.com/v2.9/dialog/oauth?client_id=`+ config.client_id +
   `&redirect_uri=` + config.redirect_uri + `&scope=`+ config.scope + ``;

   res.redirect(uri);

});

/**
 * Second route, exhange the code recovered in the first route
 * for the access token and store it in the var "token"
 * @method
 * @return Status 200
 */
router.get('/setFbAccessToken/:user_code', function(req, response){

   // Check is the token is not already set. Prevent useless calls of this function, thus enhancing the API efficiency
   if(!token){
      const user_code = req.params.user_code;
      const uri = "https://graph.facebook.com/v2.9/oauth/access_token?client_id="+
      config.client_id +"&redirect_uri="+ config.redirect_uri +"&client_secret="+ config.client_secret +"&code="+ user_code +"";

      https.get(uri, function(res){
         // Call the social network's API with the URI constructed above. On response, parse the data received to get the access token
         res.on('data', function (body, res) {
            token = JSON.parse(body).access_token;
            response.sendStatus(200); // Send the confirmation so that the client know that the request is completed
         });
      });
   }
   else{
      response.sendStatus(200); // Send the confirmation so that the client know that the request is completed
   }

});

/**
 * Third and last route, retrive the user's personnal informations
 * @method
 * @return {[JSON object]}          [JSON object of the informations]
 */
router.get('/getFbInfos', function(req, response){

   // Check is the token is not already set. Prevent useless calls of this function, thus enhancing the API efficiency
   if(token){
   FB.setAccessToken(token);
   // We use the Fb graph SDK with the fields specified in the config file and the access token to retrieve user's informations
   FB.api('me', { fields: config.fields }, function (res) {
      // If there is an error, log it then exit the function
      if(!res || res.error) {
         console.log(!res ? 'error occurred' : res.error);
         return;
      }
      response.json(res);
   });
}
});

// Export the router and the routes so that express know what to do when the routes are called
module.exports = router;
