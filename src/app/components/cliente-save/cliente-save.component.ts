import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cliente-save',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-save.component.html',
  styleUrl: './cliente-save.component.scss'
})
export class ClienteSaveComponent implements OnInit{
  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService,private route:Router) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nome: [''],
      email: [''],
      cpf: [''],
      rg: [''],
      profissao: [''],
      telefone: [''],
      dataNascimento: [''],
      estadoCivil: [''],
      endereco: this.fb.group({
        logradouro: [''],
        numero: [''],
        complemento: [''],
        bairro: [''],
        cidade: [''],
        uf: [''],
        cep: ['']
      })
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      this.clienteService.save(this.clienteForm.value).subscribe({
        next: (response) => {
          Swal.fire({
            title:'Cadastrado com sucesso',
            icon:'success',
            confirmButtonText:'OK'
          })
          this.route.navigate(['/clientes']);
        },
        error: erro =>{
          Swal.fire({
            title:'Erro ao salvar',
            icon: 'error',
            confirmButtonText:'OK'
          })
        }
      });
    }
  }
}
