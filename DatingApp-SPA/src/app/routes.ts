import { Routes } from '@angular/router';
import { HomeComponent } from './Views/home/home.component';
import { LocaitionComponent } from './Views/Locaition/location-list/Locaition.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { AuthGuard } from './_core/_guards/auth.guard';
import { LocationResolver } from './_core/_resolvers/location.resolver';
import { LocationAddComponent } from './Views/Locaition/location-add/location-add.component';
import { PoListComponent } from './Views/Po/po-list/po-list.component';
import { PoAddComponent } from './Views/Po/po-add/po-add.component';
import { PoResolver } from './_core/_resolvers/po.resolver';
import { OrderPartListComponent } from './Views/OrderPart/orderPart-List/orderPart-List.component';
import { OrderPartAddComponent } from './Views/OrderPart/orderPart-add/orderPart-add.component';
import { OrderPartResolver } from './_core/_resolvers/orderPart.resolver';
import { ReportComponent } from './Views/report/report.component';
import { ReportResolver } from './_core/_resolvers/report.resolver';

export const appRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'location',
        component: LocaitionComponent,
        resolve: { location: LocationResolver },
      },
      {
        path: 'location/add',
        component: LocationAddComponent,
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'po', component: PoListComponent,
       resolve: { po: PoResolver } },
      { path: 'po/add', component: PoAddComponent },
      {path: 'orderPart',component:OrderPartListComponent,
      resolve: {orderPart: OrderPartResolver}},
      {path: 'orderPart/add',component:OrderPartAddComponent},
      {path:'report',component:ReportComponent,
       resolve: {report: ReportResolver} },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
