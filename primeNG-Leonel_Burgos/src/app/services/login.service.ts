import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl= "https://localhost:7078/api/Users"; // esta es la url base.
  //lo anterior es un enpoint osea un punto de acceso.

  // Observable es un objeto que representa un flujo de datos que se pueden manejar 
  // de forma asíncrona. Los Observables son parte de la biblioteca RxJS (Reactive Extensions for JavaScript) 
  // y se utilizan principalmente para manejar eventos o flujos de datos que pueden ocurrir en el futuro, 
  // como respuestas de peticiones HTTP, eventos del usuario - se controla con HttpClientModule

  constructor(private http:HttpClient) { }
  // la variable que definio como http de httpClient va a servir para luego acceder a los diferentes metodos como
  //post, put, delete, get .

  login(username: string, password: string): Observable<any>{ //tipo de dato Observable, observable es un arreglo que va a recibir los datos (username y password)
    const body={username,password}
    return this.http.post(`${this.apiUrl}/login`,{username,password})
// esto es un metodo que recibe parametros y retorna un mapeo de la ruta que se le brindo mas /login 
// para ver si existe el /login y como /login va a estar esperando el username, password se los va a entregar
  }

// nombrar los metodos con nombres que los identifique de forma correcta.

  register(username: string, password: string): Observable<any>{ //tipo de dato Observable, observable es un arreglo que va a recibir los datos (username y password)
    const body={username,password}
    return this.http.post(`${this.apiUrl}/register`,{username,password})

  }
//aqui no se procesa ninguna información lo unico que hacce el front es enviar los datos para que sean procesados en el backend.

 //puedo crear un solo servicio con 4 metodos.
 //lo anterior es arquitectura de microservicios ahi es donde cada servicio tiene 1 sola responsabilidad
 //en este caso este servicio va tener 2 responsabilidades la de login and register
 // son varias responsabilidades pero que tegan similitudes entre ellas.
}
