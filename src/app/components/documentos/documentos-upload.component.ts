import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DocumentoService } from '../../services/documento.service';

@Component({
  selector: 'app-documentos-upload',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './documentos-upload.component.html',
  styleUrls: ['./documentos-upload.component.scss']
})
export class DocumentosUploadComponent implements OnInit {
  processoForm!:FormGroup;
  documentos: File[] = [];
  processoId!:string;

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');
    if (id) {
      this.processoId = id;
    } else {
      console.error('ID do cliente não encontrado na URL');
    }
  
    // Inicialize o FormGroup corretamente
    this.processoForm = this.fb.group({
      documento: this.fb.group({
        dataRecebimento: [''],
        statusDocumento: [''],
        observacao: ['']
      })
    });
  }
  

  constructor(private route: Router,
     private documentoService: DocumentoService,
     private router: ActivatedRoute,
     private fb: FormBuilder
    ) {}

  onFilesSelected(event: any) {
    this.documentos = Array.from(event.target.files);
  }

  onUpload() {
    if (this.documentos.length === 0) {
      alert('Por favor, selecione pelo menos um arquivo.');
      return;
    }
  
    const formData = new FormData();
    this.documentos.forEach(file => {
      formData.append('files', file, file.name);
    });
  
    // Adiciona o processoId ao FormData
    formData.append('processoId', this.processoId);
  
    const documentoForm = this.processoForm.get('documento');
    if (documentoForm) {
      formData.append('dataRecebimento', documentoForm.value.dataRecebimento);
      formData.append('statusDocumento', documentoForm.value.statusDocumento);
      formData.append('observacao', documentoForm.value.observacao);
    }
  
    this.documentoService.save(formData).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Enviado com sucesso',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      error: (erro) => {
        console.error('Erro ao salvar:', erro);
        Swal.fire({
          title: 'Erro ao salvar',
          text: erro.error.message ? erro.error.message : 'Erro desconhecido',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  
  
}
