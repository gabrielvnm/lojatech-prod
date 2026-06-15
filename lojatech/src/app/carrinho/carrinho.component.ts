import { Component, OnInit } from '@angular/core';
import { CarrinhoService, IProdutoCarrinho } from '../carrinho.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {
  itens$: Observable<IProdutoCarrinho[]>;
  total$: Observable<number>;
  
  constructor(private carrinhoService: CarrinhoService) {
    this.itens$ = this.carrinhoService.itens$;
    this.total$ = this.carrinhoService.total$;
  }

  ngOnInit(): void {}

  atualizarQuantidade(item: IProdutoCarrinho, quantidade: number): void {
    this.carrinhoService.atualizarQuantidade(item.id, quantidade);
  }

  removerItem(id: number): void {
    this.carrinhoService.removerProdutoCarrinho(id);
  }

  limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();
  }

  finalizarCompra(): void {
    console.log('Finalizando compra...');
    alert('Compra finalizada com sucesso!');
    this.carrinhoService.limparCarrinho();
  }
}