import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {DashboardRoutes} from "./dashboard.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(DashboardRoutes),
    SharedMaterialModule,
    NgxSpinnerModule,

  ],
  exports: [
    DashboardComponent
  ],
  declarations: [
    DashboardComponent,
    PieChartComponent,
  ]
})
export class DashboardModule {
}
