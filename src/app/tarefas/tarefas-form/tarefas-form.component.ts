import { TarefaService } from "../../core/tarefa.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router, ActivatedRoute } from "@angular/router";
import { ValidarCamposService } from "src/app/shared/components/campos/validar-campos.service";
import { Tarefa } from "src/app/shared/models/Tarefa";

@Component({
  templateUrl: "./tarefas-form.component.html",
  styleUrls: ["./tarefas-form.component.scss"],
})
export class TarefasFormComponent implements OnInit {
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;

  tarefa: Tarefa;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fBuilder: FormBuilder,
    private tarefaService: TarefaService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id = this.activatedRoute.snapshot.params["id"];

    if (this.id) {
      this.getTarefaById(this.id);
    } else {
      this.tarefa = new Tarefa();
      this.createTarefaFormGroup();
    }
  }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {}

  getTarefaById(idTarefa: number) {
    this.tarefaService.findById(idTarefa).subscribe({
      next: (tarefa) => {
        this.tarefa = tarefa;
        this.createTarefaFormGroup();
      },
      error: (err) => console.log("Fail getTarefaById", err),
    });
  }

  createTarefaFormGroup() {
    this.cadastro = this.fBuilder.group({
      id: [this.tarefa.id],
      isAtivo: [this.tarefa.isAtivo],
      titulo: [
        this.tarefa.titulo,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25),
        ],
      ],
      descricao: [
        this.tarefa.descricao,
        [Validators.minLength(5), Validators.maxLength(100)],
      ],
      dataPrevista: [this.tarefa.dataPrevista],
      tempoGasto: [
        this.tarefa.tempoGasto,
        [Validators.min(0), Validators.max(100)],
      ],
    });
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  cancelar() {
    this.router.navigateByUrl("/tarefas");
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const tarefa = this.cadastro.getRawValue() as Tarefa;

    tarefa.id ? this.atualizar(tarefa) : this.salvar(tarefa);
  }

  atualizar(tarefaEditada): void {
    this.tarefaService.update(tarefaEditada).subscribe({
      next: () => {
        this.router.navigateByUrl("/tarefas");
      },
      error: (err) => console.log("Fail atualizar", err),
    });
  }
  private salvar(novaTarefa: Tarefa): void {
    novaTarefa.isAtivo = true;
    novaTarefa.dataPrevista = novaTarefa.dataPrevista
      ? novaTarefa.dataPrevista
      : new Date();
    this.tarefaService.save(novaTarefa).subscribe({
      next: () => {
        this.router.navigateByUrl("/tarefas");
      },
      error: (err) => console.log("Fail salvar", err),
    });
  }
}
