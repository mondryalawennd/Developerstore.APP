import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FilialService {
 private baseUrl = 'https://localhost:7210/api/Filial';

constructor(private http: HttpClient) {}

 buscarFiliais(): Observable<ApiResponse<Filial[]>> {
     return this.http.get<ApiResponse<Filial[]>>(`${this.baseUrl}/BuscarFiliais`);
  }

}
