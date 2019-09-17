import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../services/facebook.service';
import 'rxjs/add/operator/switchMap';

// Component controlling and handling all data received from the Rainbow Data API.
@Component({
   moduleId: module.id,
   selector: 'facebook',
   templateUrl: '../../app/views/facebook.component.html'
})
export class FacebookComponent implements OnInit {
   constructor(
      private FacebookService: FacebookService
   ){}

   infos : any = null;

   /**
    * When the component is initialized, check in the browser URI if a user_code is present.
    * If it is, refactor and pass it with the method setFbAccessToken
    * @method ngOnInit
    */
   ngOnInit(): void{
      const user_code = window.location.href.split('code=').slice(1).toString();
      if(user_code){
         this.setFbAccessToken(user_code);
      }
   }

   logFbUser(): void{
      this.FacebookService.logFbUser();
   }

   /**
    * Subscribe to the http observable of the FacebookService method to send the user_code
    * to the Rainbow Data API in order to set the access token in the API, server side.
    * @method setFbAccessToken
    * @param  {string}         user_code [code retrieved below on the "ngOnInit" method]
    */
   setFbAccessToken(user_code : string) : void{
      this.FacebookService.setFbAccessToken(user_code).subscribe(res =>{
         if(res.status === 200){
            this.getFbInfos();
         }
      }, error => console.log("Error: ", error))
   }

   /**
    * Subscribe to the http observable of the FacebookService method to get the JSON Object
    * containing all the user's personnal informations.
    * Store these informations in a variable used in the view.
    * @method getFbInfos
    */
   getFbInfos(): void{
      this.FacebookService.getFbInfos().subscribe(infos => {
         this.infos = infos;
      })

   }


}
