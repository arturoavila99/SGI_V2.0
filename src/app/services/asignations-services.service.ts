import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AsignationsServicesService {
  public behaviorSubjectAsignation$: BehaviorSubject<{ isEdit?: boolean; payload?: any; id?: string }> = new BehaviorSubject<{ isEdit?: boolean; payload?: any; id?: string }>({isEdit: false});

  constructor(private firestore: AngularFirestore) {
  }

  /**
   * @description: Crea un registro nuevo
   */
  public createAsignation(data: any): Promise<any> {
    return this.firestore.collection('asignation').add(data);
  }

  /**
   * @description: Muestra todos los registros
   */
  public getAsignations(): Observable<any> {
    return this.firestore.collection('asignation').snapshotChanges();
  }

  /**
   * @description: Elimina un registro
   */

  public deleteAsignation(id: string): Promise<any> {
    return this.firestore.collection('asignation').doc(id).delete();
  }

  /**
   * @description: Muestra los datos de un registro
   */

  public getAsignation(id: string): Observable<any> {
    return this.firestore.collection('asignation').doc(id).snapshotChanges();
  }

  /**
   * @description: Edita un registro
   */
  public editAsignation(id: string, data: any) {
    return this.firestore.collection('asignation').doc(id).update(data);
  }
}
