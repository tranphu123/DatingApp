import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportService } from '../_services/report.service';
import { Report } from '../_Models/report';

@Injectable()
export class ReportResolver implements Resolve<Report>
{
  pageNumber:1;
  pageSize: 5;
  constructor(private reportService: ReportService,
              private router: Router,
              private alertify: AlertifyService){}
        resolve(route: ActivatedRouteSnapshot): Observable<Report>{
          return this.reportService.GetallReport(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
              this.alertify.error('Problem retrieving data');
              this.router.navigate(['/dashboard']);
              return of(null);
            })
          );
        }
}

