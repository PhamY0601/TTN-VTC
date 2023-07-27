import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {RouterModule} from "@angular/router";
import {RadioManagementRoutes} from "./radio-management.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {AreaDialogComponent, RadioManagerListComponent} from "./radio-manager-list/radio-manager-list.component";
import {
  RadioManagerContentComponent,
  RadioManagerDialogComponent
} from "./radio-manager-dialog/radio-manager-dialog.component";
import {ScheduleContentComponent, ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {SharedComponentModule} from "../../shared/component/shared-component.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    RouterModule.forChild(RadioManagementRoutes),
    SharedMaterialModule,
    PerfectScrollbarModule,
    SharedComponentModule,

  ],
    declarations: [
      RadioManagerListComponent,
      RadioManagerContentComponent,
      RadioManagerDialogComponent,
      ScheduleDialogComponent,
      ScheduleContentComponent,
      AreaDialogComponent
    ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
})
export class RadioManagementModule {
}
