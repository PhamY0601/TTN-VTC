import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DashboardRoutes} from "./dashboard.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(DashboardRoutes),
    SharedMaterialModule,
    NgxSpinnerModule,
    MatDividerModule,
  ],
  exports: [
    DashboardComponent
  ],
  declarations: [
    DashboardComponent
  ]
})
export class DashboardModule {
}
