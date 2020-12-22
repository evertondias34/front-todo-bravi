import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tarefa } from "../shared/models/Tarefa";

const url = "http://localhost:8080/tarefas/";

@Injectable({
  providedIn: "root",
})
export class TarefaService {
  constructor(public http: HttpClient) {}

  findAll(): Observable<Tarefa[]> {
    return this.http.get<Tarefa[]>(`${url}findAll`);
  }

  save(tarefa: Tarefa): Observable<any> {
    return this.http.post<Tarefa>(`${url}`, tarefa);
  }

  update(tarefa: Tarefa): Observable<any> {
    return this.http.put<Tarefa>(`${url}`, tarefa);
  }

  findById(idTarefa: number): Observable<Tarefa> {
    return this.http.get<Tarefa>(`${url}find/?id=${idTarefa}`);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(`${url}delete/?id=${id}`);
  }
}
