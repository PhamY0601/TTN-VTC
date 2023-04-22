import {Routes} from '@angular/router';
import {FieldSourceComponent} from "./source-info-management/field-source/field-source.component";
import {GeographicSourceComponent} from "./source-info-management/geographic-source/geographic-source.component";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {ScheduleDialog2Component} from "./schedule-dialog2/schedule-dialog2.component";


export const SourceInfoManagementRoutes: Routes = [
    {
    path: 'field-source-info',
    component: FieldSourceComponent,
    data: {breadcrumb: 'Thông tin nguồn theo lĩnh vực'},
      children: [
        {
          path: 'schedule',
          component:  ScheduleDialogComponent,
          // resolve: {
          //   data: RadioManagementResolve
          // }

      }]
  },
  {
    path: 'geographic-source-info',
    component: GeographicSourceComponent,
    data: {breadcrumb: 'Thông tin nguồn theo địa lý'},
    children: [
      {
        path: 'schedule',
        component:  ScheduleDialog2Component,
        // resolve: {
        //   data: RadioManagementResolve
        // }

      }]
  },


];
