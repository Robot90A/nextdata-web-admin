import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-nuevo',
    standalone: true,
    imports: [ReactiveFormsModule, InputTextModule, ButtonModule, DatePickerModule, SelectModule],
    templateUrl: './nuevo.html'
})
export class Nuevo {
    form: FormGroup;

    tiposProducto = [
        { label: 'Embutido', value: 1 },
        { label: 'Bebida', value: 2 }
    ];

    productos = [
        { label: 'Salchicha', value: 1 },
        { label: 'Jugo', value: 2 }
    ];

    constructor(private fb: FormBuilder) {
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

    guardar() {
        if (this.form.valid) {
            console.log(this.form.value);
        } else {
            this.form.markAllAsTouched();
        }
    }
}
