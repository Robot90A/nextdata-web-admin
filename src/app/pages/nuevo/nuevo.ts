import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ClienteService } from '../../services/cliente-service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-nuevo',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule, ToastModule, CommonModule, TableModule],
    templateUrl: './nuevo.html',
    providers: [MessageService]
})
export class Nuevo implements OnInit {
    form: FormGroup;

    tiposProducto: any[] = [];
    productos: any[] = [];
    detalles: any[] = [];

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
        if (this.form.valid && this.detalles.length > 0) {
            const f = this.form.value;

            const data = {
                cedula: f.cedula,
                nombre: f.nombre,
                correo: f.correo,
                telefono: f.telefono,
                edad: f.edad,

                fecha_venta: f.fecha ? f.fecha.toISOString().split('T')[0] : null,

                detalles: this.detalles.map((d) => ({
                    idProducto: d.idProducto,
                    cantidad: d.cantidad
                }))
            };

            console.log('Enviando:', data);

            this.clienteService.guardarVenta(data).subscribe({
                next: () => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Venta guardada correctamente'
                    });

                    this.form.reset();
                    this.detalles = []; //limpiar lista
                },
                error: (err) => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo guardar la venta'
                    });
                    console.error(err);
                }
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Completa los datos y agrega al menos un producto'
            });

            this.form.markAllAsTouched();
        }
    }

    agregarDetalle() {
        const f = this.form.value;

        if (!f.producto || !f.cantidad) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Advertencia',
                detail: 'Seleccione producto y cantidad'
            });
            return;
        }

        this.detalles.push({
            idProducto: f.producto,
            cantidad: f.cantidad,
            nombreProducto: this.productos.find((p) => p.value === f.producto)?.label
        });

        // limpiar solo esa parte
        this.form.patchValue({
            producto: null,
            cantidad: 1
        });
    }

    eliminarDetalle(index: number) {
        this.detalles.splice(index, 1);
    }
}
