import { ComentarioService } from "./../../core/comentario.service";
import { Comentario } from "../../shared/models/Comentario";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { ModalComentarioComponent } from "src/app/shared/modalComentario/modal-comentario.component";
import { Tarefa } from "src/app/shared/models/Tarefa";
import { Observable, of } from "rxjs";
import { TarefaService } from "src/app/core/tarefa.service";

@Component({
  templateUrl: "./tarefas-view.component.html",
  styleUrls: ["./tarefas-view.component.css"],
})
export class TarefasViewComponent implements OnInit {
  _tarefas: Tarefa[] = [];
  tarefasFiltradas: Tarefa[];

  statusTarefa: String[] = [
    "Hoje",
    "Atrasadas",
    "Agendadas",
    "Concluídas",
    "Todas",
  ];
  statusSelected: String = this.statusTarefa[0];

  tarefa: Tarefa = new Tarefa();

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tarefaService: TarefaService,
    private comentarioService: ComentarioService
  ) {}

  ngOnInit() {
    this.buscarTarefas();
  }

  buscarTarefas() {
    this.tarefaService.findAll().subscribe({
      next: (tarefas) => {
        this._tarefas = tarefas;
        this.filtrarByStatus(this.statusSelected);
      },
      error: (err) => console.log("Fail buscarTarefas", err),
    });
  }

  filtrarByStatus(statusSelected) {
    if (statusSelected == "Hoje") {
      this.filterByToday();
    } else if (statusSelected == "Atrasadas") {
      this.filterByAtrasadas();
    } else if (statusSelected == "Agendadas") {
      this.filterByAgendadas();
    } else if (statusSelected == "Concluídas") {
      this.filterByConcluidas();
    } else {
      this.showTodas();
    }
  }

  filterByToday() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => {
      return tarefa.isPraHoje;
    });
  }

  filterByAtrasadas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => tarefa.isAtrasada);
  }

  filterByAgendadas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => tarefa.isAgendada);
  }

  filterByConcluidas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => !tarefa.isAtivo);
  }

  showTodas() {
    this.tarefasFiltradas = this._tarefas;
  }

  adicionarTarefa() {
    this.router.navigateByUrl("/tarefas/nova/");
  }

  adicionarComentario(tarefa: Tarefa) {
    const dialogRef = this.dialog.open(ModalComentarioComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        let novoComentario = this.createComentario(result, tarefa.id);

        this.salvarComentario(novoComentario, tarefa);
      }
    });
  }

  createComentario(descricao: string, idTarefaOrigem: number): Comentario {
    let novoComentario = new Comentario();
    novoComentario.descricao = descricao;
    novoComentario.idTarefa = idTarefaOrigem;

    return novoComentario;
  }
  salvarComentario(novoComentario: Comentario, tarefaOrigem: Tarefa) {
    this.comentarioService.save(novoComentario).subscribe({
      next: (r) => {
        tarefaOrigem.comentarios.push(r);
      },
      error: (err) => console.log("Fail  salvarComentario", err),
    });
  }

  editarTarefa(idTarefa: number) {
    this.router.navigateByUrl("/tarefas/nova/" + idTarefa);
  }

  concluirTarefa(tarefaConcluida: Tarefa) {
    tarefaConcluida.isAtivo = false;
    this.tarefaService.update(tarefaConcluida).subscribe({
      next: () => {
        this.buscarTarefas();
      },
      error: (err) => console.log("Fail atualizar", err),
    });
  }

  deletarTarefa(idTarefa: number) {
    this.tarefaService.deleteById(idTarefa).subscribe({
      next: () => {
        this.buscarTarefas();
      },
      error: (err) => console.log("Fail deletarTarefa", err),
    });
  }
}
