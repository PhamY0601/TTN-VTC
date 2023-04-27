import { Routes } from '@angular/router';
import {WarningContentListComponent} from "./warning-content/warning-content-list/warning-content-list.component";
import {WarningContentDialogComponent} from "./warning-content/warning-content-dialog/warning-content-dialog.component";
import {RegistrationContentListComponent} from "./registration-content/registration-content-list/registration-content-list.component";
import {EditorialContentListComponent} from "./editorial-content/editorial-content-list/editorial-content-list.component";
import {
  EditorialContentDialogComponent
} from "./editorial-content/editorial-content-dialog/editorial-content-dialog.component";
import {
  RegistrationContentDialogComponent
} from "./registration-content/registration-content-dialog/registration-content-dialog.component";

export const ContentManagementRoutes: Routes = [
  {
    path: 'warning-content',
    component: WarningContentListComponent,
    data: { breadcrumb: 'Cảnh báo từ khóa' },
    children: [
      {
        path: 'add',
        component: WarningContentDialogComponent
      }
    ]
  },
  {
    path: 'registration-content',
    component: RegistrationContentListComponent,
    data: { breadcrumb: 'Nội dung đăng ký' },
    children: [
      {
        path: 'add',
        component: RegistrationContentDialogComponent
      }
    ]
  },
  {
    path: 'editorial-content',
    component: EditorialContentListComponent,
    data: { breadcrumb: 'Nội dung biên tập' },
    children: [
      {
        path: 'add',
        component: EditorialContentDialogComponent
      }
    ]
  }
];
