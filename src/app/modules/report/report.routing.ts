import {Routes} from '@angular/router';
import {DailyReportComponent} from "./daily-report/daily-report.component";
import {WeeklyReportComponent} from "./weekly-report/weekly-report.component";
import {DateReportComponent} from "./date-report/date-report.component";
import {MonthlyReportComponent} from "./monthly-report/monthly-report.component";
import {YearlyReportComponent} from "./yearly-report/yearly-report.component";
import {BroadcastTimeReportComponent} from "./broadcast-time-report/broadcast-time-report.component";

export const ReportRadioContentRoutes: Routes = [
  {
    path: 'daily',
    component: DailyReportComponent,
    data: { breadcrumb: 'Hằng ngày' }
  },
  {
    path: 'weekly',
    component: WeeklyReportComponent,
    data: { breadcrumb: 'Hằng tuần' }
  },
  {
    path: 'date',
    component: DateReportComponent,
    data: { breadcrumb: 'Theo ngày' }
  },
  {
    path: 'monthly',
    component: MonthlyReportComponent,
    data: { breadcrumb: 'Theo tháng' }
  },
  {
    path: 'yearly',
    component: YearlyReportComponent,
    data: { breadcrumb: 'Theo năm' }
  },
  {
    path: 'broadcast-time',
    component: BroadcastTimeReportComponent,
    data: { breadcrumb: 'Thời lượng phát' }
  },


];
