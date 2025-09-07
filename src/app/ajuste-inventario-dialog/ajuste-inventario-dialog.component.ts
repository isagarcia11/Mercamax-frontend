import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ajuste-inventario-dialog',
  templateUrl: './ajuste-inventario-dialog.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class AjusteInventarioDialogComponent {
  
  motivosAjuste: string[] = ['DAÑADO', 'PÉRDIDA', 'ROTO', 'ROBO', 'ERROR_CONTEO'];
  

  ajusteData: any; 

  constructor(
    public dialogRef: MatDialogRef<AjusteInventarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { stockItemId: number, cantidadEnSistema: number }
  ) {
    
    this.ajusteData = {
      stock_item_id: this.data.stockItemId,
      cantidad_contada: null, 
      motivo: '',
      notas: ''
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close(this.ajusteData);
  }
}