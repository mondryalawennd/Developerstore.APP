import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ClienteService {
 private baseUrl = 'https://localhost:7210/api/Cliente';

constructor(private http: HttpClient) {}
 
 buscarClientes(): Observable<ApiResponse<Cliente[]>> {
     return this.http.get<ApiResponse<Cliente[]>>(`${this.baseUrl}/BuscarClientes`);
  }
}
