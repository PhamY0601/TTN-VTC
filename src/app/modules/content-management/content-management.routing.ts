import { Routes } from '@angular/router';
import {WarningContentListComponent} from "./warning-content-list/warning-content-list.component";
import {WarningContentDialogComponent} from "./warning-content-dialog/warning-content-dialog.component";

export const WarningContentRoutes: Routes = [
  {
    path: '',
    component: WarningContentListComponent,
    children: [
      {
        path: 'add',
        component: WarningContentDialogComponent
      }
    ]

  }
];
