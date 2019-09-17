import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// Service used to pass the data from the API rainbowdata to the demonstrator
// We use services to enhance the application and to make it more convenient to possible changes
// by encapsulating the way the data is retrieved (the component do not know and care how the data he gets is retrieved)
@Injectable()
export class FacebookService{


   constructor(private http:Http){
   }

   api : string = "rainbowdata.api.facebook"

   /**
    * Use the first route of the API to redirect to the social network autorisation page (and get the user_code)
    * @method logFbUser
    */
   logFbUser() : void{
       window.location.href = this.api + "/getFbCode";
   }

   /**
    * Use the second route to set the access token, exchanged with the user_code
    * @method setFbAccessToken
    * @param  {string}         user_code [code retrieved in the browser URI in FacebookComponent]
    * @return void
    */
   setFbAccessToken(user_code : string){
      return this.http.get(this.api + '/setFbAccessToken/' + user_code).map(res => res);
   }

   /**
    * Use the third route to get the user's informations
    * @method getFbInfos
    * @return {[JSON Object]}   [JSON containing all the user's personnal informations]
    */
   getFbInfos(){
      return this.http.get(this.api + '/getFbInfos').map(res => res.json());
   }

}
