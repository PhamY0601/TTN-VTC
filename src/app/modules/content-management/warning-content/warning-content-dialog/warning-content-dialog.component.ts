import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Data, Router} from "@angular/router";

@Component({
  selector: 'warning-content-component',
  templateUrl: './warning-content-dialog.component.html',
  styleUrls: ['./warning-content-dialog.component.scss']
})
export class WarningContentComponent implements OnInit {
  data: any;
  isSaving = false;
  levelData = [
    {
      name:'Chọn mức cảnh báo',
      pause: false
    },
    {
      name: 'Mức 1',
      pause: false
    },
    {
      name: 'Mức 2',
      pause: false
    },
    {
      name: 'Mức 3',
      pause: false
    },
    {
      name: 'Mức 4',
      pause: false
    }
  ]
  methodData = ['Chọn phương thức','SMS', 'Email' ]
  receiverData = ['Chọn nơi nhận', 'Cấp huỵện', 'Cấp xã']

  constructor(
    // private eventManager: JhiEventManager,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WarningContentComponent>,
  ) {
  }

  ngOnInit(): void {
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
}

@Component({
  selector: 'warning-dialog-component',
  template: '',
})
export class WarningContentDialogComponent implements OnInit, OnDestroy {


  private dialogRef: MatDialogRef<WarningContentComponent> | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({data}: Data) => {

      this.dialogRef = this.dialog.open(WarningContentComponent, {
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
