import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendaService } from '../../services/vendaService';
import { Venda } from '../../models/venda';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-listar-vendas',
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './listar-vendas.html',
  styleUrl: './listar-vendas.scss'
})
export class ListarVendas implements OnInit {
   constructor(private router: Router, private vendaService: VendaService, private cdRef: ChangeDetectorRef) {}
   
   vendas: Venda[] = [];
   carregando: boolean = true;
  
   ngOnInit(): void {
   setTimeout(() => this.loadVendas(), 0);
   this.loadVendas();
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
