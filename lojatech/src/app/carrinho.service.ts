import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface IProdutoCarrinho {
  id: number;
  name: string;
  desc: string;
  price: number;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  
  private itensSubject = new BehaviorSubject<IProdutoCarrinho[]>([]);
  itens$ = this.itensSubject.asObservable();
  
  
  total$ = this.itens$.pipe(
    map(itens => itens.reduce((total, item) => total + (item.price * item.quantidade), 0))
  );
  
  
  quantidadeTotal$ = this.itens$.pipe(
    map(itens => itens.reduce((total, item) => total + item.quantidade, 0))
  );

  constructor() {
    this.carregarCarrinho();
  }

  private carregarCarrinho(): void {
    const savedCart = localStorage.getItem("carrinho");
    if (savedCart) {
      this.itensSubject.next(JSON.parse(savedCart));
    }
  }

  private salvarCarrinho(): void {
    localStorage.setItem("carrinho", JSON.stringify(this.itensSubject.value));
  }

  obterCarrinho(): Observable<IProdutoCarrinho[]> {
    return this.itens$;
  }

  adicionarAoCarrinho(produto: IProdutoCarrinho): void {
    const itensAtuais = this.itensSubject.value;
    const itemExistente = itensAtuais.find(item => item.id === produto.id);
    
    if (itemExistente) {
      itemExistente.quantidade += produto.quantidade;
      this.itensSubject.next([...itensAtuais]);
    } else {
      this.itensSubject.next([...itensAtuais, produto]);
    }
    
    this.salvarCarrinho();
  }

  removerProdutoCarrinho(produtoId: number): void {
    const itensAtuais = this.itensSubject.value;
    const novosItens = itensAtuais.filter(item => item.id !== produtoId);
    this.itensSubject.next(novosItens);
    this.salvarCarrinho();
  }

  atualizarQuantidade(produtoId: number, quantidade: number): void {
    if (quantidade <= 0) {
      this.removerProdutoCarrinho(produtoId);
      return;
    }
    
    const itensAtuais = this.itensSubject.value;
    const item = itensAtuais.find(item => item.id === produtoId);
    if (item) {
      item.quantidade = quantidade;
      this.itensSubject.next([...itensAtuais]);
      this.salvarCarrinho();
    }
  }

  limparCarrinho(): void {
    this.itensSubject.next([]);
    localStorage.removeItem("carrinho");
  }
}