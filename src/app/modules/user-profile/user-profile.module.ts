import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { SharedMaterialModule } from "../../shared/shared-material.module";
import { SharedComponentModule } from "../../shared/component/shared-component.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserProfileRoutes } from "./user-profile.routing";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

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
    RouterModule.forChild(UserProfileRoutes),
    SharedComponentModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    UserProfileComponent
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class UserProfileModule {
}
