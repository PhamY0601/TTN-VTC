import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {WarningContentRoutes} from "./warning-content.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import { WarningContentListComponent } from './warning-content-list/warning-content-list.component';
import {
  WarningContentComponent,
  WarningContentDialogComponent
} from "./warning-content-dialog/warning-content-dialog.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(WarningContentRoutes),
    SharedComponentModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  declarations: [
    WarningContentListComponent,
    WarningContentComponent,
    WarningContentDialogComponent
  ]
})
export class WarningContentModule {
}
