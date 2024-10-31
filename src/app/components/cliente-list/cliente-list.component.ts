import { Component, inject } from '@angular/core';
import { Cliente } from '../../models/cliente';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.scss'
})
export class ClienteListComponent {
  lista: Cliente[] = []

  clienteService = inject(ClienteService);

  constructor(private route:Router){

    this.findAll();

    let cliente: Cliente = new Cliente();
     

  }

  findAll(){
    this.clienteService.findAll().subscribe({
      next:lista => {
        this.lista = lista;
      },
      error: erro =>   {
        alert("Ocorreu um erro")
      },
    })
  }
  delete(cliente : Cliente){
    Swal.fire({
      title:'Quer deletar este cliente?',
      icon:'warning',
      showConfirmButton:true,
      showDenyButton:true,
      confirmButtonText:'Sim',
      cancelButtonText:'Não',
    }).then((result)=>{
      if(result.isConfirmed){
        this.clienteService.delete(cliente.id).subscribe({
          next: lista =>{
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
  salvar(){
    this.route.navigate(['/salvarCliente']);
  }



    
  }