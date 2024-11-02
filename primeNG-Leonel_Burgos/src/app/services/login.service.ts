import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl= "https://localhost:7128/api/Users";

  constructor(private http:HttpClient) { }

  login(username: string, password: string): Observable<any>{ //tipo de dato Observable, observable es un arreglo que va a recibir los datos (username y password)
    const body={username,password}
    return this.http.post(`${this.apiUrl}/login`,{username,password})
    
  }

}
