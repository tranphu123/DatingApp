import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_core/_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OrderPart } from '../_core/_Models/OrderPart';
import { OrderPartService } from '../_core/_services/orderPart.service';

@Injectable()
export class OrderPartResolver implements Resolve<OrderPart> {
  pageNumber:1;
  pageSize: 5;
  constructor(private orderPartService: OrderPartService,
              private router: Router,
              private alertify: AlertifyService){}
        resolve(route: ActivatedRouteSnapshot): Observable<OrderPart>{
          return this.orderPartService.GetOrderPart(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
              this.alertify.error('Problem retrieving data');
              this.router.navigate(['/dashboard']);
              return of(null);
            })
          );
        }

}
