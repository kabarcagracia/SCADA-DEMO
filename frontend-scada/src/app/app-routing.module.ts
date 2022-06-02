import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateDeviceComponent } from './dashboard/childrens/dispositivos/childrens/create-device/create-device.component';
import { DispositivosComponent } from './dashboard/childrens/dispositivos/dispositivos.component';
import { GpsComponent } from './dashboard/childrens/gps/gps.component';
import { InicioComponent } from './dashboard/childrens/inicio/inicio.component';
import { CreateMachineComponent } from './dashboard/childrens/maquinas/childrens/create-machine/create-machine.component';
import { EditMachineComponent } from './dashboard/childrens/maquinas/childrens/edit-machine/edit-machine.component';
import { MaquinasComponent } from './dashboard/childrens/maquinas/maquinas.component';
import { CreateSensorComponent } from './dashboard/childrens/sensores/childrens/create-sensor/create-sensor.component';
import { SensoresComponent } from './dashboard/childrens/sensores/sensores.component';
import { CreateUserComponent } from './dashboard/childrens/usuarios/childrens/create-user/create-user.component';
import { EditUserComponent } from './dashboard/childrens/usuarios/childrens/edit-user/edit-user.component';
import { UsuariosComponent } from './dashboard/childrens/usuarios/usuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path:'', pathMatch: 'full', redirectTo: 'login' },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'inicio'},
    { path: 'inicio', component: InicioComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'crearUsuario', component: CreateUserComponent },
    { path: 'editarUsuario/:usuarioId', component: EditUserComponent },
    { path: 'maquinas', component: MaquinasComponent },
    { path: 'crearMaquina', component: CreateMachineComponent },
    { path: 'editarMaquina', component: EditMachineComponent },
    { path: 'dispositivos/:maquinaId', component: DispositivosComponent },
    { path: 'crearDispositivo/:maquinaId', component: CreateDeviceComponent},
    { path: 'sensores/:dispositivoId/:maquinaId', component: SensoresComponent },
    { path: 'gps/:maquinaId', component: GpsComponent },
    { path: 'crearSensor/:dispositivoId/:maquinaId', component: CreateSensorComponent }
  ]},
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
