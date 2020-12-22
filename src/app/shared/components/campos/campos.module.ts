import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "./input-text/input-text.component";
import { InputNumberComponent } from "./input-number/input-number.component";
import { InputDateComponent } from "./input-date/input-date.component";
import { MaterialModule } from "../../material/material.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [InputTextComponent, InputNumberComponent, InputDateComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [InputTextComponent, InputNumberComponent, InputDateComponent],
})
export class CamposModule {}
