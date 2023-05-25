import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../../../shared/services/cities.service";
import { currentTime } from 'src/app/app.constants';


@Component({
  selector: 'field-source-dialog-component',
  templateUrl: './field-source-dialog.component.html',
  styleUrls: ['./field-source-dialog.component.scss']
})
export class FieldSourceContentComponent implements OnInit {
  data: any;
  isSaving = false;
  districtsData: any[] = [];
  wardsData: any[] = [];
  toDay = new Date();
  formData!: FormGroup;
  content = {
    hour_from: '',
    hour_to: '',
    content: ''
  }
  currentTime:any;

  constructor(
    private formBuilder: FormBuilder,
    private citiesService$: CitiesService,
    public dialogRef: MatDialogRef<FieldSourceContentComponent>,
  ) {
    this.formData = this.formBuilder.group({
      date: '',
      field: '',
      start_time: '',
      end_time: '',
      type: '',
      content: this.formBuilder.array([])
    })
  }

  ngOnInit(): void {
    this.currentTime = currentTime;
  }

  save() {
    console.log(this.data)
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

  get value() {
    return this.formData?.get('content') as FormArray
  }

  createLessons(item: any): FormGroup {
    return this.formBuilder.group({
      hour_from: [item.hour_from],
      hour_to: [item.hour_to],
      content: [item.content],
    });
  }


  addLessons(): void {
    this.value.push(this.createLessons(this.content));
  }

  deleteLesson(lessonIndex: any) {
    this.value.removeAt(lessonIndex);
  }


}

@Component({
  selector: 'field-source-dialog-component',
  template: '',
})
export class FieldSourceDialogComponent implements OnInit, OnDestroy {

  private dialogRef: MatDialogRef<FieldSourceContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {

      this.dialogRef = this.dialog.open(FieldSourceContentComponent, {
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
