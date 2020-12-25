import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Alerta } from "../../models/Alerta";

@Component({
  selector: "bravi-alerta",
  templateUrl: "./alerta.component.html",
  styleUrls: ["./alerta.component.css"],
})
export class AlertaComponent implements OnInit {
  alerta = {
    tituloDialog: "Titulo da acção!",
    descricao: "Descrição da ação!",
    tituloTarefa: "Recebe o titulo da Tarefa",
    btnSucesso: "Confirmar",
    btnCancelar: "Cancelar",
    possuirBtnFechar: false,
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta
  ) {}

  ngOnInit() {
    if (this.data) {
      this.alerta.tituloDialog =
        this.data.tituloDialog || this.alerta.tituloDialog;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.tituloTarefa =
        this.data.tituloTarefa || this.alerta.tituloTarefa;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar =
        this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.possuirBtnFechar =
        this.data.possuirBtnFechar || this.alerta.possuirBtnFechar;
    }
  }
}
