import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-form-license',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule, CalendarModule],
  templateUrl: './form-license.component.html',
  styleUrls: ['./form-license.component.css']
})
export class FormLicenseComponent {
  licenseform: FormGroup;

  constructor(private fb: FormBuilder) {
    this.licenseform = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFinalizacion: [null],
      textoDeNotas: ['', Validators.required]
    });
  }
}
