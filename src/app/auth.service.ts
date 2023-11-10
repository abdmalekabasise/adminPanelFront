import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

 

  getToken(): string {
   const id = sessionStorage.getItem('id')
    if(id){
      this.token=id
    }

    
    return this.token;
  }
}