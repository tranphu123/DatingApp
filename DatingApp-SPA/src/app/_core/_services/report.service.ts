import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReportSearch } from '../_Models/reportSearch';
import { Report } from '../_Models/report';
import { PaginatedResult } from '../_Models/Pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl = environment.apiUrl;
  reportSouce = new BehaviorSubject<object>({});
  currentReport = this.reportSouce.asObservable();
  flagsouce = new BehaviorSubject<string>('0');
  currentflag = this.flagsouce.asObservable();
  constructor(private http: HttpClient) {}
  search(page?,itemsPerPage?,reportSearch?: ReportSearch): Observable<PaginatedResult<Report[]>> {
    const paginatedResult: PaginatedResult<Report[]> = new PaginatedResult<
      Report[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'report';
    return this.http
      .post<any>(url, reportSearch, { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
  GetallReport(page?,itemsPerPage?): Observable<PaginatedResult<Report[]>> {
    const paginatedResult: PaginatedResult<Report[]> = new PaginatedResult<
      Report[]
    >();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Report[]>(this.baseUrl + 'report/all', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
  }
}
