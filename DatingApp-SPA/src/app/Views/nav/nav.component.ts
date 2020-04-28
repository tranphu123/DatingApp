import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_core/_services/Auth.service';
import { AlertifyService } from '../../_core/_services/alertify.service';
// import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  model: any = {};
  constructor(
    public authServices: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}
  login() {
    this.authServices.login(this.model).subscribe(
      (next) => {
        this.alertify.success('login success');
      },
      (error) => {
        this.alertify.error('Failed to login');
      },
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
  loggedIn() {
    return this.authServices.loggedin();
  }
  logout() {
    this.alertify.success('logout success');
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }
}
