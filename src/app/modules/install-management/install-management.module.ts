import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {InstallManagementRoutes} from "./install-management.routing";
import {SharedMaterialModule} from "../../shared/shared-material.module";
import {InstallManagementComponent} from "./install-management/install-management.component";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import { MapDevicePositionsComponent } from './map-device-positions/map-device-positions.component';


@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    RouterModule.forChild(InstallManagementRoutes),
    SharedMaterialModule,
    LeafletModule,

  ],
  declarations: [
    InstallManagementComponent,
    MapDevicePositionsComponent
  ]
})
export class InstallManagementModule {
}
