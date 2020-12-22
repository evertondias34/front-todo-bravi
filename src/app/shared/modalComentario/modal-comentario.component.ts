import { Comentario } from "../models/Comentario";
import { Component, OnInit, Inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface ComentarioBean {
  titulo: string;
  novo: string;
}

@Component({
  selector: "modal-comentario",
  templateUrl: "./modal-comentario.component.html",
  styleUrls: ["./modal-comentario.component.css"],
})
export class ModalComentarioComponent implements OnInit {
  dados = {
    titulo: "Novo Comentário",
    novo: "",
  } as ComentarioBean;

  cadastro: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalComentarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Comentario,
    private fBuilder: FormBuilder
  ) {}

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit() {
    this.createTarefaFormGroup();
  }

  createTarefaFormGroup() {
    this.cadastro = this.fBuilder.group({
      descricao: [
        this.dados.novo,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }
}
