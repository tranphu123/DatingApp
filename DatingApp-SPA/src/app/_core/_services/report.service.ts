import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as ExcelJS from 'exceljs/dist/exceljs';
import * as fs from 'file-saver';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReportSearch } from '../_Models/reportSearch';
import { Report } from '../_Models/report';
import { PaginatedResult } from '../_Models/Pagination';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl = environment.apiUrl;
  reportSouce = new BehaviorSubject<object>({});
  currentReport = this.reportSouce.asObservable();
  flagsouce = new BehaviorSubject<string>('0');
  currentflag = this.flagsouce.asObservable();
  allReport: Report[] = [];
  searchReport: Report[] = [];
  constructor(private http: HttpClient) {}
  search(
    page?,
    itemsPerPage?,
    reportSearch?: ReportSearch
  ): Observable<PaginatedResult<Report[]>> {
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
  GetallReport(page?, itemsPerPage?): Observable<PaginatedResult<Report[]>> {
    const paginatedResult: PaginatedResult<Report[]> = new PaginatedResult< Report[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http
      .get<Report[]>(this.baseUrl + 'report/all', {
        observe: 'response',
        params,
      })
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
 async GetAllExcel() {
    return this.http
      .get<Report[]>(this.baseUrl + 'report/excel')
      .subscribe((res) => {
        const header = [
          'Po_No',
          'Model_No',
          'model_Name_Part',
          'Article',
          'Order',
          'Qty',
          'CFD',
          'Cutting_Day',
          'Building',
        ];
        this.allReport = res;
        // this.allReport.map(item => {
        //   delete item.model_Name_PO;
        // });
        let arr = [];
        this.allReport.forEach((item) => {
          let itemConvert = [];
          itemConvert[0] = item.po_No;
          itemConvert[1] = item.model_No;
          itemConvert[2] = item.model_Name_Part;
          itemConvert[3] = item.part_No;
          itemConvert[4] = item.article;
          itemConvert[5] = item.order;
          itemConvert[6] = item.qty;
          itemConvert[7] = item.cfd;
          itemConvert[8] = item.cutting_Day;
          itemConvert[9] = item.building;
          arr.push(itemConvert);
        });
        const workbook = new ExcelJS.workbook();
        const worksheet = workbook.addWorksheet('Report');
        const headerRow = worksheet.addRow(header);
        headerRow.font = {
          size: 12,
        };
        headerRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '33ff33' },
            bgColor: { argb: '33ff33' },
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
        // Add Data and Conditional Formatting
        arr.forEach((d) => {
          const row = worksheet.addRow(d);
        });
        workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'ME.xlsx');
          });
      });
  }
 async GetSearchExcel(reportSearch?: ReportSearch){
    let url = this.baseUrl + 'report/searchExcel';
    return this.http
      .post<any>(url, reportSearch, { observe: 'response'})
      .subscribe((res) => {
        const header = [
          'Po_No',
          'Model_No',
          'model_Name_Part',
          'part_No',
          'Article',
          'Order',
          'Qty',
          'CFD',
          'Cutting_Day',
          'Building',
        ];
        this.searchReport = res.body;
        //delete item in report
        // this.allReport.map(item => {
        //   delete item.model_Name_PO;
        // });
        let arr = [];
        this.searchReport.forEach((item) => {
          let itemConvert = [];
          itemConvert[0] = item.po_No;
          itemConvert[1] = item.model_No;
          itemConvert[2] = item.model_Name_Part;
          itemConvert[3] = item.part_No;
          itemConvert[4] = item.article;
          itemConvert[5] = item.order;
          itemConvert[6] = item.qty;
          itemConvert[7] = item.cfd;
          itemConvert[8] = item.cutting_Day;
          itemConvert[9] = item.building;
          arr.push(itemConvert);
        });
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Report');
        const headerRow = worksheet.addRow(header);
        headerRow.font = {
          size: 12,
        };
        headerRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '33ff33' },
            bgColor: { argb: '33ff33' },
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
        // Add Data and Conditional Formatting
        arr.forEach((d) => {
          const row = worksheet.addRow(d);
        });
        //setting width
        worksheet.getColumn(1).width =20;
        worksheet.getColumn(3).width =20;
        workbook.xlsx.writeBuffer().then((data: any) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          fs.saveAs(blob, 'Report.xlsx');
          });
      });
  }
}
