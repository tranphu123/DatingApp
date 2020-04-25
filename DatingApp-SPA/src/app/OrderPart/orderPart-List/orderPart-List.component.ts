import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from 'src/app/_core/_Models/Pagination';
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from 'src/app/_core/_services/alertify.service';
import { OrderPartService } from 'src/app/_core/_services/orderPart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderPart } from 'src/app/_core/_Models/OrderPart';

@Component({
  selector: 'app-orderPart-List',
  templateUrl: './orderPart-List.component.html',
  styleUrls: ['./orderPart-List.component.scss'],
})
export class OrderPartListComponent implements OnInit {
  orderParts: OrderPart[];
  orderPart: any;
  pagination: Pagination;
  text: string = '';
  searchKey = false;
  constructor(
    private orderpartService: OrderPartService,
    private http: HttpClient,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.orderpartService.currentOrderPart.subscribe(
      (orderPart) => (this.orderPart = orderPart)
    );
    this.route.data.subscribe((data) => {
      this.spinner.hide();
      this.orderParts = data['orderPart'].result;
      this.pagination = data['orderPart'].pagination;
    });
    console.log(this.orderParts);
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadsOrderPart();
  }
  loadsOrderPart() {
    if (this.searchKey === false && (this.text == '' || this.text === null)) {
      this.orderpartService
        .GetOrderPart(this.pagination.currentPage, this.pagination.itemsPerPage)
        .subscribe(
          (res: PaginatedResult<OrderPart[]>) => {
            this.orderParts = res.result;
            this.pagination = res.pagination;
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      this.orderpartService
        .SeachOrderPart(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.text
        )
        .subscribe(
          (res: PaginatedResult<OrderPart[]>) => {
            this.orderParts = res.result;
            this.pagination = res.pagination;
            console.log('Search: ', this.orderParts);
          },
          (error) => {
            console.log(error);
            this.alertify.error(error);
          }
        );
    }
  }
  changeToEdit(orderPart: OrderPart) {
    this.orderpartService.changeOrderPart(orderPart);
    this.orderpartService.changeFlag('1');
    this.router.navigate(['/orderPart/add']);
  }
  deletePo(orderPart: OrderPart) {
    this.alertify.confirm(
      'Delete Po',
      'Are you sure you want to delete this ID "' + orderPart.id + '" ?',
      () => {
        this.orderpartService.deleteOrderPart(orderPart.id).subscribe(
          () => {
            this.loadsOrderPart();
            this.alertify.success('Po has been deleted');
          },
          (error) => {
            this.alertify.error('Failed to delete the Po');
          }
        );
      }
    );
  }
  addOrderPart() {
    this.orderPart = {};
    this.orderpartService.changeOrderPart(this.orderPart);
    this.orderpartService.changeFlag('0');
    this.router.navigate(['/orderPart/add']);
  }
  searchOrderPart() {
    debugger;
    if (this.text != '') {
      this.orderpartService
        .SeachOrderPart(
          this.pagination.currentPage,
          this.pagination.itemsPerPage,
          this.text
        )
        .subscribe(
          (res: PaginatedResult<OrderPart[]>) => {
            this.orderParts = res.result;
            this.pagination = res.pagination;
          },
          (error) => {
            this.alertify.error(error);
          }
        );
    } else {
      this.searchKey = false;
      this.loadsOrderPart();
    }
  }
}
