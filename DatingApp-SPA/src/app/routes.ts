import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LocaitionComponent } from './Locaition/location-list/Locaition.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_core/_guards/auth.guard';
import { LocationResolver } from './_resolvers/location.resolver';
import { LocationAddComponent } from './Locaition/location-add/location-add.component';
import { PoListComponent } from './Po/po-list/po-list.component';
import { PoAddComponent } from './Po/po-add/po-add.component';
import { PoResolver } from './_resolvers/po.resolver';

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
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
