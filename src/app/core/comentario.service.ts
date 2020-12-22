import { Comentario } from "./../shared/models/Comentario";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const url = "http://localhost:8080/comentarios/";

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  constructor(public http: HttpClient) {}

  save(comentario: Comentario): Observable<Comentario> {
    return this.http.post<Comentario>(`${url}`, comentario);
  }
}
