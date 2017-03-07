import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CrearReservacionComponent } from './crear-reservacion/crear-reservacion.component';
import { VerReservacionComponent } from './ver-reservacion/ver-reservacion.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { LoginComponent } from './login/login.component';
import {routing} from "./app.routes";
import {MasterURLService} from "./services/master-url.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CrearReservacionComponent,
    VerReservacionComponent,
    ClientesComponent,
    AdministradorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DataTablesModule,
    routing
  ],
  providers: [
    MasterURLService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
