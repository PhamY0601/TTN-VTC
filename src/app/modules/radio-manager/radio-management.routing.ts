import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes} from '@angular/router';
import {RadioManagerListComponent} from "./radio-manager-list/radio-manager-list.component";
import {RadioManagerDialogComponent} from "./radio-manager-dialog/radio-manager-dialog.component";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";

import {IRadioManagement, RadioManagement} from "../../shared/models/radio-management.model";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {ScheduleService} from "../../shared/services/schedule.service";


@Injectable({providedIn: 'root'})
export class RadioManagementResolve implements Resolve<IRadioManagement> {
  constructor(private service: ScheduleService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.getScheduleDetail(id) as Observable<IRadioManagement>;
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
        },
        data: { breadcrumb: 'Thêm' }
      },
      {
        path: 'edit',
        component:  RadioManagerDialogComponent,
        resolve: {
          data: RadioManagementResolve,
        },
        data: { breadcrumb: 'Chỉnh sửa' }
      },
      {
        path: 'schedule/:id',
        component:  ScheduleDialogComponent,
        resolve: {
          data: RadioManagementResolve
        },
        data: { breadcrumb: 'Lịch phát' }
      }
    ]
  },
];
