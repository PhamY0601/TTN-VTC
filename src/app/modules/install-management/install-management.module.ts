import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {InstallManagementRoutes} from "./install-management.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {InstallManagementComponent} from "./install-management/install-management.component";
import {InstallManagementChartComponent} from "./install-management-chart/install-management-chart.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(InstallManagementRoutes),
    SharedMaterialModule,


  ],
  declarations: [
    InstallManagementComponent,
    InstallManagementChartComponent,

  ]
})
export class InstallManagementModule {
}
