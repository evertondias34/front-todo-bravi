import { CamposModule } from "../components/campos/campos.module";
import { ModalComentarioComponent } from "./modal-comentario.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [ModalComentarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    CamposModule,
    ReactiveFormsModule,
  ],
})
export class ModalComentarioModule {}
