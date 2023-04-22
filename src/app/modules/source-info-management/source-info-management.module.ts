import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {SourceInfoManagementRoutes} from "./source-info-management.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FieldSourceComponent} from "./source-info-management/field-source/field-source.component";
import {GeographicSourceComponent} from "./source-info-management/geographic-source/geographic-source.component";
import {ScheduleContentComponent, ScheduleDialogComponent} from "./schedule-dialog/schedule-dialog.component";
import {ScheduleContent2Component, ScheduleDialog2Component} from "./schedule-dialog2/schedule-dialog2.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SourceInfoManagementRoutes),
      SharedComponentModule,
        SharedMaterialModule,
    ],
    declarations: [
      FieldSourceComponent,
      GeographicSourceComponent,
      ScheduleContentComponent,
      ScheduleDialogComponent,
      ScheduleContent2Component,
      ScheduleDialog2Component,
    ]
})
export class SourceInfoManagementModule {
}
