import { NoticeMessageComponent } from './../../shared/components/notice-message/notice-message.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeStatusEnum } from '../enum/notice-status.enum';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }


  message(message: string, status?: NoticeStatusEnum) {
    this._snackBar.openFromComponent(NoticeMessageComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1000,
      data: { message, status }
    });
  }


}
