import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUserComponent } from "./components/form-user/form-user.component";
import { FormManagerComponent } from './components/form-manager/form-manager.component';
import { FormLicenseComponent } from './components/form-license/form-license.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormUserComponent, FormManagerComponent, FormLicenseComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'PracticaCpt_Leonel_Burgos';
  loading: boolean = false;

  @ViewChild(FormUserComponent) formUserComponent!: FormUserComponent;
  @ViewChild(FormManagerComponent) formManagerComponent!: FormManagerComponent;
  @ViewChild(FormLicenseComponent) formLicenseComponent!: FormLicenseComponent;
  // lo anterior permite entrar a las instancias de cada componente por lo tanto cada componente anterior 
  // estara disponible en el componente padre en este caso app.component.ts

  mainForm: FormGroup = new FormGroup({
    userForm: new FormGroup({}),
    managerForm: new FormGroup({}),
    licenseForm: new FormGroup({})
  });

  ngAfterViewInit() {
    if (this.formUserComponent && this.formUserComponent.userform) {
      this.mainForm.setControl('userForm', this.formUserComponent.userform);
    }
    if (this.formManagerComponent && this.formManagerComponent.managerform) {
      this.mainForm.setControl('managerForm', this.formManagerComponent.managerform);
    }
    if (this.formLicenseComponent && this.formLicenseComponent.licenseform) {
      this.mainForm.setControl('licenseForm', this.formLicenseComponent.licenseform);
    }
  }

  load() {
    this.loading = true;

    if (this.mainForm.valid) {
      console.log("Formulario enviado y valido:", this.mainForm.value);
    } else {
      console.log("Formulario no válido, verificar información a enviar");
    }

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  // Métodos para manejar los datos de cada formulario
  UserData(data: any) {
    console.log("Datos del usuario:", data);
  }

  ManagerData(data: any) {
    console.log("Datos del manager:", data);
  }

  LicenseData(data: any) {
    console.log("Datos de la licencia:", data);
  }
}

