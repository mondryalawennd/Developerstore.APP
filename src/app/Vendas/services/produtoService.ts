import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProdutoService {
 private baseUrl = 'https://localhost:7210/api/Produto';

constructor(private http: HttpClient) {}

 buscarProdutos(): Observable<ApiResponse<Produto[]>> {
     return this.http.get<ApiResponse<Produto[]>>(`${this.baseUrl}/BuscarProdutos`);
  }

}
