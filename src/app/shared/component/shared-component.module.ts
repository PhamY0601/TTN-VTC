import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedMaterialModule } from "../shared-material.module";
import { RouterModule } from "@angular/router";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { BreadcrumbModule } from "xng-breadcrumb";
import { NgxSpinnerModule } from "ngx-spinner";

import { HeaderComponent } from "./header/header.component";
import { SidenavComponent } from "./sidenav/sidenav.component";
import { OverviewCardComponent } from "./overview-card/overview-card.component";
import { AvatarComponent } from "./avatar/avatar.component";
import {ContentCardComponent } from "./content-card/content-card.component";
import { FooterComponent } from "./footer/footer.component";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { MapComponent } from "./map/map.component";
import { ReplaceStrPipe } from "../pipes/replace-str.pipe";
import {
  ChangePasswordFormContentComponent,
  ChangePasswordFormDialogComponent
} from "./change-password-form-dialog/change-password-form-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppComfirmComponent } from "../services/app-confirm/app-confirm.component";
import { AppConfirmService } from "../services/app-confirm/app-confirm.service";
import { SeeMoreComponent } from './see-more/see-more.component';
import { DevicesMenuComponent } from './devices-menu/devices-menu.component';
import { NewsCardComponent, NewsCardDialogComponent } from "./news-card/news-card.component";


const components = [
  HeaderComponent,
  SidenavComponent,
  OverviewCardComponent,
  NewsCardComponent,
  NewsCardDialogComponent,
  AvatarComponent,
  ContentCardComponent,
  FooterComponent,
  AdminLayoutComponent,
  MapComponent,
  ReplaceStrPipe,
  ChangePasswordFormContentComponent,
  ChangePasswordFormDialogComponent,
  AppComfirmComponent,
  SeeMoreComponent,

];

@NgModule({
  declarations: [
    ...components,
    DevicesMenuComponent,
  ],
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    PerfectScrollbarModule,
    BreadcrumbModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
  ],
    exports: [
        ...components,

    ],
  providers: [AppConfirmService]
})
export class SharedComponentModule {
}
