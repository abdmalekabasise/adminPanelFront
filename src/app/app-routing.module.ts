import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OpanelComponent } from './opanel/opanel.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageContriesComponent } from './manage-contries/manage-contries.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] }, 
  { path: 'opanel/:id', component: OpanelComponent , canActivate: [AuthGuard] },
  { path: 'manage_users', component: ManageUsersComponent , canActivate: [AuthGuard] },
  { path: 'manage_contries', component: ManageContriesComponent , canActivate: [AuthGuard] },

  { path: 'login', component: LoginComponent },  
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirects base URL to home

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
