import { NgModule } from "@angular/core";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {MatSortModule} from "@angular/material/sort";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialogModule} from "@angular/material/dialog";
import {MatNativeDateModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule} from "@angular/forms";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatBadgeModule} from "@angular/material/badge";
import {MatTreeModule} from "@angular/material/tree";
import {ClipboardModule} from "@angular/cdk/clipboard";



@NgModule({
  exports: [
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    FlexModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
    MatTreeModule,
    ClipboardModule
  ]
})
export class SharedMaterialModule {}
