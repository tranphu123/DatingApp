import { Component, OnInit } from '@angular/core';
import { AuthService } from './_core/_services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SignalRService } from './_core/_services/SignalR.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();

  constructor(private authsevice: AuthService,
    private _signalR: SignalRService){}
  ngOnInit(){
    this._signalR.startConnection();
    const token = localStorage.getItem('token')
    if(token) {
      this.authsevice.decodedToken = this.jwtHelper.decodeToken(token);

    }


    }
}
