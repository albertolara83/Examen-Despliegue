import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product{
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  
  private url = 'https://api.npoint.io/1dee63ad8437c82b24fe'

  private productosSubject = new BehaviorSubject<Product[]>([]);
  productos$ = this.productosSubject.asObservable();

private productosOriginales: Product[] = [];

  constructor (private http: HttpClient){

  }
 cargarProductos() {
  this.http.get<Product[]>(this.url).subscribe({
    next: (productos) => {
      this.productosOriginales = productos;
      this.productosSubject.next(productos);
    },
    error: (err) => console.error('Error al cargar productos:', err)
  });
}
agregarProducto(producto: Product) {
  this.productosOriginales = [producto, ...this.productosOriginales];
  this.productosSubject.next(this.productosOriginales);
}

eliminarProducto(id: string) {
  
  this.productosOriginales = this.productosOriginales.filter(p => p._id !== id);

  
  this.productosSubject.next(this.productosOriginales);
}


filtrarPorNombre(nombre: string) {
  const filtrados = this.productosOriginales.filter(p =>
    p.name.toLowerCase().includes(nombre.toLowerCase())
  );
  this.productosSubject.next(filtrados);
}

filtrarPorCategoria(categoria: string) {
  const filtrados = this.productosOriginales.filter(p =>
    p.category.toLowerCase().includes(categoria.toLowerCase())
  );
  this.productosSubject.next(filtrados);
}

filtrarPorActivo(soloActivos: boolean) {
  const filtrados = soloActivos
    ? this.productosOriginales.filter(p => p.active)
    : this.productosOriginales;

  this.productosSubject.next(filtrados);
}

}
