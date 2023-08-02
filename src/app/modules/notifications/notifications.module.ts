import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { NotificationsRoutes } from "./notifications.routing";
import { SharedMaterialModule } from "../../shared/shared-material.module";
import { SharedComponentModule } from "../../shared/component/shared-component.module";
import { NotificationsComponent } from "./notifications/notifications.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";




@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(NotificationsRoutes),
    SharedMaterialModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,

  ],
  declarations: [
    NotificationsComponent
  ]
})
export class NotificationsModule {
}
