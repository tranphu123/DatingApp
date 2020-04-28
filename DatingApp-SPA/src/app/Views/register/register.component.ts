import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { AuthService } from '../../_core/_services/Auth.service';
import { AlertifyService } from '../../_core/_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 model: any ={};
    @Output() cancelRegister  =new EventEmitter();
  constructor( private AuthSevice: AuthService,
                private alertify: AlertifyService) { }

  ngOnInit() {
  }
  Register(){
    return this.AuthSevice.register(this.model).subscribe(() =>{
        this.cancelRegister.emit(false);
        this.alertify.success("Register success");
    },error =>{
      console.log(error);
      this.alertify.error("Register failed");

    } );
  }
  Cancel(){

    this.cancelRegister.emit(false);
    console.log("cancelled");
  }
}
