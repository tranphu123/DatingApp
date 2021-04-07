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
import { LocaitionComponent } from './Views/Locaition/location-list/Locaition.component';
import { LocationAddComponent } from './Views/Locaition/location-add/location-add.component';
import { NavComponent } from './Views/nav/nav.component';
import { AuthService } from './_core/_services/Auth.service';
import { HomeComponent } from './Views/home/home.component';
import { RegisterComponent } from './Views/register/register.component';
import { AlertifyService } from './_core/_services/alertify.service';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { locationService } from './_core/_services/Location.service';
import { LocationResolver } from './_core/_resolvers/location.resolver';
import { PoAddComponent } from './Views/Po/po-add/po-add.component';
import { PoListComponent } from './Views/Po/po-list/po-list.component';
import { PoResolver } from './_core/_resolvers/po.resolver';
import { OrderPartListComponent } from './Views/OrderPart/orderPart-List/orderPart-List.component';
import { OrderPartAddComponent } from './Views/OrderPart/orderPart-add/orderPart-add.component';
import { OrderPartResolver } from './_core/_resolvers/orderPart.resolver';
import { ReportComponent } from './Views/report/report.component';
import { ReportResolver } from './_core/_resolvers/report.resolver';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';



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
      LocationAddComponent,
      PoAddComponent,
      PoListComponent,
      OrderPartListComponent,
      OrderPartAddComponent,
      ReportComponent,
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
      SnotifyModule,
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
         // //  whitelistedDomains: ['localhost:5000'],
         // //  blacklistedRoutes: ['localhost:5000/api/auth']
           whitelistedDomains: ['10.4.5.17:2020'],
          blacklistedRoutes: ['10.4.5.17:2020/api/auth']
        }
      }),
      environment.production ? [] : AkitaNgDevtools.forRoot(),
      AkitaNgRouterStoreModule
   ],
   providers: [
     AlertifyService,
      AuthService,
      AuthGuard,
      locationService,
      LocationResolver,
      PoResolver,
      OrderPartResolver,
      ReportResolver,
      
      {provide: 'SnotifyToastConfig', useValue: ToastDefaults},
       SnotifyService,
      { provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }},
      {
         provide: LocationStrategy,
         useClass: HashLocationStrategy
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
