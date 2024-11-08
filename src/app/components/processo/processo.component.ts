import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Processo } from '../../models/processo';
import { ProcessoService } from '../../services/processo.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-processo',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './processo.component.html',
  styleUrl: './processo.component.scss'
})
export class ProcessoComponent implements OnInit {
  lista:Processo[]= [];
  listaFiltrada:Processo[]=[];
  listaId:number | null =null;
  listaNome: string = '';

  processoService = inject(ProcessoService);

  constructor(private route:Router){
    
    this.findAll();
    let processo: Processo = new Processo();

  }
  ngOnInit(): void {
    this.findAll();
    this.listaFiltrada = this.lista;
  }

  findAll() {
    this.processoService.findAll().subscribe({
      next: (dados) => {
        this.lista = dados; // `dados` é a resposta recebida do serviço
      },
      error: (erro) => {
        alert("Ocorreu um erro ao buscar a lista de processos.");
        console.error('Erro:', erro); // Log adicional para detalhes do erro
      },
    });
  }
  filtroProcessos() {
    if (!this.listaId && !this.listaNome) {
      // Se nenhum critério de busca estiver definido, mostra todos os processos
      this.listaFiltrada = this.lista;
    } else {
      // Se há critérios de busca, filtra a lista
      this.listaFiltrada = this.lista.filter(processo => {
        const matchesId = this.listaId ? processo.id === this.listaId : true;
        const matchesName = this.listaNome 
          ? processo.cliente.toString().includes(this.listaNome) 
          : true; // Filtra pelo ID do cliente como string
  
        return matchesId && matchesName;
      });
    }
  }
  
  trackById(index: number, processo: any): number {
    return processo.id; // Retorna o ID para otimizar o desempenho do *ngFor
  }

  delete(processo:Processo){
    Swal.fire({
      title:'Quer deletar este cliente?',
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'Sim',
      cancelButtonText:'Não',
    }).then((result)=>{
      if(result.isConfirmed){
        this.processoService.delete(processo.id).subscribe({
          next: result =>{
            Swal.fire({
              title:'Deletado com sucesso',
              icon: 'success',
              confirmButtonText:'OK'
            })
            this.findAll();
          },
          error: erro =>{
            Swal.fire({
              title:'Erro ao deletar',
              icon: 'error',
              confirmButtonText:'OK'
            })
          }
        })
      }
    }
  )

  }

  criarProcesso(){
    this.route.navigate(['/criarProcesso']);
  }
  uploadDoc(id:number){
    this.route.navigate(['/documento',id]);
  }

  

}
