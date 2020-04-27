import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { PaginatedResult } from '../_Models/Pagination';
import { Location } from '../_Models/Location';
import { map } from 'rxjs/operators';
// const httpOptions ={
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//   }),
// }

@Injectable({
  providedIn: 'root'
})
export class locationService {
baseUrl  =environment.apiUrl;
locationSource =new BehaviorSubject<object>({});
currentLocation =this.locationSource.asObservable();
flagsource = new BehaviorSubject<string>('0');
currentflag =this.flagsource.asObservable();
constructor(private http:HttpClient) { }

  GetLocation(page?, itemsPerPage?): Observable<PaginatedResult<Location[]>>
  {
    const paginatedResult: PaginatedResult<Location[]> = new PaginatedResult<Location[]>();
    let params =new HttpParams();
    if(page!=null && itemsPerPage != null)
    {
      params =params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
    }

    return this.http.get<Location[]>(this.baseUrl + 'location',{observe: 'response',params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination')!=null)
          {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  SeachLocation(page?,itemsPerPage?,text?): Observable<PaginatedResult<Location[]>>
  {
    const paginatedResult: PaginatedResult<Location[]> = new PaginatedResult<Location[]>();
    let params =new HttpParams();
    if(page!=null && itemsPerPage != null)
    {
      params =params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
      return this.http.get<Location[]>(this.baseUrl + 'location/search/'+ text,{observe: 'response',params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if(response.headers.get('Pagination')!=null)
          {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
    }
  }
  createLocation(location: Location) {
    return this.http.post(this.baseUrl +  'Location', location);
  }

  getAllLocation() {
    return this.http.get<Location[]>(this.baseUrl + 'location/all', {});
  }
  updateLocation(location: Location) {
    return this.http.put(this.baseUrl + 'location', location);
  }

  deleteLocation(id: number) {
    return this.http.delete(this.baseUrl + 'location/' + id, {});
  }

  changeLocation(location: Location) {
    this.locationSource.next(location);
  }

  changeFlag(flag: string) {
    this.flagsource.next(flag);
  }
  importExcel(files: FormData)
  {
    return this.http.post(this.baseUrl+'location/importExcel',files);
  }
}
