export interface Venda {
  id: number;
  numeroVenda: string;
  clienteId: number;
  clienteNome: string;
  filialId: number;
  filialNome: string;
  dataVenda: Date;
  valorTotal: number;
  itens: ItemVenda[]; 
  cancelado: boolean;
}
