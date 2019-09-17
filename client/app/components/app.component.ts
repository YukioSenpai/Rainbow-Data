import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Http } from '@angular/http';
import { FacebookComponent } from './facebook.component';
import { FacebookService } from '../services/facebook.service';
import { LinkedinComponent } from './linkedin.component';
import { LinkedinService } from '../services/linkedin.service';

// This component display the basic view of the demonstrator (logo, footer...) and handle the two connection buttons for Facebook and LinkedIn

@Component({
   moduleId: module.id,
   selector: 'my-app',
   templateUrl: '../../app/views/app.component.html'
})

export class AppComponent {

   http : Http;
   fbService : FacebookService = new FacebookService(this.http);
   fbComponent : FacebookComponent = new FacebookComponent(this.fbService);

   liService : LinkedinService = new LinkedinService(this.http);
   liComponent : LinkedinComponent = new LinkedinComponent(this.liService);

   confirmFlag : boolean = false;
   authorizeIsActive :boolean = false;

   logFbUser(){
      this.fbComponent.logFbUser();
   }

   logLiUser(){
      this.liComponent.logLiUser();
   }

   /**
    * Prevent the button "Envoyer mes informations" from being used if the checkbox below in the app.component view is not checked.
    * Change the button with the "confirmFlag" var if the checkbox is checked.
    * @method displayConfirmation
    * @return void
    */
   displayConfirmation(){
      if(this.authorizeIsActive){
         this.confirmFlag = true;
      }

   }

}
