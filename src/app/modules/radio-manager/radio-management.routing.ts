import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {RadioManagerListComponent} from "./radio-manager-list/radio-manager-list.component";
import {RadioManagerDialogComponent} from "./radio-manager-dialog/radio-manager-dialog.component";
import {Injectable} from "@angular/core";
import {CitiesService} from "../../shared/services/cities.service";
import {Observable, of} from "rxjs";

import {IRadioManagement, RadioManagement} from "../../shared/models/radio-management.model";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";


@Injectable({providedIn: 'root'})
export class RadioManagementResolve implements Resolve<IRadioManagement> {
  constructor(private service: CitiesService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getRadioStreamingDetail(id) as Observable<IRadioManagement>;
    }
    return of(new RadioManagement());
  }
}

export const RadioManagementRoutes: Routes = [

  {
    path: '',
    component: RadioManagerListComponent,
    children: [
      {
        path: 'add',
        component:  RadioManagerDialogComponent,
        resolve: {
          data: RadioManagementResolve
        }
      },
      {
        path: 'edit/:id',
        component:  RadioManagerDialogComponent,
        resolve: {
          data: RadioManagementResolve
        }
      },
      {
        path: 'schedule/:id',
        component:  ScheduleDialogComponent,
        resolve: {
          data: RadioManagementResolve
        }
      }
    ]
  },
];
