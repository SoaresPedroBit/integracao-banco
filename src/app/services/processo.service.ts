import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Processo } from '../models/processo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  http = inject(HttpClient);
  private API = "http://localhost:8080/api/processo"

  constructor() {}
  save(processo:Processo): Observable<Processo>{
    return this.http.post<Processo>(this.API+"/save",processo);
  }
  findAll(): Observable<Processo[]>{
    return this.http.get<Processo[]>(this.API+"/findAll");
  }
  delete(id:number): Observable<void>{
    return this.http.delete<void>(this.API+"/delete/"+id)
  }
}
