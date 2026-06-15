import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [
    {
      id: 1,
      name: 'Notebook Gamer XYZ',
      description: 'Processador Intel i7, 16GB RAM, SSD 512GB, Placa de Vídeo Dedicada',
      price: 4599.99
    },
    {
      id: 2,
      name: 'Monitor 24 Polegadas',
      description: 'Full HD, 144Hz, 1ms, Painel IPS',
      price: 1299.99
    },
    {
      id: 3,
      name: 'Teclado Mecânico RGB',
      description: 'Switch Blue, Iluminação RGB, ABNT2',
      price: 349.99
    },
    {
      id: 4,
      name: 'Mouse Gamer Pro',
      description: 'Sensor Óptico 16000 DPI, 7 Botões Programáveis',
      price: 199.99
    }
  ];

  email: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Any initialization logic here
  }

  addToCart(product: Product): void {
    console.log('Produto adicionado ao carrinho:', product);
    alert(`${product.name} adicionado ao carrinho!`);
    // Here you would implement actual cart logic
  }

  subscribeNewsletter(): void {
    if (this.email && this.email.includes('@')) {
      console.log('Email cadastrado:', this.email);
      alert('Inscrição realizada com sucesso!');
      this.email = '';
    } else {
      alert('Por favor, digite um email válido.');
    }
  }
}