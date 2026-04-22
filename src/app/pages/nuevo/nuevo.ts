import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ClienteService } from '../../services/cliente-service'; // ajusta ruta

@Component({
    selector: 'app-nuevo',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule],
    templateUrl: './nuevo.html'
})
export class Nuevo implements OnInit {
    form: FormGroup;

    tiposProducto: any[] = [];
    productos: any[] = [];

    constructor(
        private fb: FormBuilder,
        private clienteService: ClienteService
    ) {
        this.form = this.fb.group({
            cedula: ['', Validators.required],
            nombre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', Validators.required],
            edad: [''],

            tipoProducto: [null, Validators.required],
            producto: [null, Validators.required],
            cantidad: [1, Validators.required],
            fecha: [null, Validators.required]
        });
    }

    ngOnInit(): void {
        this.cargarTiposProducto();
        this.cargarProductos();
    }

    cargarTiposProducto() {
        this.clienteService.getTiposProducto().subscribe((data) => {
            this.tiposProducto = data.map((tp) => ({
                label: tp.nombreTipo,
                value: tp.idTipo
            }));
        });
    }

    cargarProductos() {
        this.clienteService.getProductos().subscribe((data) => {
            this.productos = data.map((p) => ({
                label: p.nombreProducto,
                value: p.idProducto
            }));
        });
    }

    guardar() {
        if (this.form.valid) {
            const data = this.form.value;

            console.log('Datos enviados:', data);

            // OPCIONAL (cuando quieras conectar)
            this.clienteService.guardarCliente(data).subscribe({
                next: (res) => {
                    console.log('Guardado OK', res);
                },
                error: (err) => {
                    console.error('Error', err);
                }
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
