import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/services/products.service';
import { Product } from '../../interfaces/productos';

    // Importaciones necesarias para la vista
    import { CommonModule } from '@angular/common';
    import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

    @Component({
      selector: 'app-product-detail',
      standalone: true,
      imports: [CommonModule, MatProgressSpinnerModule],
      templateUrl: './product-detail.component.html',
      styleUrls: ['./product-detail.component.scss']
    })
    export class ProductDetailComponent implements OnInit {

      product?: Product;
      stockDetails: any[] = [];
      isLoading = true;

      constructor(
        private route: ActivatedRoute,
        private productsService: ProductsService
      ) { }

      ngOnInit(): void {
        const productId = this.route.snapshot.paramMap.get('id');

        if (productId) {
          // 1. Pedimos la información principal del producto
          this.productsService.getProductById(+productId).subscribe(productData => {
            this.product = productData;
            
            // 2. Una vez que tenemos el producto, pedimos el detalle de su stock
            this.productsService.getStockDetails(this.product.id!).subscribe(details => {
              this.stockDetails = details;
              this.isLoading = false;
            });
          });
        }
      }
    }
    
