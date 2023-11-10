import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  uAdminVersion: string = '5'; // Set your version here
  username: string = '';
  password: string = '';
  constructor(private router:Router,private appService:AppService,private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  

  onSubmit() {
      // Implement the submit logic here, e.g., calling a login service
      console.log('Username:', this.username);
      console.log('Password:', this.password);
      this.appService.login(this.username,this.password)
  .subscribe(response => {
    console.log(response)
   if(response.success){
    sessionStorage.setItem('id',response.user._id);
    this.router.navigate(['/home']);
   

   }else{
    alert(response.error_message)
   }
  }
  );
      // Call your authentication service here
    //this.router.navigate(['/home'])
  }

}
