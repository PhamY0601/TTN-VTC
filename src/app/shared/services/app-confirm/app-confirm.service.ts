import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';

import { AppComfirmComponent } from './app-confirm.component';

interface confirmData {
  title?: string,
  message?: string
}

@Injectable()
export class AppConfirmService {

  constructor(private dialog: MatDialog) { }

  public confirm(data: confirmData = {}): Observable<boolean> {
    data.title = data.title || 'Xác nhận';
    data.message = data.message || 'Bạn có chắc chắn?';
    let dialogRef: MatDialogRef<AppComfirmComponent>;
    dialogRef = this.dialog.open(AppComfirmComponent, {
      width: '380px',
      disableClose: true,
      data: {title: data.title, message: data.message}
    });
    return dialogRef.afterClosed();
  }
}
