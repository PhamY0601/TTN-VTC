import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EmergencyBroadcastingRoutes} from "./emergency-broadcasting.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {EmergencyBroadcastingListComponent} from "./emergency-broadcasting-list/emergency-broadcasting-list.component";
import {
  EmergencyBroadcastingContentComponent, EmergencyBroadcastingDialogComponent
} from "./emergency-broadcasting-dialog/emergency-broadcasting-dialog.component";
import {
  BroadcastingDetailContentComponent,
  BroadcastingDetailDialogComponent
} from "./broadcasting-detail-dialog/broadcasting-detail-dialog.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmergencyBroadcastingRoutes),
    SharedComponentModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  declarations: [
    EmergencyBroadcastingListComponent,
    EmergencyBroadcastingContentComponent,
    EmergencyBroadcastingDialogComponent,
    BroadcastingDetailContentComponent,
    BroadcastingDetailDialogComponent
  ]
})
export class EmergencyBroadcastingModule {
}
