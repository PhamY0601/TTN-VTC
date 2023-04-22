import { Routes } from '@angular/router';
import {EmergencyBroadcastingListComponent} from "./emergency-broadcasting-list/emergency-broadcasting-list.component";
import {
  EmergencyBroadcastingDialogComponent
} from "./emergency-broadcasting-dialog/emergency-broadcasting-dialog.component";
import {BroadcastingDetailDialogComponent} from "./broadcasting-detail-dialog/broadcasting-detail-dialog.component";

export const EmergencyBroadcastingRoutes: Routes = [
  {
    path: '',
    component: EmergencyBroadcastingListComponent,
    children: [
      {
        path:'add',
        component:  EmergencyBroadcastingDialogComponent
      },
      {
        path:'detail/:id',
        component: BroadcastingDetailDialogComponent
      }
    ]

  }
];
