import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Po } from '../_Models/Po';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_Models/Pagination';

@Injectable({
  providedIn: 'root',
})
export class PoService {
  baseUrl = environment.apiUrl;
  poSource = new BehaviorSubject<object>({});
  currentPo = this.poSource.asObservable();
  flagsource = new BehaviorSubject<string>('0');
  currentflag = this.flagsource.asObservable();
  constructor(private http: HttpClient) {}
  GetPo(page?, itemsPerPage?): Observable<PaginatedResult<Po[]>> {
    const paginatedResult: PaginatedResult<Po[]> = new PaginatedResult<Po[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    return this.http.get<Po[]>(this.baseUrl + 'po', { observe: 'response', params })
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
  SeachPo(page?, itemsPerPage?, text?): Observable<PaginatedResult<Po[]>> {
    const paginatedResult: PaginatedResult<Po[]> = new PaginatedResult<Po[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
      return this.http
        .get<Po[]>(this.baseUrl + 'po/search/' + text, {
          observe: 'response',
          params,
        })
        .pipe(
          map((response) => {
            console.log(response.body);
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
  createPo(po: Po) {
    return this.http.post(this.baseUrl + 'po', po);
  }

  getAllPo() {
    return this.http.get<Po[]>(this.baseUrl + 'po/all', {});
  }
  updatePo(po: Po) {
    return this.http.put(this.baseUrl + 'po', po);
  }

  deletePo(id: number) {
    return this.http.delete(this.baseUrl + 'po/' + id, {});
  }

  changePo(po: Po) {
    this.poSource.next(po);
  }

  changeFlag(flag: string) {
    this.flagsource.next(flag);
  }
}
