import {Routes} from '@angular/router';
import {FieldSourceComponent} from "./source-info-management/field-source/field-source.component";
import {GeographicSourceComponent} from "./source-info-management/geographic-source/geographic-source.component";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";


export const SourceInfoManagementRoutes: Routes = [
    {
    path: 'field-source-info',
    component: FieldSourceComponent,
    data: {breadcrumb: 'Thông tin nguồn theo lĩnh vực'},
      children: [
        {
          path: 'schedule-field-source/:id',
          component:  ScheduleDialogComponent,

      }]
  },
  {
    path: 'geographic-source-info',
    component: GeographicSourceComponent,
    data: {breadcrumb: 'Thông tin nguồn theo địa lý'},
    children: [
      {
        path: 'schedule-geographic-source/:id',
        component:  ScheduleDialogComponent,

      }]
  },


];
