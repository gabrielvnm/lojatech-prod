import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { BotaoLoginComponent } from './botao-login/botao-login.component';

import { ProductsComponent } from './products/products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestandoComponent } from './testando/testando.component';
import { HttpClientModule } from '@angular/common/http';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { ContatoComponent } from './contato/contato.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BotaoLoginComponent,
    ProductsComponent,
    TestandoComponent,
    CarrinhoComponent,
    UnderConstructionComponent,
    ContatoComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
