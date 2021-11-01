import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AsignationsServicesService} from "../../../services/asignations-services.service";
import {ToastrService} from "ngx-toastr";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.css']
})
export class FormReportComponent implements OnInit {
  public form: FormGroup;
  public subscription$: Subscription | undefined;
  public titleForm?: string;
  public idCollection?: string;

  constructor(
    private fb: FormBuilder,
    private _asignationService: AsignationsServicesService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
        name: ['', Validators.required],
        position: ['', Validators.required],
        workArea: ['', Validators.required],
        email: ['', Validators.required],
        item: ['', Validators.required],
        amount: ['', Validators.required],
      }
    );
  }

  ngOnInit(): void {
    this.listenObservables();
  }

  /**
   * @description: Generar asignacion
   */
  private assignSelection(data: any): void {
    this._asignationService.createAsignation(data).then(() => {
      this.toastr.success('La acción fue realizada de forma exitosa.', 'Elemento asignado');
    });
  }

  /**
   * @description: Escucha el observable behavior
   */
  private listenObservables(): void {
    this.subscription$ = this._asignationService.behaviorSubjectAsignation$.subscribe(({isEdit, payload, id}) => {
      if (isEdit) {
        this.form.patchValue(payload);
        this.idCollection = id;
        this.titleForm = 'Editar asignacion';
      } else if (!isEdit) {
        this.form.reset({});
        this.titleForm = 'Nuevo asignacion';
      }
    });
  }
  /**
   * @description: Metodo guardar
   */
  public onSave(): void {
    const data = this.form.getRawValue();
    if (this.idCollection === undefined) {
      this.assignSelection(data);
    } else {
      this.onEdit(data, this.idCollection);
    }
  }
  /**
   * @description: Metodo editar
   */
  private onEdit(data: any, id: any): void {
    this._asignationService.editAsignation(id, data).then(() => {
      this.toastr.success('La acción fue realizada de forma exitosa.', 'Elemento editado');
    })
  }
}
