import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {CrearReservacionComponent} from "./crear-reservacion/crear-reservacion.component";
import {VerReservacionComponent} from "./ver-reservacion/ver-reservacion.component";
import {LoginComponent} from "./login/login.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {AdministradorComponent} from "./administrador/administrador.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  {path: '', redirectTo: 'Clientes/Home', pathMatch: 'full'},
  //{path: 'Clientes', component: ClientesComponent},
  {path: 'Clientes/Home', component: HomeComponent},
  {path: 'Clientes/Reservaciones', component: CrearReservacionComponent},
  {path: 'Clientes/Reservaciones/Ver', component: VerReservacionComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Administrador', component: AdministradorComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
