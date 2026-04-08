import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                loadComponent: () => import('./app/pages/inicio/inicio').then((m) => m.Inicio)
            },
            {
                path: 'nuevo',
                loadComponent: () => import('./app/pages/nuevo/nuevo').then((m) => m.Nuevo)
            },
            {
                path: 'buscar',
                loadComponent: () => import('./app/pages/buscar/buscar').then((m) => m.Buscar)
            },
            {
                path: 'reporte',
                loadComponent: () => import('./app/pages/reporte/reporte').then((m) => m.Reporte )
            }
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];
