// Variables and dependencies initialization
var express = require('express');
var router = express.Router();
var https = require('https');
var config = require('../config/liconfig');
var request = require('request');
var token = null;


/**
 * First route, redirect the client to an URI containing a code that can be
 * exchanged for the access token allowing Rainbow Data to make
 * requests to the social network API
 * @method
 * @return void
 */
router.get('/getLiCode', function(req, res){

   // We re-initialize the token here to prevent conflicts with the social network security
   token = null;
   // The redirection is made to this URI. It is made with parameters that can be changed in the config file.
   const uri = "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id="+
   config.client_id + "&redirect_uri="+ config.redirect_uri + "&state="+ config.state +"&scope="+ config.scope +"";

   res.redirect(uri);

});

/**
 * Second route, exhange the code recovered in the first route
 * for the access token and store it in the var "token"
 * @method
 * @return Status 200
 */
router.get('/setLiAccessToken/:user_code', function(req, response){

   // Check is the token is not already set. Prevent useless calls of this function, thus enhancing the API efficiency
   if(!token){
      const user_code = req.params.user_code;

      // Set the headers for the POST request
      var headers = {
         'Content-Type':     'application/x-www-form-urlencoded'
      };
      // Configure the request
      var options = {
         url: 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code='+ user_code +'&redirect_uri='+ config.redirect_uri +
         '&client_id='+ config.client_id + '&client_secret='+ config.client_secret + '',
         method: 'POST',
         headers: headers,
      };
      // Start the POST request to get the access token
      request(options, function (error, res, body) {
            token = JSON.parse(body).access_token;
            response.sendStatus(200); // Send the confirmation so that the client know that the request is completed
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
router.get('/getLiInfos', function(req, response){

   // Check is the token is not already set. Prevent useless calls of this function, thus enhancing the API efficiency
   if(token){
      const uri = "https://api.linkedin.com/v1/people/~:("+ config.fields + ")?oauth2_access_token=" + token + "&format=json";
      // Call the social network's API with the URI constructed above. On response, return the body containing user's personnal informations
      https.get(uri, function(res){
         res.on('data', function(body, res){
            response.send(body);
         });
      });
   }

});

// Export the router and the routes so that express know what to do when the routes are called
module.exports = router;
