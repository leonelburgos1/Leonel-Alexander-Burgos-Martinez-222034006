import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PrimeIcons } from 'primeng/api';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,CardModule,InputTextModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  loginform: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService){
    this.loginform = this.fb.group({
    
      Email:['',[Validators.required, Validators.email]],
      User_Last_Name:['',Validators.required]
  
    })
  }
}
