import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        @for (item of model; track item.label) {
            @if (!item.separator) {
                <li app-menuitem [item]="item" [root]="true"></li>
            } @else {
                <li class="menu-separator"></li>
            }
        }
    </ul> `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    {
                        label: 'Inicio',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Nuevo',
                        icon: 'pi pi-fw pi-plus-circle',
                        routerLink: ['/nuevo']
                    },
                    {
                        label: 'Buscar',
                        icon: 'pi pi-fw pi-search',
                        routerLink: ['/buscar']
                    },
                    {
                        label: 'Reporte',
                        icon: 'pi pi-fw pi-chart-line',
                        routerLink: ['/reporte']
                    }
                ]
            }
        ];
    }
}
