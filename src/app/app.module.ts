import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import { FormsModule } from '@angular/forms';
import { OpanelComponent } from './opanel/opanel.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ToastModule } from 'primeng/toast';
import { ManageContriesComponent } from './manage-contries/manage-contries.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentDialogComponent,
    OpanelComponent,
    LoginComponent,
    NavbarComponent,
    ManageUsersComponent,
    ManageContriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added

    FormsModule,
    HttpClientModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
