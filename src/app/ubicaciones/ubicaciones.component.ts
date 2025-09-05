import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ➡️ Importa Angular Material y tus interfaces
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UbicacionService } from '../../services/services/ubicacion.service';
import { Ubicacion } from '../interfaces/ubicacion';
import { CategoriaubicacionService } from '../../services/services/categoriaubicacion.service';
import { CategoriaUbicacion } from '../interfaces/categoria-ubicacion';

@Component({
  selector: 'app-ubicaciones',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  standalone:true,
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.scss'
})
export class UbicacionesComponent {
  ubicaciones: Ubicacion[] = [];
   categorias: CategoriaUbicacion[] = [];

    ubicacionForm: Ubicacion = {
    nombre: '',
    tipo: 'BODEGA', // Valor por defecto
    categoria: null,
    parent: null,
  };


  isEditing = false;
  view = 'list';

  // ➡️ Columnas de la tabla
  displayedColumns: string[] = ['id', 'nombre', 'tipo', 'categoria', 'parent', 'acciones'];

  constructor(
    private ubicacionService: UbicacionService,
    private categoriaService: CategoriaubicacionService
  ) { }

  ngOnInit(): void {
    this.loadUbicaciones();
    this.loadCategorias();
  }

  // ➡️ Métodos para cargar datos desde los servicios
  loadUbicaciones(): void {
    this.ubicacionService.getAll().subscribe(data => {
      this.ubicaciones = data;
    });
  }

  loadCategorias(): void {
    this.categoriaService.getAll().subscribe(data => {
      this.categorias = data;
    });
  }

  // ➡️ Método para iniciar el formulario de creación
  newUbicacion(): void {
    this.ubicacionForm = {
      nombre: '',
      tipo: 'BODEGA',
      categoria: null,
      parent: null,
    };
    this.isEditing = false;
    this.view = 'form';
  }

  // ➡️ Método para iniciar el formulario de edición
  editUbicacion(ubicacion: Ubicacion): void {
    // Clona el objeto para evitar modificar el original
    this.ubicacionForm = { ...ubicacion };
    this.isEditing = true;
    this.view = 'form';
  }
  
saveUbicacion(): void {
  // Check if it's an update (id exists)
  if (this.isEditing) {
    if (this.ubicacionForm.id) { // ➡️ Add a check for id existence
      this.ubicacionService.update(this.ubicacionForm.id, this.ubicacionForm).subscribe(() => {
        this.loadUbicaciones();
        this.view = 'list';
      });
    }
  } else {
    // It's a creation, so id will be null
    this.ubicacionService.create(this.ubicacionForm).subscribe(() => {
      this.loadUbicaciones();
      this.view = 'list';
    });
  }
}

// Corrected deleteUbicacion method
deleteUbicacion(id: number | undefined): void { // ➡️ Change parameter type to allow undefined
  if (id) { // ➡️ Check if id exists before calling the service
    this.ubicacionService.delete(id).subscribe(() => {
      this.loadUbicaciones();
    });
  }
}

  // ➡️ Método para obtener el nombre de la categoría por su ID (para la tabla)
  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find(cat => cat.id === id);
    return categoria ? categoria.nombre : 'Desconocida';
  }
}
