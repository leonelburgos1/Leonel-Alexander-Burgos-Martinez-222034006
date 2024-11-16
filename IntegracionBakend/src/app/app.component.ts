import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormUserComponent } from "./components/form-user/form-user.component";
import { FormManagerComponent } from './components/form-manager/form-manager.component';
import { FormLicenseComponent } from './components/form-license/form-license.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ButtonModule } from 'primeng/button';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormUserComponent, FormManagerComponent, FormLicenseComponent, ButtonModule, FormLoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'IntegracionBackend';
  loading: boolean = false;

  @ViewChild(FormUserComponent) formUserComponent!: FormUserComponent;
  @ViewChild(FormManagerComponent) formManagerComponent!: FormManagerComponent;
  @ViewChild(FormLicenseComponent) formLicenseComponent!: FormLicenseComponent;
  @ViewChild(FormLoginComponent) formloginComponent!: FormLoginComponent;
  // lo anterior permite entrar a las instancias de cada componente por lo tanto cada componente anterior 
  // estara disponible en el componente padre en este caso app.component.ts

  constructor (private UserService: UserService) {}

  onSubmit(){
    if(this.formLicenseComponent.licenseform.valid && this.formManagerComponent.managerform.valid && this.formUserComponent.userform.valid)
      {
        const formUserData = this.formUserComponent.userform.value;
        const formManagerData = this.formManagerComponent.managerform.value;
        const formLicenseData = this.formLicenseComponent.licenseform.value;

        this.UserService.register(
          formUserData.firstName,
          formUserData.email,
          formUserData.lastName,
          formUserData.phone,
          formManagerData.firstName,
          formManagerData.email,
          formLicenseData.fechaInicio,
          formLicenseData.fechaFinalizacion,
          formLicenseData.textoDeNotas
        ).subscribe(
          response => {
            console.log('Registro exitoso', response);
          },
        );
    }else {
        console.log('Formulario inválido');
      }
  };

  onSubmitLogin(){
    if(this.formloginComponent.loginform.valid)
      {
        const formlogindate = this.formloginComponent.loginform.value

        this.UserService.login(
          formlogindate.Email,
          formlogindate.User_Last_Name
        ).subscribe(
          response => {
            console.log('Ingreso Exitoso', response);
          },
        );
      }else {
        console.log('Ingreso Invalido');
    }
  }

}

