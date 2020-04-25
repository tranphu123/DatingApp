import { Component, OnInit } from '@angular/core';
import { OrderPartService } from 'src/app/_core/_services/orderPart.service';
import { AlertifyService } from 'src/app/_core/_services/alertify.service';
import { AuthService } from 'src/app/_core/_services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderPart-add',
  templateUrl: './orderPart-add.component.html',
  styleUrls: ['./orderPart-add.component.scss']
})
export class OrderPartAddComponent implements OnInit {
  orderPart: any = {};
  flag = '0';
  constructor(
    private orderService: OrderPartService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.orderService.currentOrderPart.subscribe((orderPart) => (this.orderPart = orderPart));
    this.orderService.currentflag.subscribe((flag) => (this.flag = flag));
    console.log(this.orderPart);
  }
  backList() {
    this.router.navigate(['/orderPart']);
  }
  saveAndNext() {
    console.log(this.orderPart);
    if (this.flag == '0') {
      this.orderService.createOrderPart(this.orderPart).subscribe(
        () => {
          this.alertify.success('Add succed');
          this.orderPart = {};
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    } else {
      this.orderService.updateOrderPart(this.orderPart).subscribe(
        () => {
          this.alertify.success('Update succed');
          this.router.navigate(['/orderPart']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }
  save() {
    console.log(this.orderPart);
    if (this.flag == '0') {
      this.orderService.createOrderPart(this.orderPart).subscribe(
        () => {
          this.alertify.success('Add succed');
          this.router.navigate(['/orderPart']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    } else {
      this.orderService.updateOrderPart(this.orderPart).subscribe(
        () => {
          this.alertify.success('Update succed');
          this.router.navigate(['/orderPart']);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
    }
  }
  cancel() {
    this.orderPart = {};
  }

}
