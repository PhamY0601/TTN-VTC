import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "./shared/component/admin-layout/admin-layout.component";
import {AuthGuard} from "./shared/auth/auth.guard";
import {
  ChangePasswordFormDialogComponent
} from "./shared/component/change-password-form-dialog/change-password-form-dialog.component";

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { breadcrumb: 'Tổng quan' },
      },
      {
        path: 'install-management',
        loadChildren: () => import('./modules/install-management/install-management.module').then(m => m.InstallManagementModule),
        data: { breadcrumb: 'Quản lý lắp đặt' },
      },
      {
        path: 'source-info-management',
        loadChildren: () => import('./modules/source-info-management/source-info-management.module').then(m => m.SourceInfoManagementModule),
        data: { breadcrumb: 'Quản lý URI-TTN',  disable: true  }
      },
      {
        path: 'radio-management',
        loadChildren: () => import('./modules/radio-manager/radio-management.module').then(m => m.RadioManagementModule),
        data: { breadcrumb: 'Quản lý lịch phát thanh' }
      },
      {
        path: 'report',
        loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule),
        data: { breadcrumb: 'Báo cáo' }
      },
      {
        path: 'content-management',
        loadChildren: () => import('./modules/content-management/content-management.module').then(m => m.ContentManagementModule),
        data: { breadcrumb: 'Quản lý nội dung' }
      },
      {
        path: 'emergency-broadcasting',
        loadChildren: () => import('./modules/emergency-broadcasting/emergency-broadcasting.module').then(m => m.EmergencyBroadcastingModule),
        data: { breadcrumb: 'Phát thanh khẩn cấp' }
      },
      {
        path: 'advertising-calendar',
        loadChildren: () => import('./modules/advertising-calendar/advertising-calendar.module').then(m => m.AdvertisingCalendarModule),
        data: { breadcrumb: 'Lịch quảng bá' }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./modules/sessions/sessions.module').then(m => m.SessionsModule),

      }
    ]
  },
  {
    path: 'change-password',
    component: ChangePasswordFormDialogComponent,
    outlet: 'popup'
  },
]

