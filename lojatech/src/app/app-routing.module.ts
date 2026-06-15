import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { TestandoComponent } from './testando/testando.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { ContatoComponent } from './contato/contato.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "produtos", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "testando", component: TestandoComponent, canActivate: [AuthGuard] },
  { path: "carrinho", component: CarrinhoComponent },
  { path: "contato", component: ContatoComponent },
  
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: '**', component: NotFoundComponent} //importante esse aqui teme que ser por último 
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

console.log('Routes configured:', routes);
