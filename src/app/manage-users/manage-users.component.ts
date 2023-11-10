import { Component, OnInit } from '@angular/core';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  providers: [MessageService]
})
export class ManageUsersComponent implements OnInit {
  faTrashAlt=faTrashAlt;
  admins:any;
  selectedAdmin:any;
  showModal: boolean = false;
  username:any;
  password:any;
  newPassword:any;
  constructor(private appService:AppService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins(){
    this.appService.getAdmins()
    .subscribe(response => {
  
     this.admins=response;
    this.selectedAdmin=this.admins[0]
    }
    );
   
  }

  selectAdmin(admin){
   
    this.selectedAdmin=this.admins[admin];
  }

  show() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
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
  this.appService.addAdmin(this.username,this.password)
  .subscribe(response => {
    this.getAdmins();
  }
  );
  
 
  this.closeModal();
}

showConfirmation(id): void {
  const result = window.confirm("Are you sure you want to proceed?");
  if (result) {
    // The user clicked OK
    // Do something here when the user confirms
    this.appService.deleteAdmin(id)
    .subscribe(response => {
      this.getAdmins();
    }
    );


  } else {
    // The user clicked Cancel
    // Handle the cancel action
    console.log("User clicked Cancel");
  }
}

updatePass(id){
  const result = window.confirm("Are you sure you want to proceed?");
  if (result) {
    // The user clicked OK
    // Do something here when the user confirms
    this.appService.updatePass(id,this.newPassword)
    .subscribe(response => {
      this.getAdmins();
    }
    );


  } else {
    // The user clicked Cancel
    // Handle the cancel action
    console.log("User clicked Cancel");
  }
}


}
