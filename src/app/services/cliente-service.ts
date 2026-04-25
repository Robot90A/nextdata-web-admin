import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private api = 'http://localhost:8080/nextdata';

    constructor(private http: HttpClient) {}

    getTiposProducto() {
        return this.http.get<any[]>(`${this.api}/listaTipoProductos`);
    }

    getProductos() {
        return this.http.get<any[]>(`${this.api}/listarProductos`);
    }

    guardarCliente(data: any) {
        return this.http.post(`${this.api}/guardarCliente`, data);
    }

    guardarVenta(data: any) {
        return this.http.post(`${this.api}/guardarVenta`, data);
    }

}
