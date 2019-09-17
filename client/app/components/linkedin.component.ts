import { Component, OnInit } from '@angular/core';
import { LinkedinService } from '../services/linkedin.service';
import 'rxjs/add/operator/switchMap';

// Component controlling and handling all data received from the Rainbow Data API.
@Component({
   moduleId: module.id,
   selector: 'linkedin',
   templateUrl: '../../app/views/linkedin.component.html'
})
export class LinkedinComponent{
   constructor(
      private LinkedinService: LinkedinService
   ){}

   infos : any = null;

   /**
    * When the component is initialized, check in the browser URI if a user_code is present.
    * If it is, refactor and pass it with the method setLiAccessToken
    * @method ngOnInit
    */
   ngOnInit(): void{
      const user_code = window.location.href.split('code=').slice(1).toString();
      if(user_code){
         this.setLiAccessToken(user_code);
      }
   }

   logLiUser(): void{

      this.LinkedinService.logLiUser();

   }

   /**
    * Subscribe to the http observable of the LinkedinService method to send the user_code
    * to the Rainbow Data API in order to set the access token in the API, server side.
    * @method setLiAccessToken
    * @param  {string}         user_code [code retrieved below on the "ngOnInit" method]
    */
   setLiAccessToken(user_code : string) : void{
      this.LinkedinService.setLiAccessToken(user_code).subscribe(res =>{
         if(res.status === 200){
            this.getLiInfos();
         }
      }, error => console.log("Error: ", error))
   }

   /**
    * Subscribe to the http observable of the LinkedinService method to get the JSON Object
    * containing all the user's personnal informations.
    * Store these informations in a variable used in the view.
    * @method getLiInfos
    */
   getLiInfos(): void{
      this.LinkedinService.getLiInfos().subscribe(infos => {
         this.infos = infos;
      })

   }

}
