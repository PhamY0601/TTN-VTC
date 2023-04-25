import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdvertisingCalendarRoutes} from "./advertising-calendar.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import { AdvertisingCalendarListComponent } from './advertising-calendar-list/advertising-calendar-list.component';


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(AdvertisingCalendarRoutes),
    SharedMaterialModule,
  ],
  exports: [],
  declarations: [
    AdvertisingCalendarListComponent
  ]
})
export class AdvertisingCalendarModule {
}
