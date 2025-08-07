export interface CriarVendaRequest {
  id: number;
  numeroVenda: string;
  dataVenda: Date;
  clienteId: number;
  filialId: number;
  valorTotal: number;
 cancelado: boolean; 
  itens: ItemVendaRequest[];
}

export interface ItemVendaRequest {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
  desconto: number;
  cancelado?: boolean;
}

