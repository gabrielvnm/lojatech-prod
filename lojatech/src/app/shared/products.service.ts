import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Produto } from "../types/produtos";
import { environment } from "src/environments/environment";

@Injectable({providedIn:'root'})

export class Products{
    private apiURL = '/api/produtos';


    constructor(private http:HttpClient){}

    listarProdutos():Observable<Produto[]>{
        return this.http.get<Produto[]>(this.apiURL)
    }
    adicionarProduto(produto:Produto):Observable<Produto>{
        return this.http.post<Produto>(this.apiURL,produto)
    }
    atualizarProduto(id: number, produto: Produto): Observable<Produto> {
        return this.http.put<Produto>(`${this.apiURL}/${id}`, produto);
    }
    deletarProduto(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiURL}/${id}`);
    }
}
