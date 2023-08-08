import {Routes} from '@angular/router';
import {FieldSourceListComponent} from "./source-info-management/field-source/field-source-list/field-source-list.component";
import {GeographicSourceListComponent} from "./source-info-management/geographic-source/geographic-source-list/geographic-source-list.component";
import {ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {FieldSourceDialogComponent} from "./source-info-management/field-source/field-source-dialog/field-source-dialog.component";
import {GeographicSourceDialogComponent} from "./source-info-management/geographic-source/geographic-source-dialog/geographic-source-dialog.component";


export const SourceInfoManagementRoutes: Routes = [
    {
    path: 'field-source-info',
    component: FieldSourceListComponent,
    data: {breadcrumb: 'Thông tin nguồn theo lĩnh vực'},
      children: [
        {
          path: 'schedule-field-source/:id',
          component:  ScheduleDialogComponent,
          data: {breadcrumb: 'Lịch phát theo lĩnh vực'}
      },
        {
          path: 'add',
          component:  FieldSourceDialogComponent,
        },
      ]
  },
  {
    path: 'geographic-source-info',
    component: GeographicSourceListComponent,
    data: {breadcrumb: 'Thông tin nguồn theo địa lý'},
    children: [
      {
        path: 'schedule-geographic-source/:id',
        component:  ScheduleDialogComponent,
        data: {breadcrumb: 'Lịch phát theo địa lý'},
      },
      {
        path: 'add',
        component: GeographicSourceDialogComponent
      }
    ]
  },

];
