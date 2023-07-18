import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from "@angular/material/icon";

import { rootRouterConfig } from "./app.routing";
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import { HttpClientModule } from '@angular/common/http';
import { FlexModule } from '@angular/flex-layout';
import {NgxSpinnerModule} from "ngx-spinner";
import {RouterModule} from "@angular/router";
import {BreadcrumbModule} from "xng-breadcrumb";
import {SharedComponentModule} from "./shared/component/shared-component.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexModule,
    RouterModule.forRoot(rootRouterConfig),
    PerfectScrollbarModule,
    BreadcrumbModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    SharedComponentModule,
    LeafletModule
  ],
  providers: [
    MatIconRegistry,
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  exports: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
