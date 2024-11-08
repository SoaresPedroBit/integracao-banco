import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProcessoService } from '../../services/processo.service';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';

@Component({
  selector: 'app-save-processo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './save-processo.component.html',
  styleUrl: './save-processo.component.scss'
})

export class SaveProcessoComponent implements OnInit {

    cliente!:Cliente;
    processoForm!: FormGroup;
    processoId!: number;
    clienteService = inject(ClienteService);
    
  constructor(
      private fb: FormBuilder,
      private processoService: ProcessoService,
      private route: ActivatedRoute,
      private router: Router
    ) {}
  
    ngOnInit(): void {
      this.processoForm = this.fb.group({
        tipoCliente: ['', Validators.required],
        areaAtuacao: ['', Validators.required],
        numeroProcesso: ['', Validators.required],
        comarca: ['', Validators.required],
        dataInicio: ['', Validators.required],
        descricao: [''],
        andamento: [''],
        situacaoAtual: [''],
        prazosImportantes: [[]],
        clienteId: [null, Validators.required],
        documentos: [[]]
      });
  
    }
  
  
    onSubmit(): void {
      const clienteId = this.processoForm.value.clienteId;
      if (clienteId) {
        this.clienteService.findById(clienteId).subscribe({
          next: (cliente) => {
            this.cliente = cliente;
            this.processoForm.patchValue({ cliente: this.cliente }); // Vincula o cliente ao processo
  
            // Salva o processo com o cliente vinculado
            this.processoService.save(this.processoForm.value).subscribe(() => {
              Swal.fire('Sucesso', 'Processo criado com sucesso', 'success');
              this.router.navigate(['/processo']);
            });
          },
          error: () => {
            Swal.fire('Erro', 'Cliente não encontrado', 'error');
          }
        });
      } else {
        Swal.fire('Erro', 'Preencha todos os campos obrigatórios', 'error');
      }
    }
    
  }

