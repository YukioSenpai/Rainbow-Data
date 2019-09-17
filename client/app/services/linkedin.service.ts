import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


// Service used to pass the data from the API rainbowdata to the demonstrator
// We use services to enhance the application and to make it more convenient to possible changes
// by encapsulating the way the data is retrieved (the component do not know and care how the data he gets is retrieved)
@Injectable()
export class LinkedinService{

   constructor(private http:Http){
   }

   api : string = "rainbowdata.api.linkedin";

   /**
    * Use the first route of the API to redirect to the social network autorisation page (and get the user_code)
    * @method logLiUser
    */
   logLiUser() : void{
      window.location.href = this.api + "/getLiCode";
   }

   /**
    * Use the second route to set the access token, exchanged with the user_code
    * @method setLiAccessToken
    * @param  {string}         user_code [code retrieved in the browser URI in FacebookComponent]
    * @return void
    */
   setLiAccessToken(user_code : string){
      return this.http.get( this.api + '/setLiAccessToken/' + user_code).map(res => res);

   }

   /**
    * Use the third route to get the user's informations
    * @method getLiInfos
    * @return {[JSON Object]}   [JSON containing all the user's personnal informations]
    */
   getLiInfos(){
      return this.http.get(this.api + '/getLiInfos').map(res => res.json());
   }

}
