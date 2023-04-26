import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportRadioContentRoutes} from "./report.routing";
import {RouterModule} from "@angular/router";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {DailyReportComponent} from "./daily-report/daily-report.component";
import {ReadioStreamingTableComponent} from "./readio-streaming-table/readio-streaming-table.component";
import {MediaTableComponent} from "./media-table/media-table.component";
import {EquipmentTableComponent} from "./equipment-table/equipment-table.component";
import {InstallationActivityTableComponent} from "./installation-activity-table/installation-activity-table.component";
import {WeeklyReportComponent} from "./weekly-report/weekly-report.component";
import {DateReportComponent} from "./date-report/date-report.component";
import {MonthlyReportComponent} from "./monthly-report/monthly-report.component";
import {YearlyReportComponent} from "./yearly-report/yearly-report.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {BroadcastTimeReportComponent} from './broadcast-time-report/broadcast-time-report.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import { WarningContentTableComponent } from './warning-content-table/warning-content-table.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ReportRadioContentRoutes),
    SharedComponentModule,
    SharedMaterialModule,
  ],
  declarations: [
    DailyReportComponent,
    ReadioStreamingTableComponent,
    MediaTableComponent,
    EquipmentTableComponent,
    InstallationActivityTableComponent,
    WeeklyReportComponent,
    DateReportComponent,
    MonthlyReportComponent,
    YearlyReportComponent,
    BroadcastTimeReportComponent,
    WarningContentTableComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},

  ],
})
export class ReportModule {
}
