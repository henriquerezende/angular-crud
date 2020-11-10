import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = { name: '', price: 0 };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.productService
      .readById(this.route.snapshot.paramMap.get('id'))
      .subscribe((product) => (this.product = product));
  }

  deleteProduct(): void {
    this.productService
      .delete(this.route.snapshot.paramMap.get('id'))
      .subscribe(() =>
        this.productService.showMessage('Produto deletado com sucesso!')
      );
    this.router.navigate(['/products']);
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
