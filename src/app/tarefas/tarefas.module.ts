import { TarefasFormComponent } from "./tarefas-form/tarefas-form.component";
import { MaterialModule } from "../shared/material/material.module";
import { TarefasViewComponent } from "./tarefas-view/tarefas-view.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CamposModule } from "../shared/components/campos/campos.module";

@NgModule({
  declarations: [TarefasViewComponent, TarefasFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CamposModule,
    // RouterModule.forChild([
    //   {
    //     path: "tarefas",
    //     component: TarefasViewComponent,
    //   },
    // ]),
  ],
})
export class TarefasModule {}
