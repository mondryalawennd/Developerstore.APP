import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaService } from '../../services/vendaService';
import { Venda } from '../../models/venda';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-listar-vendas',
  imports: [CommonModule,RouterLink],
  templateUrl: './listar-vendas.html',
  styleUrl: './listar-vendas.scss'
})
export class ListarVendas implements OnInit {
  vendas: Venda[] = [];
  carregando: boolean = true;

  constructor(private router: Router, private vendaService: VendaService, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
   setTimeout(() => this.loadVendas(), 0);
  }

  loadVendas(): void {
    this.vendaService.buscarVendas().subscribe({
      next: (response) => {
        this.vendas = response.data;
        this.carregando = false;
          this.cdRef.detectChanges(); // garante atualização
      },
      error: (err) => {
        console.error('Erro ao buscar vendas:', err);
        this.carregando = false;
      }
    });
  }
  
  editarVenda(id: number) {
   this.router.navigate(['/criar-venda', id]);
   }
}
