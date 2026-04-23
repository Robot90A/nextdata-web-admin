import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ClienteService } from '../../services/cliente-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-nuevo',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, ToastModule],
    templateUrl: './nuevo.html',
    providers: [MessageService]
})
export class Nuevo implements OnInit {
    form: FormGroup;

    tiposProducto: any[] = [];
    productos: any[] = [];

    constructor(
        private fb: FormBuilder,
        private clienteService: ClienteService,
        private messageService: MessageService
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
            const f = this.form.value;

            const data = {
                cedula: f.cedula,
                nombre: f.nombre,
                correo: f.correo,
                telefono: f.telefono,
                edad: f.edad,

                productoId: f.producto,
                cantidad: f.cantidad,

                fecha_venta: f.fecha ? f.fecha.toISOString().split('T')[0] : null
            };

            console.log('Enviando:', data);

            this.clienteService.guardarVenta(data).subscribe({
                next: () => {
                    console.log('Venta guardada correctamente');

                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Venta guardada correctamente'
                    });

                    this.form.reset(); // impia formulario
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo guardar la venta'
                    });
                    console.error('Error al guardar', err);
                }
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
