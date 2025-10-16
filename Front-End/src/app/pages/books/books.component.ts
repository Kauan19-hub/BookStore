import { Component, inject, signal } from '@angular/core';
import { Livro } from '../../models/livro';
import { environment } from '../../../environments/environments';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.services';
import { LivrosService } from '../../services/livros.services';

@Component({
  selector: 'app-books.component',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  private svc = inject(LivrosService)
  private auth = inject(AuthService)
  
  livros = signal<Livro[]>([])
  carregando = signal(true)
  erro = signal<string | null>(null)

  apiBase = (environment.apiBase)

  private pendentes = new Map<number, File>()
  private previews = new Map<number, string>()
  private upStatus = new Map<number, 'idle' | 'up' | 'err'>()

  constructor(){
    console.log('Token de acesso: ', this.auth.token());
    this.svc.listar().subscribe({
    next: (data) => { this.livros.set(data); this.carregando.set(false); },
    error: () => { this.erro.set('Falha ao carregar livros'); this.carregando.set(false); }
    });
  }
}
