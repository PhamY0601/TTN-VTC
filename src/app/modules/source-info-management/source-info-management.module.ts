import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SourceInfoManagementRoutes} from "./source-info-management.routing";
import {
  AudioDialogComponent,
  FieldSourceListComponent
} from "./source-info-management/field-source/field-source-list/field-source-list.component";
import {GeographicSourceListComponent} from "./source-info-management/geographic-source/geographic-source-list/geographic-source-list.component";
import {ScheduleContentComponent, ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import {
  FieldSourceContentComponent, FieldSourceDialogComponent
} from "./source-info-management/field-source/field-source-dialog/field-source-dialog.component";
import {
  GeographicSourceContentComponent, GeographicSourceDialogComponent
} from "./source-info-management/geographic-source/geographic-source-dialog/geographic-source-dialog.component";
import {ClipboardModule} from "@angular/cdk/clipboard";



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
    RouterModule.forChild(SourceInfoManagementRoutes),
    SharedComponentModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,

  ],
  declarations: [
    FieldSourceListComponent,
    GeographicSourceListComponent,
    ScheduleContentComponent,
    ScheduleDialogComponent,
    FieldSourceContentComponent,
    FieldSourceDialogComponent,
    GeographicSourceContentComponent,
    GeographicSourceDialogComponent,
    AudioDialogComponent,
    AudioDialogComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SourceInfoManagementModule {
}
