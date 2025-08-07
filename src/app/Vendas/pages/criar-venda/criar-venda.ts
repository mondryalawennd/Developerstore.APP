import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriarVendaRequest, ItemVendaRequest } from '../../models/criar-venda-request';
import { VendaService } from '../../services/vendaService';
import { FormsModule, NgForm  } from '@angular/forms';
import { ClienteService } from '../../services/clienteService';
import { FilialService } from '../../services/filialService';
import { ProdutoService } from '../../services/produtoService';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-criar-venda',
  imports: [CommonModule, FormsModule, NgForOf],
  templateUrl: './criar-venda.html',
  styleUrl: './criar-venda.scss'
})

export class CriarVenda  implements OnInit {
   constructor( private route: ActivatedRoute,private router: Router, private vendaService: VendaService, private clienteService: ClienteService, private filialService: FilialService, private produtoService: ProdutoService, private cdRef: ChangeDetectorRef) {}
   
   itemVenda!: ItemVenda;
   clientes: Cliente[] = [];
   filiais: Filial[] = [];
   produtos: Produto[] = [];
   produtoMap: Map<number, string> = new Map();
   produtoAdicionado!: string;

    novaVenda: CriarVendaRequest = {
    id:0,
    numeroVenda: '',
    dataVenda: new Date(),
    clienteId: 0,
    filialId: 0,
    valorTotal: 0,
    cancelado: false,
    itens: []
  };
      
   novoItem: ItemVendaRequest = {
    produtoId: 0,
    quantidade: 0,
    precoUnitario: 0,
    desconto: 0,
    cancelado: false
  };

  valorUnitario: number = 0;
  valorItemTotal: number = 0;
  erroItem: string = '';
  vendaId: number | null = null;

   ngOnInit() {

     this.route.params.subscribe(params => {
     this.vendaId = params['id'];

      if (this.vendaId) {
        this.carregarVenda(this.vendaId);
      } else {
        // nova venda (sem id)
        this.inicializarNovaVenda();
      }

    });


    this.carregarClientes();
    this.carregarFiliais();
    this.carregarProdutos();
    this.carregarNumeroVenda();
    const hoje = new Date();
    this.novaVenda.dataVenda = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
  }

  carregarVenda(id: number): void {
  this.vendaService.buscarVenda(id).subscribe({
    next: (response) => {
      const data = response.data;
      
       this.novaVenda = {
        id: data.id,
        numeroVenda: data.numeroVenda,
        clienteId: data.clienteId,
        filialId: data.filialId,
        dataVenda: new Date(data.dataVenda),
        valorTotal: data.valorTotal ?? 0,
        cancelado: data.cancelado ?? false,
        itens: data.itens.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          precoUnitario: item.precoUnitario ?? 0,
           desconto: item.descontoPercentual ?? 0,
           cancelado: item.cancelado
        }))
      };

      if (response.message) {
        alert(response.message);
      }

      this.cdRef.detectChanges(); 
    },
    error: (error) => {    
      const mensagemErro = error?.error?.message || 'Erro ao carregar venda para edição.';
      alert(mensagemErro);
    }
  });
  }
  
   inicializarNovaVenda() {
    this.novaVenda = {
      id: 0,
      numeroVenda: '',
      dataVenda: new Date(),
      clienteId: 0,
      filialId: 0,
      valorTotal: 0,
      cancelado: false,
      itens: []
    };
  }

   carregarClientes(): void {
    this.clienteService.buscarClientes().subscribe({
      next: (response) => {
        this.clientes = response.data;
          this.cdRef.detectChanges(); // garante atualização
      },
      error: (err) => {
        console.error('Erro ao buscar clientes:', err);
      }
    });
  }

  carregarFiliais(): void {
    this.filialService.buscarFiliais().subscribe({
      next: (response) => {
        this.filiais = response.data;
          this.cdRef.detectChanges(); // garante atualização
      },
      error: (err) => {
        console.error('Erro ao buscar filiais:', err);
      }
    });
  }

  carregarProdutos(): void {
    this.produtoService.buscarProdutos().subscribe({
      next: (response) => {
        this.produtos = response.data;
          this.produtoMap = new Map(this.produtos.map(p => [p.id, p.nome]));
          this.cdRef.detectChanges(); // garante atualização
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  carregarNumeroVenda(): void {
    this.vendaService.obterUltimoNumeroVenda().subscribe({
      next: (response) => {
        this.novaVenda.numeroVenda = response?.data?.trim() ?? '';
          this.cdRef.detectChanges(); // garante atualização
      },
      error: (err) => {
        console.error('Erro ao buscar produtos:', err);
      }
    });
  }

  onQuantidadeBlur() { 
   const produtoSelecionado = this.produtos.find(p => p.id === Number(this.novoItem.produtoId));
      if (produtoSelecionado) {
        this.novoItem.precoUnitario = Number(produtoSelecionado.preco);
        this.valorUnitario = Number(produtoSelecionado.preco);
      }
  }

  onSelecionarProduto(produtoId: number) {
    const produtoSelecionado = this.produtos.find(p => p.id === Number(produtoId));
    if (produtoSelecionado) {
      this.novoItem.precoUnitario = Number(produtoSelecionado.preco);     
      this.valorUnitario = Number(produtoSelecionado.preco);
       this.novoItem.quantidade = 1;
    }
  }
  
  getNomeProduto(produtoId: number): string {
     const nome = this.produtoMap.get(produtoId);
     return nome !== undefined && nome !== null ? nome : 'Produto desconhecido';
  }

  adicionarItem() {
    const item = { ...this.novoItem };        //Clona o novoItem
    this.erroItem = '';             // Reseta possíveis erros anteriores

    const produtoId = this.novoItem.produtoId;
    const novaQuantidade = this.novoItem.quantidade;


    // Quantidade total produtos: (já adicionados + novo)
    const quantidadeAcumulada = this.novaVenda.itens
                                .filter(i => i.produtoId === produtoId)
                                .reduce((sum, i) => sum + i.quantidade, 0) + novaQuantidade;


    if (quantidadeAcumulada > 20) {
      this.erroItem = 'Não é permitido vender mais de 20 unidades do mesmo produto.';
      return;
    }

     let desconto = 0;
      if (quantidadeAcumulada >= 10 && quantidadeAcumulada <= 20) {
        desconto = 20;           //10-20 itens: 20% de desconto
      } else if (quantidadeAcumulada >= 4) {
        desconto = 10;          //4+ itens: 10% de desconto
      }
      
      // recupera nome produto adicionado-grid
      const nome = this.produtoMap.get(Number(this.novoItem.produtoId));
      this.produtoAdicionado = nome ?? 'Produto desconhecido';

      this.novaVenda.itens = this.novaVenda.itens.map(item => {
        if (item.produtoId === produtoId) {
          const valorBruto = item.quantidade * item.precoUnitario;
          return {
            ...item,
            desconto: desconto,
            valorComDesconto: valorBruto * (1 - desconto / 100)
            };
          }
          return item;
        });

       // Calcula valor bruto e com desconto para o novo item
      const valorBruto = this.novoItem.quantidade * this.novoItem.precoUnitario;
      const valorComDesconto = valorBruto * (1 - desconto / 100);
      this.valorItemTotal = valorComDesconto;

      // Prepara item para adicionar na lista
        const itemClonado = {
          ...this.novoItem,
          desconto: desconto,
          valorComDesconto: valorComDesconto
        };
   
        this.novaVenda.itens.push(itemClonado);

        this.atualizarValorTotal(); // Recalcula total da venda

        this.novoItem = {
          produtoId: 0,
          quantidade: 0,
          precoUnitario: 0,
          desconto: 0
        };

  }
  
  removerItem(index: number): void {
  this.novaVenda.itens.splice(index, 1);
  }
   
  atualizarValorTotal() {   // Atualiza o valor total da venda com base nos itens
   this.novaVenda.valorTotal = this.novaVenda.itens.reduce((total, item) => {
      const valorBruto = item.quantidade * item.precoUnitario;
      const desconto = item.desconto / 100;
      const valorComDesconto = valorBruto * (1 - desconto);
      return total + valorComDesconto;
    }, 0);
  }
  

  criarVenda(): void {
    if (!this.novaVenda.clienteId || !this.novaVenda.filialId || this.novaVenda.itens.length === 0) {
      alert('Por favor, selecione o cliente, a filial e adicione ao menos um item.');
      return;
    }

    this.vendaService.criarVenda(this.novaVenda).subscribe({
    next: (response: any) => {
    alert(response.message ?? 'Venda salva com sucesso!');

    this.novaVenda = {
      id: 0,
      numeroVenda: '',
      dataVenda: new Date(),
      clienteId: 0,
      filialId: 0,
      valorTotal: 0,
      itens: [], 
      cancelado: false
    };

    this.novoItem = {
        produtoId: 0,
        quantidade: 0,
        precoUnitario: 0,
        cancelado:false,
        desconto: 0
      };

    this.carregarNumeroVenda();
    this.cdRef.detectChanges();
  },
  error: (error: any) => {
    const msgErro = error?.error?.message || 'Erro ao salvar venda.';
    alert(msgErro);
  }
});

  }

 alterarVenda() {
  if (!this.novaVenda.id) {
    alert('Venda inválida para alteração.');
    return;
  }

  this.vendaService.alterarVenda(this.novaVenda).subscribe({
    next: (response) => {
      const msg = response?.message || 'Venda alterada com sucesso!';
      alert(msg);

      this.novaVenda = {
        id: 0,
        numeroVenda: '',
        dataVenda: new Date(),
        clienteId: 0,
        filialId: 0,
        valorTotal: 0,
        cancelado:false,
        itens: []
      };
      //this.carregarNumeroVenda();
      this.cdRef.detectChanges();
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/listar-vendas']);
      });
    },
    error: (err) => {
      const msgErro = err.error?.message || 'Erro ao alterar venda.';
      alert(msgErro);
    }
  });
}

deletarVenda(): void {
        this.vendaService.deletarVenda(this.novaVenda.id).subscribe({
          next: () => {
             alert('Venda excluída com sucesso!');
            this.router.navigate(['/listar-venda']); 
          },
          error: (err) => {
            console.error('Erro ao excluir venda: ', err);
            alert('Erro ao excluir avenda!');
          }
        });
  }



}
    