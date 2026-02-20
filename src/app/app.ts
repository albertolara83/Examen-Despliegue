import { Component, signal } from '@angular/core';
import { ProductService, Product } from './services/product';
import { ProductsList } from './components/products-list/products-list';
import { ProductFormComponent } from './components/product-form/product-form';
import { ProductFilter } from './components/product-filter/product-filter';

@Component({
  selector: 'app-root',
  imports: [ProductsList, ProductFormComponent, ProductFilter],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('gestion-producto');

  productos: Product[] = [];

  /*constructor (private productService: ProductService){
    this.productService.cargarProductos();

    this.productService.productos$.subscribe(
      (datos: Product[]) => {
        console.log('Productos cargados de la API: ', datos);
      }
    );
    
  }*/
    constructor(private productService: ProductService) {
    //this.productService.cargarProductos();
    //this.productService.productos$.subscribe(productos => {
    //this.productos = productos;
      //console.log('Productos recibidos:', productos);
    //});
  }

  /*onProductoCreado(producto: any){
    console.log('Producto recibido: ', producto)
  }*/
  
      onProductoCreado(producto: any) {
    this.productService.agregarProducto(producto);
  }

  agregarProducto(datos: any) {

  const nuevoProducto: Product = {
    _id: crypto.randomUUID(),   // Generamos un ID único (trampilla)
    name: datos.name,
    description: datos.description,
    price: datos.price,
    category: datos.category,
    image: datos.image,
    active: datos.active
  };
  

  // Añadimos el nuevo producto al principio de la lista
  //this.onProductoCreado = [nuevoProducto, ...this.onProductoCreado];

  // Emitimos la nueva lista para que Angular actualice la vista
  //this.productosSubject.next(this.productosOriginales);

  this.productService.agregarProducto(nuevoProducto);
}

  
}
