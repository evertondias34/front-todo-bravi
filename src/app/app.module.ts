import { ModalComentarioModule } from "./shared/modalComentario/modal-comentario.module";
import { ModalComentarioComponent } from "./shared/modalComentario/modal-comentario.component";
import { TarefasModule } from "./tarefas/tarefas.module";
import { MaterialModule } from "./shared/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app.routing.module";
import { AlertaComponent } from "./shared/components/alerta/alerta.component";

@NgModule({
  declarations: [AppComponent, AlertaComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    TarefasModule,
    ModalComentarioModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [ModalComentarioComponent, AlertaComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
