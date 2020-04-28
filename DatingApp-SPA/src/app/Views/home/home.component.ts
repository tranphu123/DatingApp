import { Component, OnInit } from '@angular/core';
declare let alertify: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMore =false;
  constructor() { }

  ngOnInit() {
  }
  registerToggle(){
    this.registerMore =true;
  }
  cancelRegisterMode(registerMore:boolean){
    this.registerMore=registerMore;
  }

  confirm(message: string, okCallback: () => any) {
    alertify
      .confirm(message, function (e) {
        if (e) {
          okCallback();
        } else {
        }
      })
      .setHeader('DELETE');
  }

  testAlert() {
    alertify.success("ahiiiiii");

  }

}
