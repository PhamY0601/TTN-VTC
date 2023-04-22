import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SessionsRoutes} from "./sessions.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LogInComponent} from "./log-in/log-in.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SessionsRoutes),
    SharedComponentModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  declarations: [
    LogInComponent
  ]
})
export class SessionsModule {
}
