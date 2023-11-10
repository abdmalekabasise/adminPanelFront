import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-manage-contries',
  templateUrl: './manage-contries.component.html',
  styleUrls: ['./manage-contries.component.css']
})
export class ManageContriesComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  countries:any;
  showModal: boolean = false;
  Country_code:any;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(){
    this.appService.getCountries()
    .subscribe(response => {
  
     this.countries=response;
   
    }
    );
   
  }


  showConfirmation(id): void {
    const result = window.confirm("Are you sure you want to proceed?");
    if (result) {
      // The user clicked OK
      // Do something here when the user confirms
      this.appService.deleteCountry(id)
      .subscribe(response => {
        this.getCountries();
      }
      );
  
  
    } else {
      // The user clicked Cancel
      // Handle the cancel action
      console.log("User clicked Cancel");
    }
  }


  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
  }
  
  saveChanges() {
    // Handle save changes logic here
    // You might want to implement your logic to save changes made in the modal
    this.appService.addCountry(this.Country_code.toUpperCase())
    .subscribe(response => {
      this.getCountries();
    }
    );
    
   
    this.closeModal();
  }

}
