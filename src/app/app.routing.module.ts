import { TarefasViewComponent } from "./tarefas/tarefas-view/tarefas-view.component";
import { TarefasFormComponent } from "./tarefas/tarefas-form/tarefas-form.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { TarefasModule } from "./tarefas/tarefas.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "tarefas",
    pathMatch: "full",
  },
  {
    path: "tarefas",
    children: [
      {
        path: "",
        component: TarefasViewComponent,
      },
      {
        path: "nova",
        children: [
          {
            path: "",
            component: TarefasFormComponent,
          },
          {
            path: ":id",
            component: TarefasFormComponent,
          },
        ],
      },
    ],
  },
  { path: "**", redirectTo: "tarefas" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TarefasModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
