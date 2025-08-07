import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListarVendas } from './Vendas/pages/listar-vendas/listar-vendas';
import { Home } from './shared/components/home/home';
import { CriarVenda } from './Vendas/pages/criar-venda/criar-venda';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'listar-vendas',
    component: ListarVendas
  } ,
   {
    path: 'criar-venda',
    component: CriarVenda
  },
   { path: 'criar-venda/:id', component: CriarVenda },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
