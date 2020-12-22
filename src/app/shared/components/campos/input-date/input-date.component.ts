import { Component, Input } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { ValidarCamposService } from "../validar-campos.service";

@Component({
  selector: "bravi-input-date",
  templateUrl: "./input-date.component.html",
  styleUrls: ["./input-date.component.css"],
})
export class InputDateComponent {
  @Input() titulo: string;
  @Input() disabled: boolean;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  constructor(public validacao: ValidarCamposService) {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }
}
