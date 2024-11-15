import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CalendarModule, DropdownModule, InputTextModule, ButtonModule, CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registroForm: FormGroup;

  //Arreglo de tipo clave valor

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
      if (this.registroForm.valid) {
        const {username,password} = this.registroForm.value;
        this.loginService.register(username, password).subscribe({
          next: Response => {
            console.log('Usuario registrado exitosamente', Response);
          },
          error: error =>{
            console.error('Error en el registro del usuario', error);
          },
          complete: () =>
          {
              console.log('Proceso de registro completado');
          }          
        })
      } 
    }
  }

