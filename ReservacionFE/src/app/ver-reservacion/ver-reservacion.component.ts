import {Component, OnInit} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-ver-reservacion',
  templateUrl: './ver-reservacion.component.html',
  styleUrls: ['./ver-reservacion.component.css']
})
export class VerReservacionComponent implements OnInit {

  reservaciones = [];
  habitaciones = [];
  parametros = {};
  editarReserva = {};
  formularioRes = {
    editarCerrado: true
  };

  constructor(private _http: Http, private _masterURL: MasterURLService) {
  }

  ngOnInit() {
  }

  buscarReservaciones(formularioBusq: NgForm) {
    this._http
      .get(this._masterURL.url + 'Clientes')
      .subscribe(
        res => {
          let clienteTemp = res.json().filter(value => value.cedula == formularioBusq.value.cedula);
          if (clienteTemp.length != 0) {
            this._http
              .get(this._masterURL.url + 'Reservaciones/' + clienteTemp[0].idReservacion.id)
              .subscribe(
                res => {
                  let reservasTemp = res.json();
                  console.log(reservasTemp);
                  if (reservasTemp.length != 0) {
                    this.reservaciones = this.reservaciones.concat(reservasTemp);
                    for (let i=0; i<this.reservaciones.length; i++) {
                      this._http
                        .get(this._masterURL.url + 'Habitaciones/' + this.reservaciones[i].idHabitacion.id)
                        .subscribe(
                          res => {
                            let habitacionTemp = res.json();
                            if (habitacionTemp.length != 0) {
                              this.habitaciones = this.habitaciones.concat(habitacionTemp);
                            }
                          },
                          err => {
                            console.log('Error')
                          }
                        )
                    }
                  }
                },
                err => {
                  console.log('Error')
                }
              )
          }
          console.log('Bien GET Busqueda');
        },
        err => {
          console.log('Error GET: ', err);
        }
      )
  }

  editarReservacion(reserva: any) {
    let parametros = {
      fechaIngreso: reserva.fechaIngreso,
      fechaSalida: reserva.fechaIngreso,
      num_tarjeta: reserva.num_tarjeta
    };

    this._http
      .put(this._masterURL.url + 'Reservaciones/' + reserva.id, parametros)
      .subscribe(
        res => {
          console.log('Respuesta: ', res.json());
          this.formularioRes.editarCerrado = true;
        },
        err => {
          console.log('Error: ', err)
        }
      )
  }

  borrarReservacion(id) {
    let parametros = {
      id: id
    };
    this._http
      .delete(this._masterURL.url + "Reservaciones/" + parametros.id)
      .subscribe(
        res => {
          let reservacionBorrada = res.json();
          this.reservaciones = this.reservaciones.filter(value => reservacionBorrada.id != value.id)
        },
        err => {
          console.log(err)
        }
      )
  }
}
