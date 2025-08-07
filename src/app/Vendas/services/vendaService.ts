import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Venda } from '../models/venda';
import { CriarVendaRequest } from '../models/criar-venda-request';

@Injectable({
  providedIn: 'root'
})



export class VendaService {
 private baseUrl = 'https://localhost:7210/api/Vendas';

constructor(private http: HttpClient) {}


 buscarVendas(): Observable<ApiResponse<Venda[]>> {
     return this.http.get<ApiResponse<Venda[]>>(`${this.baseUrl}/BuscarVendas`);
  }

   obterUltimoNumeroVenda(): Observable<{ data: string }> {
    return this.http.get<{ data: string }>(`${this.baseUrl}/ObterUltimoNumeroVenda`);
  }

    criarVenda(payload: CriarVendaRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/CriarVenda`, payload);
  }
  
   alterarVenda(venda: CriarVendaRequest): Observable<any> {
       const url = `${this.baseUrl}/AlterarVenda/${venda.id}`;
       return this.http.put(url, venda);
  }

  buscarVenda(id: number): Observable<{ data: Venda; message?: string }> {
       const url = `${this.baseUrl}/BuscarVenda/${id}`;
       return this.http.get<{ data: Venda; message?: string }>(url);
   }

   deletarVenda(id: number): Observable<any> {
      const url = `${this.baseUrl}/DeletarVenda/${id}`;
      return this.http.delete(url);
    }
}
