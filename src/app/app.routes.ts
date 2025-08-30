import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductsComponent } from './products/products.component';
import { SecurityComponent } from './security/security.component';

export const routes: Routes = [
     { path: 'login', component: LoginComponent },
     {path: 'dashboard', component: LayoutComponent},
     { path: 'inventario/productos', component: ProductsComponent },
     {path:'autenticacion', component: SecurityComponent}

];
