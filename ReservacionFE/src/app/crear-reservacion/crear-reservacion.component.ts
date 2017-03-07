import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Http, URLSearchParams} from "@angular/http";
import {MasterURLService} from "../services/master-url.service";
import {NgForm} from "@angular/forms";
import {DataTableDirective} from 'angular-datatables';
import {Router} from "@angular/router";

@Component({
  selector: 'app-crear-reservacion',
  templateUrl: './crear-reservacion.component.html',
  styleUrls: ['./crear-reservacion.component.css']
})

export class CrearReservacionComponent implements OnInit {

  criteriosBusqueda = {
    fechaIngreso: '',
    fechaSalida: ''
  };
  nuevoCliente = {};
  editarCliente = {};
  habitacionSelect = true;
  datosIngresados = true;
  habitaciones = [];
  habitacionesFinal = [];
  reservacionFinal = {};
  clientes = [];
  contador = 0;
  arrayHabs = [];
  today: string;
  num_tarjeta: string;
  @ViewChild(DataTableDirective)
  private datatableEl: DataTableDirective;
  @ViewChild('check')
  private check: ElementRef;
  estadosTab = {
    tab1: false,
    tab2: true,
    tab3: true
  };
  estadoPanel = {
    glob: true,
    tab1: true,
    tab2: false,
    tab3: false
  };
  formulario = {
    crearCerrado: true,
    editarCerrado: true
  };

  constructor(private _http: Http, private _masterURL: MasterURLService, private _router: Router) {
  }

  ngOnInit() {
    this.colocarFechaHoy();
  }

  buscarHabitaciones(formBusqueda: NgForm) {
    let params = new URLSearchParams();
    params.set('disponible', 'Si');
    if (formBusqueda.value.roomType != 'Cualquiera') {
      params.set('tipo', formBusqueda.value.roomType);
    }

    this._http
      .get(this._masterURL.url + 'Habitaciones', {search: params})
      .subscribe(
        res => {
          let habitacionesTemp = res.json().filter(value => parseFloat(value.precio) < formBusqueda.value.maxPrice);
          console.log(habitacionesTemp);
          if (habitacionesTemp.length != 0) {
            this.habitaciones = [];
            this.habitaciones = this.habitaciones.concat(habitacionesTemp);
          }
          console.log('Bien GET Busqueda');
          //this.check.nativeElement.change();
        },
        err => {
          console.log('Error GET: ', err);
        }
      )
  }

  colocarFechaHoy() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let dd;
    let mm;
    if (day < 10) {
      dd = '0' + day.toString()
    }
    if (month < 10) {
      mm = '0' + month.toString()
    }
    this.today = yyyy + '-' + mm + '-' + dd;
  }

  obtenerID(e, id) {
    if (e.target.checked) {
      this.arrayHabs.push(id);
    } else {
      this.arrayHabs.splice(this.arrayHabs.indexOf(id), 1);
    }
    console.log(this.arrayHabs);

    if (this.arrayHabs.length == 0) {
      this.habitacionSelect = true;
    } else {
      this.habitacionSelect = false;
    }
  }

  avanzarDatosPersonales() {
    this.estadosTab.tab1 = true;
    this.estadosTab.tab2 = false;
    this.estadoPanel.tab1 = false;
    this.estadoPanel.tab2 = true;

    for (let i = 0; i < this.arrayHabs.length; i++) {
      this.habitacionesFinal = this.habitacionesFinal.concat(
        this.habitaciones.filter(value => value.id == this.arrayHabs[i])
      );
    }
  }

  insertarCliente(nuevo: any) {
    this.contador++;
    console.log(nuevo.nombres);
    let cliente = [{
      id: this.contador,
      nombres: nuevo.nombres,
      apellidos: nuevo.apellidos,
      cedula: nuevo.cedula,
      email: nuevo.email,
      direccion: nuevo.direccion,
      telefono: nuevo.telefono
    }];
    this.clientes = this.clientes.concat(cliente);
    this.formulario.crearCerrado = true;
    this.datosIngresados = false;
  }

  editCliente(cliente: any) {
    this.formulario.editarCerrado = true;
  }

  borrarCliente(id) {
    this.clientes = this.clientes.filter(value => id != value.id)
    if (this.clientes.length == 0) {
      this.datosIngresados = true;
    }
  }

  avanzarReservacion() {
    this.estadosTab.tab2 = true;
    this.estadosTab.tab3 = false;
    this.estadoPanel.tab2 = false;
    this.estadoPanel.tab3 = true;
  }

  guardarReservacion() {
    for (let i = 0; i < this.arrayHabs.length; i++) {
      this._http.put(this._masterURL.url + "Habitaciones/" + this.arrayHabs[i], {
        disponible: 'No'
      }).subscribe(
        res => {
          console.log('Habitacion Actualizada')
        },
        err => {
          console.log('Error')
        }
      );

      this._http
        .post(this._masterURL.url + 'Reservaciones', {
          fechaIngreso: this.criteriosBusqueda.fechaIngreso,
          fechaSalida: this.criteriosBusqueda.fechaSalida,
          num_tarjeta: this.num_tarjeta,
          idHabitacion: this.arrayHabs[i]
        }).subscribe(
        res => {
          this._http
            .post(this._masterURL.url + 'Clientes', {
              nombres: this.clientes[0].nombres,
              apellidos: this.clientes[0].apellidos,
              cedula: this.clientes[0].cedula,
              email: this.clientes[0].email,
              direccion: this.clientes[0].direccion,
              telefono: this.clientes[0].telefono,
              idReservacion: res.json().id
            }).subscribe(
              res => {
                this._router.navigate(['/Clientes/Reservaciones'])
              },
              err => {
                console.log('Error');
              }
          )
        },
        err => {
          console.log('Error')
        }
      )
    }
  }
}
