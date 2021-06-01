import { Component, OnInit } from '@angular/core';
import { Po } from 'src/app/_core/_Models/Po';
import { Pagination, PaginatedResult } from 'src/app/_core/_Models/Pagination';
import { PoService } from 'src/app/_core/_services/po.service';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/_core/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SignalRService } from 'src/app/_core/_services/SignalR.service';

@Component({
  selector: 'app-po-list',
  templateUrl: './po-list.component.html',
  styleUrls: ['./po-list.component.scss'],
})
export class PoListComponent implements OnInit {
  pos: Po[];
  po: any;
  pagination: Pagination;
  text: string = '';
  searchKey = false;
  constructor(
    private poservice: PoService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private _signalR: SignalRService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.poservice.currentPo.subscribe((po) => (this.po = po));
    this.route.data.subscribe((data) => {
      this.spinner.hide();
      this.pos = data['po'].result;
      this.pagination = data['po'].pagination;
    });
    // this._signalR.startConnection();
    if(this._signalR.hubConnection)
    {
      this._signalR.hubConnection.on("loadPo",()=>{
        this.loadsPo();
      })
    }
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadsPo();
  }
  loadsPo() {
    if (this.searchKey === false && (this.text == '' || this.text === null)) {
      this.poservice
        .GetPo(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe(
          (res: PaginatedResult<Po[]>) => {
            this.pos = res.result;
            this.pagination = res.pagination;
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      this.poservice
        .SeachPo(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.text
        )
        .subscribe(
          (res: PaginatedResult<Po[]>) => {
            this.pos = res.result;
            this.pagination = res.pagination;
            console.log('Search: ', this.pos);
          },
          (error) => {
            console.log(error);
            this.alertify.error(error);
          }
        );
    }
  }
  changeToEdit(po: Po) {
    this.poservice.changePo(po);
    this.poservice.changeFlag('1');
    this.router.navigate(['/po/add']);
  }
  deletePo(po: Po) {
    this.alertify.confirm(
      'Delete Po',
      'Are you sure you want to delete this ID "' + po.id + '" ?',
      () => {
        this.poservice.deletePo(po.id).subscribe(
          () => {
            this.loadsPo();
            this.alertify.success('Po has been deleted');
          },
          (error) => {
            this.alertify.error('Failed to delete the Po');
          }
        );
      }
    );
  }
  addPo() {
    this.po = {};
    this.poservice.changePo(this.po);
    this.poservice.changeFlag('0');
    this.router.navigate(['/po/add']);
  }
  searchPo() {
    debugger;
    if (this.text != '') {
      this.poservice
        .SeachPo(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.text
        )
        .subscribe(
          (res: PaginatedResult<Po[]>) => {
            this.pos = res.result;
            this.pagination = res.pagination;
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      this.searchKey = false;
      this.loadsPo();
    }
  }
}
