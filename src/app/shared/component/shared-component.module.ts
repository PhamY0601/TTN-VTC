import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SharedMaterialModule} from "../shared-material.module";
import {RouterModule} from "@angular/router";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {BreadcrumbModule} from "xng-breadcrumb";
import {NgxSpinnerModule} from "ngx-spinner";

import {HeaderComponent} from "./header/header.component";
import {SidenavComponent} from "./sidenav/sidenav.component";
import {OverviewCardComponent} from "./overview-card/overview-card.component";
import {NewsCardComponent} from "./news-card/news-card.component";
import {AvatarComponent} from "./avatar/avatar.component";
import {ContentCardComponent} from "./content-card/content-card.component";
import {FooterComponent} from "./footer/footer.component";
import {AdminLayoutComponent} from "./admin-layout/admin-layout.component";
import {MapComponent} from "./map/map.component";
import {ReplaceStrPipe} from "../pipes/replace-str.pipe";


// const components = [
//   HeaderComponent,
//   SidenavComponent,
//   OverviewCardComponent,
//   NewsCardComponent,
//   AvatarComponent,
//   ContentCardComponent,
//   FooterComponent,
//   AdminLayoutComponent,
//   MapComponent,
//   ReplaceStrPipe
// ];

@NgModule({
    declarations: [
      HeaderComponent,
      SidenavComponent,
      OverviewCardComponent,
      NewsCardComponent,
      AvatarComponent,
      ContentCardComponent,
      FooterComponent,
      AdminLayoutComponent,
      MapComponent,
      ReplaceStrPipe
    ],
    imports: [
        CommonModule,
        SharedMaterialModule,
        RouterModule,
        // NgChartsModule,

        PerfectScrollbarModule,
        BreadcrumbModule,
        NgxSpinnerModule,
    ],
    exports: [
      HeaderComponent,
      SidenavComponent,
      OverviewCardComponent,
      NewsCardComponent,
      AvatarComponent,
      ContentCardComponent,
      FooterComponent,
      AdminLayoutComponent,
      MapComponent,
      ReplaceStrPipe
    ],

})
export class SharedComponentModule {
}
