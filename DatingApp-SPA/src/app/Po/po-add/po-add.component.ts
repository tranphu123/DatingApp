import { Component, OnInit } from '@angular/core';
import { PoService } from 'src/app/_core/_services/po.service';
import { AlertifyService } from 'src/app/_core/_services/alertify.service';
import { AuthService } from 'src/app/_core/_services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-po-add',
  templateUrl: './po-add.component.html',
  styleUrls: ['./po-add.component.css']
})
export class PoAddComponent implements OnInit {
  po: any ={};
  flag='0';
  constructor( private poService: PoService,
    private alertify: AlertifyService,
   private authService: AuthService,
   private router: Router) { }

  ngOnInit(
   ) {
    this.poService.currentPo.subscribe(po => this.po = po);
    this.poService.currentflag.subscribe(flag => this.flag = flag);
    console.log(this.po);
   }

   backList(){
    this.router.navigate(['/po']);
  }
  saveAndNext(){
    console.log(this.po);
    if(this.flag== '0') {

      this.poService.createPo(this.po).subscribe(
        () =>{
      this.alertify.success('Add succed');
      this.po ={};
        },error => {
          this.alertify.error(error);
        }
        );
    }
    else
    {
      this.poService.updatePo(this.po).subscribe(
        () =>{
          this.alertify.success('Update succed');
          this.router.navigate(['/po']);
        },error =>{
          this.alertify.error(error);
        }
      );
    }
  }
  save(){
    console.log(this.po);
    if(this.flag== '0') {
      this.poService.createPo(this.po).subscribe(
        () =>{
      this.alertify.success('Add succed');
      this.router.navigate(['/po'])
        },error => {
          this.alertify.error(error);
        }
        );
    }
    else
    {
      this.poService.updatePo(this.po).subscribe(
        () =>{
          this.alertify.success('Update succed');
          this.router.navigate(['/po']);
        },error =>{
          this.alertify.error(error);
        }
      );
    }
  }
  cancel(){
    this.po ={};
  }
}
