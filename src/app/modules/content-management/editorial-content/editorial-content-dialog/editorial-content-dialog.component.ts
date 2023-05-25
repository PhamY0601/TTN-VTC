import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {COUNTRY, currentTime} from "../../../../app.constants";
import {CitiesService} from "../../../../shared/services/cities.service";


@Component({
  selector: 'editorial-content-dialog-component',
  templateUrl: './editorial-content-dialog.component.html',
  styleUrls: ['./editorial-content-dialog.component.scss']
})
export class EditorialContentComponent implements OnInit {
  data: any;
  isSaving = false;
  districtsData: any[] = [];
  wardsData: any[] = [];
  toDay = new Date();
  currentTime: any;

  constructor(
    // private eventManager: JhiEventManager,
    private formBuilder: FormBuilder,
    private citiesService$: CitiesService,
    public dialogRef: MatDialogRef<EditorialContentComponent>,
  ) {
  }

  ngOnInit(): void {
    this.getDistrict(COUNTRY());
    this.currentTime = currentTime;
  }

  save() {
    console.log(this.data)
  }

  getDistrict(city: any) {
    this.citiesService$.getDistricts(city).subscribe((data) => {
      this.districtsData = data;
    })
  }


  private onSaveSuccess(): void {
    // this.eventManager.broadcast({
    //   name: 'radioManagerModified',
    //   content: '',
    // });
    this.dialogRef.close(true);
  }

  private onSaveError() {
    this.isSaving = false;
  }


}

@Component({
  selector: 'editorial-content-dialog-component',
  template: '',
})
export class EditorialContentDialogComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<EditorialContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {

    this.activatedRoute.data.subscribe(({data}: Data) => {
      this.dialogRef = this.dialog.open(EditorialContentComponent, {
        width: '800px',
      });
      this.dialogRef.componentInstance.data = data;
      this.dialogRef.afterClosed().subscribe(
        () => this.previousState(),
        () => this.previousState());
    });


  }

  previousState(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {},
      queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy(): void {
    this.dialogRef = undefined;
  }

}
