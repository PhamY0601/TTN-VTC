import {Routes} from '@angular/router';
import {InstallManagementComponent} from "./install-management/install-management.component";



export const InstallManagementRoutes: Routes = [
  {
    path: '',
    component:InstallManagementComponent,
    data: {breadcrumb: 'Quản lý lắp đặt' },
  },

  {
    path: ':district',
    component: InstallManagementComponent,
    // data: {breadcrumb: 'Quận Huyện' },
  },

];
