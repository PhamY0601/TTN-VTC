import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mtg-change-password-form-dialog',
  templateUrl: './change-password-form-dialog.component.html',
  styleUrls: ['./change-password-form-dialog.component.scss'],
})
export class ChangePasswordFormContentComponent implements OnInit {
  changePasswordForm: FormGroup;
  isSaving = false;
  hide1 = true;
  hide2 = true;
  hide3 = true;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordFormContentComponent>,
  ) {
    this.changePasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  save() {
    console.log(this.changePasswordForm.value)

  }

  private onSaveSuccess(): void {
    this.dialogRef.close(true);
  }

  private onSaveError() {
    this.isSaving = false;
  }

  confirmPassword() {
    if (this.changePasswordForm.controls['new_password'].value === this.changePasswordForm.controls['confirm_password'].value) {
      this.changePasswordForm.controls['confirm_password'].setErrors(null);
    } else {
      this.changePasswordForm.controls['confirm_password'].setErrors({mismatch: true});
    }
  }

  comparePassword() {
    if (this.changePasswordForm.controls['password'].value === this.changePasswordForm.controls['new_password'].value) {
      this.changePasswordForm.controls['new_password'].setErrors({notEqual: true});
    }
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  selector: 'app-change-password-form-dialog',
  template: '',
})
export class ChangePasswordFormDialogComponent implements OnInit, OnDestroy {

  private dialogRef?: MatDialogRef<ChangePasswordFormContentComponent, any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,


  ) {
  }

  ngOnInit() {
    this.dialogRef = this.dialog.open(ChangePasswordFormContentComponent, {
      disableClose: true,
      width: '500px'
    });
    this.dialogRef.afterClosed().subscribe(
      () => this.previousState(),
      () => this.previousState());

  }

  previousState(){
    this.router.navigate([{ outlets: { popup: null } }]);
  }

  ngOnDestroy(): void {
    // this.dialogRef = undefined;
  }
}
