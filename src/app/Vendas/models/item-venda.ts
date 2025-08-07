interface ItemVenda {
  produtoId: number;
  nomeProduto?: string;
  quantidade: number;
  precoUnitario: number;
  valorBruto?: number;
  descontoPercentual?: number;
  valorComDesconto?: number;
  cancelado: boolean;
  erro?: string | null;
}