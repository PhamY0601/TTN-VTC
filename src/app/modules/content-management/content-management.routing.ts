import { Routes } from '@angular/router';
import {WarningContentListComponent} from "./warning-content/warning-content-list/warning-content-list.component";
import {WarningContentDialogComponent} from "./warning-content/warning-content-dialog/warning-content-dialog.component";
import {RegistrationContentComponent} from "./registration-content/registration-content.component";
import {EditorialContentComponent} from "./editorial-content/editorial-content.component";

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
    component: RegistrationContentComponent,
    data: { breadcrumb: 'Nội dung đăng ký' },
  },
  {
    path: 'editorial-content',
    component: EditorialContentComponent,
    data: { breadcrumb: 'Nội dung biên tập' },
  }
];
