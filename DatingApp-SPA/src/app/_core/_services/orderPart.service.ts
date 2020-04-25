import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult } from '../_Models/Pagination';
import { OrderPart } from '../_Models/OrderPart';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderPartService {
  baseUrl = environment.apiUrl;
  orderPartSource = new BehaviorSubject<object>({});
  currentOrderPart =this.orderPartSource.asObservable();
  flagsource = new BehaviorSubject<string>('0');
  currentflag =this.flagsource.asObservable();
  constructor(private http:HttpClient) {}
  GetOrderPart(page?, itemsPerPage?): Observable<PaginatedResult<OrderPart[]>>
  {
    const paginatedResult: PaginatedResult<OrderPart[]> = new PaginatedResult<OrderPart[]>();
    let params =new HttpParams();
    if(page!=null && itemsPerPage != null)
    {
      params =params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
    }

    return this.http.get<OrderPart[]>(this.baseUrl + 'orderPart',{observe: 'response',params})
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
  SeachOrderPart(page?,itemsPerPage?,text?): Observable<PaginatedResult<OrderPart[]>>
  {
    const paginatedResult: PaginatedResult<OrderPart[]> = new PaginatedResult<OrderPart[]>();
    let params =new HttpParams();
    if(page!=null && itemsPerPage != null)
    {
      params =params.append('pageNumber',page);
      params = params.append('pageSize',itemsPerPage);
      return this.http.get<OrderPart[]>(this.baseUrl + 'orderPart/search/'+ text,{observe: 'response',params})
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
  createOrderPart(orderPart: OrderPart) {
    return this.http.post(this.baseUrl +  'orderPart', orderPart);
  }

  getAllOrderPart() {
    return this.http.get<OrderPart[]>(this.baseUrl + 'orderPart/all', {});
  }
  updateOrderPart(orderPart: OrderPart) {
    return this.http.put(this.baseUrl + 'orderPart', orderPart);
  }

  deleteOrderPart(id: number) {
    return this.http.delete(this.baseUrl + 'orderPart/' + id, {});
  }

  changeOrderPart(orderPart: OrderPart) {
    this.orderPartSource.next(orderPart);
  }

  changeFlag(flag: string) {
    this.flagsource.next(flag);
  }
}
