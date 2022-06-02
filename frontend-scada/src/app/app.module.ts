import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//PIPES
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DataTablesModule } from "angular-datatables";
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InicioComponent } from './dashboard/childrens/inicio/inicio.component';
import { UsuariosComponent } from './dashboard/childrens/usuarios/usuarios.component';
import { CreateUserComponent } from './dashboard/childrens/usuarios/childrens/create-user/create-user.component';
import { EditUserComponent } from './dashboard/childrens/usuarios/childrens/edit-user/edit-user.component';
import { MaquinasComponent } from './dashboard/childrens/maquinas/maquinas.component';
import { DispositivosComponent } from './dashboard/childrens/dispositivos/dispositivos.component';
import { SensoresComponent } from './dashboard/childrens/sensores/sensores.component';
import { SparklinesComponent } from './charts/sparklines/sparklines.component';
import { OneLineChartComponent } from './charts/one-line-chart/one-line-chart.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { CreateMachineComponent } from './dashboard/childrens/maquinas/childrens/create-machine/create-machine.component';
import { EditMachineComponent } from './dashboard/childrens/maquinas/childrens/edit-machine/edit-machine.component';
import { CreateDeviceComponent } from './dashboard/childrens/dispositivos/childrens/create-device/create-device.component';
import { GaugeSparklineComponent } from './charts/gauge-sparkline/gauge-sparkline.component';
import { WebsocketService } from './services/websocket/websocket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CardSparklineComponent } from './charts/card-sparkline/card-sparkline.component';
import { GeocodingComponent } from './maps/geocoding/geocoding.component';
import { CreateSensorComponent } from './dashboard/childrens/sensores/childrens/create-sensor/create-sensor.component';
import { CardDigitalOutputComponent } from './dashboard/childrens/sensores/childrens/cards/card-digital-output/card-digital-output.component';
import { CardDigitalInputComponent } from './dashboard/childrens/sensores/childrens/cards/card-digital-input/card-digital-input.component';
import { GpsComponent } from './dashboard/childrens/gps/gps.component';
import { TrackPointComponent } from './maps/track-point/track-point.component';
import { TrackRouteComponent } from './maps/track-route/track-route.component';
const config: SocketIoConfig = { url: environment.serverSocket, options: {} };
registerLocaleData(localeEs);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    DashboardComponent,
    InicioComponent,
    UsuariosComponent,
    CreateUserComponent,
    EditUserComponent,
    MaquinasComponent,
    DispositivosComponent,
    SensoresComponent,
    SparklinesComponent,
    OneLineChartComponent,
    GaugeChartComponent,
    CreateMachineComponent,
    EditMachineComponent,
    CreateDeviceComponent,
    GaugeSparklineComponent,
    CardSparklineComponent,
    GeocodingComponent,
    CreateSensorComponent,
    CardDigitalOutputComponent,
    CardDigitalInputComponent,
    GpsComponent,
    TrackPointComponent,
    TrackRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    BrowserAnimationsModule, 
    DataTablesModule,
    NgApexchartsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    WebsocketService,
    { provide: LOCALE_ID, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
