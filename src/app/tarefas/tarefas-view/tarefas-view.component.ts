import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { Alerta } from "src/app/shared/models/Alerta";
import { Tarefa } from "src/app/shared/models/Tarefa";
import { TarefaService } from "src/app/core/tarefa.service";
import { AlertaComponent } from "src/app/shared/components/alerta/alerta.component";
import { ModalComentarioComponent } from "src/app/shared/modalComentario/modal-comentario.component";

import { Comentario } from "../../shared/models/Comentario";
import { ComentarioService } from "./../../core/comentario.service";
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

  //Tarefa
  adicionarTarefa() {
    this.router.navigateByUrl("/tarefas/nova/");
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

  editarTarefa(idTarefa: number) {
    this.router.navigateByUrl("/tarefas/nova/" + idTarefa);
  }

  //Comentário
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

  //Filtros
  filterByAgendadas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => tarefa.isAgendada);
  }

  filterByAtrasadas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => tarefa.isAtrasada);
  }

  filterByConcluidas() {
    this.tarefasFiltradas = this._tarefas.filter((tarefa) => !tarefa.isAtivo);
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

  showTodas() {
    this.tarefasFiltradas = this._tarefas;
  }

  //Alertas
  confirmacao(tarefa: Tarefa, acaoCurrent: string) {
    const config = {
      data: {
        tituloDialog: `${acaoCurrent} Tarefa`,
        descricao: `Deseja ${acaoCurrent.toLowerCase()} a tarefa: `,
        tituloTarefa: tarefa.titulo,
        btnSucesso: "Confirmar",
        btnCancelar: "Cancelar",
        possuirBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        acaoCurrent == "Concluir"
          ? this.concluirTarefa(tarefa)
          : this.deletarTarefa(tarefa.id);
      }
    });
  }
}
