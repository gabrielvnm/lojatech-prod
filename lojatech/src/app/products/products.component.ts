import { Component, OnInit } from '@angular/core';
import { Produto } from '../types/produtos';
import { Products } from '../shared/products.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CarrinhoService, IProdutoCarrinho } from '../carrinho.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  
  mostrarForm = false;
  mostrarFormUpdate = false;
  atualProdutoId: number | null = null;
  admin: boolean = false;

  produtos: Produto[] = []
  produtoForm!: FormGroup
  produtoFormUpdate!: FormGroup

  constructor(
    private products:Products,
    private fb:FormBuilder,
    private authService: AuthService,
    private carrinhoService: CarrinhoService
  ) {}
  
  //on init que carrega os formularios e os produtos
  ngOnInit(): void {
    this.carregarProdutos();
    this.produtoForm = this.fb.group({
      name:["",Validators.required],
      desc:["",Validators.required],
      price:[0,Validators.required],
    })
    this.produtoFormUpdate = this.fb.group({
      id:[0,Validators.required],
      name:["",Validators.required],
      desc:["",Validators.required],
      price:[0,Validators.required],
    })

    this.admin = this.authService.isAdmin();

    this.authService.currentUser$.subscribe(user => {
      this.admin = user?.role === 'admin';
      console.log('Admin status updated:', this.admin);
    });


    this.carregarProdutos();
  }

  // metodo temporario pra simular autenticação
  // toggleAdminMode() {
  //   this.admin = !this.admin;
  //   console.log('Admin mode:', this.admin);
  // }

  adicionarAoCarrinho(produto: Produto): void {
    const produtoCarrinho: IProdutoCarrinho = {
      id: produto.id!,
      name: produto.name,
      desc: produto.desc,
      price: produto.price,
      quantidade: 1  
    };
    this.carrinhoService.adicionarAoCarrinho(produtoCarrinho);
    
    console.log(`${produto.name} adicionado ao carrinho!`);
  }

  comprarAgora(produto: Produto): void{
    const produtoCarrinho: IProdutoCarrinho = {
      id: produto.id!,
      name: produto.name,
      desc: produto.desc,
      price: produto.price,
      quantidade: 1  
    };
    this.carrinhoService.adicionarAoCarrinho(produtoCarrinho);
    
  }

  // metodo pra fazer o GET
  carregarProdutos(): void {
    this.products.listarProdutos()
      .subscribe({
        next: (dados) => {
          this.produtos = dados;
        },
        error: (erro) => {
          console.error('Erro ao buscar produtos', erro);
        }
      });
  }
  // metodo pra fazer o POST
  adicionarProdutos(): void{
    if(this.produtoForm.valid){
      let produtoNovo: Produto = {
        name: this.produtoForm.get('name')?.value,
        desc: this.produtoForm.get('desc')?.value,
        price: this.produtoForm.get('price')?.value,
      }
      this.products.adicionarProduto(produtoNovo)
      .subscribe({
        next: (dados) => {
          this.produtoForm.reset();
          console.log('Produto adicionado!');
          this.carregarProdutos();
        },
        error: (erro) => {
          console.error('Erro ao criar produto', erro);
        }
      });
    }
    
  }
  // metodo pra fazer o PUT
  atualizarProduto(): void {
  if(this.produtoFormUpdate.valid && this.atualProdutoId) {
    let produtoAtualizado: Produto = {
      id: this.atualProdutoId,
      name: this.produtoFormUpdate.get('name')?.value,
      desc: this.produtoFormUpdate.get('desc')?.value,
      price: this.produtoFormUpdate.get('price')?.value,
    }
    
    this.products.atualizarProduto(this.atualProdutoId, produtoAtualizado)
      .subscribe({
        next: (dados) => {
          console.log('Produto atualizado com sucesso!', dados);
          this.produtoFormUpdate.reset();
          this.mostrarForm = false;
          this.atualProdutoId = null;
          this.carregarProdutos(); // Recarregar a lista após atualização
        },
        error: (erro) => {
          console.error('Erro ao atualizar produto', erro);
        }
      });
    }
  }

  prepararAtualizacao(produto: Produto): void {
    this.atualProdutoId = produto.id!;
    this.produtoFormUpdate.patchValue({
      id: produto.id,
      name: produto.name,
      desc: produto.desc,
      price: produto.price
    });
    this.mostrarFormUpdate = true;
  }

  exibirForm(): void {
    this.mostrarForm = !this.mostrarForm;
  }
  
  exibirFormClick(): void {
    this.mostrarForm = true;
  }

  cancelarAtualizacao(): void {
    this.mostrarFormUpdate = false;
    this.atualProdutoId = null;
    this.produtoFormUpdate.reset();
  }
  excluirProduto(id: number): void {
    if(confirm('Tem certeza que deseja excluir este produto?')) {
      this.products.deletarProduto(id)
        .subscribe({
          next: () => {
            console.log('Produto removido com sucesso!');
            this.carregarProdutos(); 
          },
          error: (erro) => {
            console.error('Erro ao deletar produto', erro);
          }
        });
    }
  }

}
