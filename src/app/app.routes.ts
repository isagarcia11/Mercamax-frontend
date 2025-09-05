import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { SecurityComponent } from './security/security.component';
import { UbicacionesComponent } from './ubicaciones/ubicaciones.component';
import { ReportesComponent } from './reportes/reportes.component';
import { AjusteInventarioComponent } from './ajuste-inventario/ajuste-inventario.component';

const children: Routes = [
     { path: 'inventario/productos', component: ProductsComponent },
     {path: 'inventario/ubicaciones', component: UbicacionesComponent},
     {path: 'inventario/reportes', component: ReportesComponent},
     {path: 'inventario/ajuste', component: AjusteInventarioComponent}
];

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     {path: '', component: LayoutComponent,children},
     
     {path:'autenticacion', component: SecurityComponent},
    
];
