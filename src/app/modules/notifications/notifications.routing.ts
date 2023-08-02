import { Routes } from '@angular/router';
import { NotificationsComponent } from "./notifications/notifications.component";


export const NotificationsRoutes: Routes = [
  {
    path: '',
    component:NotificationsComponent,
    data: {breadcrumb: 'Thông báo' },
  }

];
