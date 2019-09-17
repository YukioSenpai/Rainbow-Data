import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FacebookService } from './services/facebook.service';
import{ LinkedinService } from './services/linkedin.service';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './components/app.component';
import { FacebookComponent }  from './components/facebook.component';
import { LinkedinComponent }  from './components/linkedin.component';
import { FormsModule } from '@angular/forms';

// Configure and bootstrap the angular application
@NgModule({
   imports: [ BrowserModule, HttpModule, FormsModule ],
   declarations: [ AppComponent, FacebookComponent, LinkedinComponent ],
   providers: [ FacebookService, LinkedinService ],
   bootstrap: [ AppComponent, FacebookComponent, LinkedinComponent ]

})
export class AppModule { }
