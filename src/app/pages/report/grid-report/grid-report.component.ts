import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormReportComponent} from "../form-report/form-report.component";
import {AsignationsServicesService} from "../../../services/asignations-services.service";
import {MatTableDataSource} from "@angular/material/table";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-grid-report',
  templateUrl: './grid-report.component.html',
  styleUrls: ['./grid-report.component.css']
})
export class GridReportComponent implements OnInit {
  displayedColumns: string[] = ['name', 'position', 'workArea', 'email', 'item', 'amount', 'actions'];
  dataSource = new MatTableDataSource<any>();

  constructor(private dialog: MatDialog,
              private _asignationService: AsignationsServicesService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getAsignation();
  }

  /**
   * @description: Abre el cuadro de dialogos
   */
  public openDialog(): void {
    this.dialog.open(FormReportComponent);
    this._asignationService.behaviorSubjectAsignation$.next({isEdit: false})

  }

  /**
   * @description: Muestra en la tabla todos los registros
   */
  private getAsignation(): void {
    this._asignationService.getAsignations().subscribe(data => {
      let report: any = [];
      data.forEach((element: any) => {
        report.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
      this.dataSource = new MatTableDataSource(report);
    });
  }

  /**
   * @description: Elimmina un registro de la tabla
   */

  public deleteAsignation(id: string) {
    this._asignationService.deleteAsignation(id).then(() => {
      this.toastr.error('La acción fue realizada de forma exitosa.', 'Elemento eliminado');
    })
  }

  /**
   * @description: Mostrar informacion de la asignacion y lo guarda en el behaviorSubject
   */

  public editAsignation(id: string): void {
    this.dialog.open(FormReportComponent);
    this._asignationService.getAsignation(id).subscribe(res => {
      this._asignationService.behaviorSubjectAsignation$.next({isEdit: true, payload: res.payload.data(), id})
    })
  }

}
