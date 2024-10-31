import { Component } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-cliente-save',
  standalone: true,
  imports: [],
  templateUrl: './cliente-save.component.html',
  styleUrl: './cliente-save.component.scss'
})
export class ClienteSaveComponent {
  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private clienteService: ClienteService) {
    this.clienteForm = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      status: ['Ativo', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      this.clienteService.save(this.clienteForm.value).subscribe({
        next: (response) => {
          console.log('Cliente salvo com sucesso:', response);
        },
        error: (error) => {
          console.error('Erro ao salvar cliente:', error);
        }
      });
    }
  }
}
