import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { appRoutes } from './routes';
import { AuthGuard } from './_core/_guards/auth.guard';

import { AppComponent } from './app.component';
import { LocaitionComponent } from './Locaition/location-list/Locaition.component';
import { LocationAddComponent } from './Locaition/location-add/location-add.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_core/_services/Auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_core/_services/alertify.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { locationService } from './_core/_services/Location.service';
import { LocationResolver } from './_resolvers/location.resolver';



export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      LocaitionComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      DashboardComponent,
      LocationAddComponent

   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      BrowserAnimationsModule,
      RouterModule.forRoot(appRoutes),
      PaginationModule.forRoot(),
      NgxSpinnerModule,

      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['http://localhost:5000'],
          blacklistedRoutes: ['http://localhost:5000/api/auth']
        }
      })
   ],
   providers: [
     AlertifyService,
      AuthService,
      AuthGuard,
      locationService,
      LocationResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
