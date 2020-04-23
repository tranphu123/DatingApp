import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Po } from '../_core/_Models/Po';
import { PoService } from '../_core/_services/po.service';
import { AlertifyService } from '../_core/_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PoResolver implements Resolve<Po>
{
  pageNumber:1;
  pageSize: 5;
  constructor(private poService: PoService,
              private router: Router,
              private alertify: AlertifyService){}
        resolve(route: ActivatedRouteSnapshot): Observable<Po>{
          return this.poService.GetPo(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
              this.alertify.error('Problem retrieving data');
              this.router.navigate(['/dashboard']);
              return of(null);
            })
          );
        }
}

