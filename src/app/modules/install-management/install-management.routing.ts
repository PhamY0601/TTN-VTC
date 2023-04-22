import {Routes} from '@angular/router';
import {InstallManagementComponent} from "./install-management/install-management.component";

export const InstallManagementRoutes: Routes = [
  {
    path: '',
    component: InstallManagementComponent,
  },
  {
    path: ':district',
    component: InstallManagementComponent,
    // data: {breadcrumb: 'Quận Huyện' },
  }

];
