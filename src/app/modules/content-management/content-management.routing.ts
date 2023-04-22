import { Routes } from '@angular/router';
import {WarningContentListComponent} from "./warning-content/warning-content-list/warning-content-list.component";
import {WarningContentDialogComponent} from "./warning-content/warning-content-dialog/warning-content-dialog.component";

export const ContentManagementRoutes: Routes = [
  {
    path: 'warning-content',
    component: WarningContentListComponent,
    children: [
      {
        path: 'add',
        component: WarningContentDialogComponent
      }
    ]

  }
];
