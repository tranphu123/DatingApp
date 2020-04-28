import { Component, OnInit } from '@angular/core';
import { locationService } from 'src/app/_core/_services/Location.service';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { AuthService } from 'src/app/_core/_services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {
 location: any ={};
 flag='0';

  constructor(private locationService: locationService,
              private alertify: AlertifyService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.locationService.currentLocation.subscribe(location => this.location = location);
    this.locationService.currentflag.subscribe(flag => this.flag = flag);
  }
  backList(){
    this.router.navigate(['/location']);
  }
  saveAndNext(){
    console.log(this.location);
    if(this.flag== '0') {

      this.locationService.createLocation(this.location).subscribe(
        () =>{
      this.alertify.success('Add succed');
      this.location ={};
        },error => {
          this.alertify.error(error);
        }
        );
    }
    else
    {
      this.locationService.updateLocation(this.location).subscribe(
        () =>{
          this.alertify.success('Update succed');
          this.router.navigate(['/location']);
        },error =>{
          this.alertify.error(error);
        }
      );
    }
  }
  save(){
    console.log(this.location);
    if(this.flag== '0') {
      this.locationService.createLocation(this.location).subscribe(
        () =>{
      this.alertify.success('Add succed');
      this.router.navigate(['/location'])
        },error => {
          this.alertify.error(error);
        }
        );
    }
    else
    {
      this.locationService.updateLocation(this.location).subscribe(
        () =>{
          this.alertify.success('Update succed');
          this.router.navigate(['/location']);
        },error =>{
          this.alertify.error(error);
        }
      );
    }
  }
  cancel(){
    this.location ={};
  }
}
