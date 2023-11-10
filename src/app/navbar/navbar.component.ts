import { Component, OnInit } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { faCog,faUser,faFlag  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  faFlag=faFlag;
  faCoffee = faSignOutAlt;
  faCog=faCog;
  faUser=faUser;
  title = 'adminP';
  user:any;
  isDropdownOpen: Boolean = false;
  constructor(private router:Router,private appService:AppService) { }

  ngOnInit(): void {
    this.getUser();
  }


  getUser(){
    const id = sessionStorage.getItem('id');
    this.appService.getAdminById(id)
    .subscribe(response => {
 

     this.user=response;
    }
    );
  }

  logout(){
    sessionStorage.removeItem('id');
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
