import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login-test',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, ButtonModule, PasswordModule, CommonModule, HttpClientModule], //Modulos requeridos para el trabajo con formularios // importo el HttpClientModule
  templateUrl: './login-test.component.html',
  styleUrl: './login-test.component.css'
})
export class LoginTestComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder ,private loginService: LoginService){ // el LoginService es el servicio que se creo en donde esta definido el metodo login
    this.userForm = this.fb.group({ 

      name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],


    });


  }

  onSubmit(){
    if(this.userForm.valid){
      const {email,password}= this.userForm.value;
      // el login es el que esta en el loginservice, esto quiere deir que los servicios se pueden hacer por
      // medio del constructor que se tiene definido, todo porque lo defini arriba
      this.loginService.login(email,password).subscribe(Response => {console.log("exitoso", Response)}) // aqui llama al metodo
      // login y le envia esta información recopilada
      // que se llama login y se lo utiliza para enviar el email, password, que este esta en el servicio
      console.log(this.userForm.value);
    }else{
      console.log('Formulario invalido');
    }
  }

}


//Server=localhost;Database=dbtest2;User Id=sa,Password=12345678;TrustServerCertificate=true;