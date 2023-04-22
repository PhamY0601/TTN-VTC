import {Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";
import {CitiesService} from "../../../shared/services/cities.service";
import {COUNTRY} from "../../../app.constants";

@Component({
  selector: 'emergency-broadcasting-component',
  templateUrl: './emergency-broadcasting-dialog.component.html',
  styleUrls: ['./emergency-broadcasting-dialog.component.scss']
})
export class EmergencyBroadcastingContentComponent implements OnInit {
  @ViewChild('figAudio') figAudio!: ElementRef;
  data: any;
  isSaving = false;
  districtsData: any[] = [];
  wardsData: any[] = [];
  transmitterData = ['#01', '#02', '#03', '#04', '#05'];
  libraryData = ['Thư viện 1', 'Thư viện 2', 'Thư viện 3', 'Thư viện 4', 'Thư viện 5'];
  audSrc: any;
  //store [{district,wards}]
  selected: any;
  sourceData = {
    name: 'Nguồn phát',
    completed: false,
    value: '10',
    subtasks: [
      {name: 'Transmitter', completed: false, value: 1},
      {name: 'Thư viện', completed: false, value: 2},
      {name: 'File âm thanh', completed: false, value: 3},
      {name: 'Tiếp âm', completed: false, value: 4},
    ],
  };

  constructor(
    // private eventManager: JhiEventManager,
    private formBuilder: FormBuilder,
    private citiesService$: CitiesService,
    public dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent>,
  ) { }

  ngOnInit(): void {
    this.getDistrict(COUNTRY())
  }

  save() {
    console.log(this.data)
  }
  getDistrict(city: any) {
    this.citiesService$.getDistricts(city).subscribe((data) => {
      this.districtsData = data;
    })
  }

  districtEffect(event: any): void {
    this.wardsData = [];
    this.citiesService$.getWards(event.value).subscribe((data) => {
      this.wardsData = data
    })
  }

  onFileSelected(event:any) {
    if (event.target.files && event.target.files[0]) {
      const audSrc = URL.createObjectURL(event.target.files[0]);
      this.audSrc = audSrc;

    }
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

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.sourceData.subtasks != null && this.sourceData.subtasks.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.sourceData.subtasks == null) {
      return false;
    }
    return this.sourceData.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    console.log(completed)
    this.allComplete = completed;
    if (this.sourceData.subtasks == null) {
      return;
    }
    this.sourceData.subtasks.forEach(t => (t.completed = completed));
  }

  test(event: any) {
   this.selected = event.value
  }
}

@Component({
  selector: 'warning-dialog-component',
  template: '',
})
export class EmergencyBroadcastingDialogComponent implements OnInit, OnDestroy {


  private dialogRef: MatDialogRef<EmergencyBroadcastingContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {

      this.dialogRef = this.dialog.open(EmergencyBroadcastingContentComponent, {
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
