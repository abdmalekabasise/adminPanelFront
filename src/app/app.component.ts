import { Component } from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faCoffee = faSignOutAlt;
  title = 'adminP';
 
  ngOnInit(): void {
   sessionStorage.setItem('id','44444444');
   const a =  sessionStorage.getItem('id')
    console.log(a)
  }
 
}
