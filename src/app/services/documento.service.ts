import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Documentos } from '../models/documentos';

@Injectable({
  providedIn: 'root'
})
export class DocumentoService {
  private API = "http://localhost:8080/api/documento"; 

  constructor(private http: HttpClient) {}

  save(formData: FormData): Observable<any> {
    return this.http.post(`${this.API}/save`, formData);
  }
}
