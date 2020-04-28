import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Pagination, PaginatedResult } from '../../../_core/_Models/Pagination';
import {locationService} from '../../../_core/_services/Location.service';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { Location } from '../../../_core/_Models/Location';
import { Router, ActivatedRoute } from '@angular/router';
import{ NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-Location',
  templateUrl: './Locaition.component.html',
  styleUrls: ['./Locaition.component.scss']
})
export class LocaitionComponent implements OnInit {
   locations: Location[];
   location: any;
   pagination: Pagination;
   text: string ='';
   searchKey = false;
   fileExcel:File=null;
   @ViewChild('fileInput', {static: true}) fileInput;
  constructor(private locationService: locationService,
                      private http: HttpClient,
                      private alertify: AlertifyService,
                      private router: Router,
                      private route: ActivatedRoute,
                      private spinner: NgxSpinnerService) { }

  ngOnInit(
  ) {

    this.spinner.show();
    this.locationService.currentLocation.subscribe(location => this.location = location);
    this.route.data.subscribe(data => {
      this.spinner.hide();
      this.locations = data['location'].result;
      this.pagination = data['location'].pagination;
    });
    console.log(this.locations);
    }
    pageChanged(event: any): void {
      this.pagination.currentPage = event.page;
      this.loadsLocation();
    }
  loadsLocation(){
    if (this.searchKey === false && this.text =='') {
      this.locationService.GetLocation(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Location[]>) => {
        this.locations = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.locationService.SeachLocation(this.pagination.currentPage, this.pagination.itemsPerPage,this.text)
      .subscribe((res: PaginatedResult<Location[]>)  => {
        this.locations = res.result;
        this.pagination = res.pagination;
        console.log('Search: ', this.locations);
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
      }
  }
  changeToEdit(location: Location) {
    this.locationService.changeLocation(location);
    this.locationService.changeFlag('1');
    this.router.navigate(['/location/add']);
  }
  deleteLocation(location: Location) {
    this.alertify.confirm('Delete Location', 'Are you sure you want to delete this Location_ID "' + location.location_ID + '" ?', () => {
      this.locationService.deleteLocation(location.location_ID).subscribe(() => {
        this.loadsLocation();
        this.alertify.success('Location has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Location');
      });
    });
  }
  addLocation() {
    this.location = {};
    this.locationService.changeLocation(this.location);
    this.locationService.changeFlag('0');
    this.router.navigate(['/location/add']);
  }
  searchLocation(){
    if(this.text != '') {
      this.locationService.SeachLocation(this.pagination.currentPage,this.pagination.itemsPerPage,this.text)
      .subscribe((res: PaginatedResult<Location[]>)=>{
          this.locations =res.result;
          this.pagination = res.pagination;

      },error => {
        this.alertify.error(error);
      })
    }
    else
    {
      this.searchKey =false;
      this.loadsLocation();
    }
  }
  uploadFile()
  {
    if(this.fileExcel ===null)
    {
    this.alertify.error('Please select file');
    }
    const formData =new FormData();
    formData.append('files', this.fileInput.nativeElement.files[0]);
    this.locationService.importExcel(formData).subscribe(res=> {
      if(res){
        this.alertify.success('UploadFile success');
      }else {
        this.alertify.error('UploadFile Failer');
      }
    })

  }

}
