import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl= "https://localhost:7078/api/Usuario"; 


  constructor(private http:HttpClient) { }

  login(Email: string, User_Last_Name: string): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,{Email,User_Last_Name})
  }

  register(
      UserName: string,
      Email: string,
      User_Last_Name: string,
      User_phone: string,
      Manager_Name: string,
      Manager_Email: string,
      Fecha_inicio: string,
      Fecha_Final: string,
      Notas: string,
    ): Observable<any>{ 
    return this.http.post(`${this.apiUrl}/Register`,
          { UserName,
            Email,
            User_Last_Name,
            User_phone,
            Manager_Name,
            Manager_Email,
            Fecha_inicio,
            Fecha_Final,
            Notas
            })
  }

}