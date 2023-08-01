import { Routes } from '@angular/router';
import { UserProfileComponent } from "./user-profile/user-profile.component";

export const UserProfileRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    data: {breadcrumb: 'Trang cá nhân' },
  },

];
