import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { locationService } from '../_services/Location.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LocationResolver implements Resolve<Location> {
  pageNumber:1;
  pageSize: 5;
  constructor(private locationService: locationService,
              private router: Router,
              private alertify: AlertifyService){}
        resolve(route: ActivatedRouteSnapshot): Observable<Location>{
          return this.locationService.GetLocation(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
              this.alertify.error('Problem retrieving data');
              this.router.navigate(['/dashboard']);
              return of(null);
            })
          );
        }

}
