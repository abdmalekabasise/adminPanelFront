import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  userUrl :any;
  adminUrl:any;
  constructor(private http:HttpClient) { 
    this.userUrl = environment.backendUrl+'/api/v1/user';
    this.adminUrl = environment.backendUrl+'/api/v1/admin';

  }

  getUsers():Observable<any>{
    return this.http.get(`${this.userUrl}/users`)
  }

  getUserById(id):Observable<any>{
    return this.http.get(`${this.userUrl}/users/${id}`)
  }

  deleteUser(ids):Observable<any>{
    const httpOptions = {
     
      body: { ids }
    };
    return this.http.delete(`${this.userUrl}/delete`,httpOptions)
  }


  login(username,password):Observable<any>{
     return this.http.post(`${this.adminUrl}/login`,{username,password}
     )
   }

   getAdminById(id):Observable<any>{
    return this.http.get(`${this.adminUrl}/${id}`)
  }

  getAdmins():Observable<any>{
    return this.http.get(`${this.adminUrl}/admins/all`)
  }

  addAdmin(username,password):Observable<any>{
    return this.http.post(`${this.adminUrl}/admins/add`,{username,password}
    )
  }

  updateRedirectAdmin(id,redirect,logs):Observable<any>{
    return this.http.post(`${this.userUrl}/updateRedirectAdmin`,{id,redirect,logs}
    )
  }

  deleteAdmin(id):Observable<any>{
    return this.http.delete(`${this.adminUrl}/delete/${id}`)
  }

  updatePass(id,newPassword):Observable<any>{
    return this.http.put(`${this.adminUrl}/admins/changePassword`,{id,newPassword})
  }

  addCountry(Country_code):Observable<any>{
    return this.http.post(`${this.adminUrl}/countries/add`,{Country_code}
    )
  }

  getCountries():Observable<any>{
    return this.http.get(`${this.adminUrl}/countries/all`)
  }

  deleteCountry(id):Observable<any>{
    return this.http.delete(`${this.adminUrl}/countries/delete/${id}`)
  }

}
