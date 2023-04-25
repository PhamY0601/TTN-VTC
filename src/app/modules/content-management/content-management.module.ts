import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";

import {SharedMaterialModule} from "../../shared/shared-material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedComponentModule} from "../../shared/component/shared-component.module";
import {ContentManagementRoutes} from "./content-management.routing";
import {WarningContentListComponent} from "./warning-content/warning-content-list/warning-content-list.component";
import {
  WarningContentComponent,
  WarningContentDialogComponent
} from "./warning-content/warning-content-dialog/warning-content-dialog.component";
import {RegistrationContentComponent} from "./registration-content/registration-content.component";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface} from "ngx-perfect-scrollbar";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";
import { EditorialContentComponent } from './editorial-content/editorial-content.component';



export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ContentManagementRoutes),
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
    WarningContentDialogComponent,
    RegistrationContentComponent,
    EditorialContentComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ContentManagementModule {
}
