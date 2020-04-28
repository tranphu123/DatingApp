import { Component, OnInit } from '@angular/core';
import { Report } from '../../_core/_Models/report';
import { ReportSearch } from '../../_core/_Models/reportSearch';
import { Pagination, PaginatedResult } from '../../_core/_Models/Pagination';
import { ReportService } from '../../_core/_services/report.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from '../../_core/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  reports: Report[];
  report: any;
  po_No: string = '';
  searchKey = false;
  pagination: Pagination;
  constructor(
    private reportService: ReportService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.reportService.currentReport.subscribe(report => this.report = report);
    this.route.data.subscribe((data) => {
      this.reports = data['report'].result;
      this.pagination = data['report'].pagination;
    });
    console.log(this.reports);
    this.spinner.hide();
  }
  pageChanged(event: any): void {
    this.spinner.show();
    this.pagination.currentPage = event.page;
    this.loadReport();

  }
  loadReport() {
    if (this.searchKey === false && this.po_No == '') {
      this.reportService
        .GetallReport(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe(
          (res: PaginatedResult<Report[]>) => {
            this.reports = res.result;
            this.pagination = res.pagination;
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      let object = {
        po_No: this.po_No,
      };
      this.reportService.search(  this.pagination.currentPage,  this.pagination.itemsPerPage, object)
        .subscribe(
          (res: PaginatedResult<Report[]>) => {
            this.reports = res.result;
            this.pagination = res.pagination;
            console.log(this.reports);
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    }
  }
  search() {
    this.spinner.show();
    if (this.po_No != '') {
      let object = {
        po_No: this.po_No,
      };
      this.reportService
        .search(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          object
        )
        .subscribe(
          (res: PaginatedResult<Report[]>) => {
            this.reports = res.result;
            this.pagination = res.pagination;
            this.spinner.hide();
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      this.searchKey = false;
      this.loadReport();
      this.spinner.hide();
    }
  }
  reset() {
    this.spinner.show();
    this.po_No = '';
    this.loadReport();
  }
  exportExcel(){
    if(this.searchKey === false && this.po_No =='')
    {
      this.reportService.GetAllExcel();
    }
    else
    {
      let object = {
        po_No: this.po_No,
      };
      this.reportService.GetSearchExcel(object);
    }
  }
}
