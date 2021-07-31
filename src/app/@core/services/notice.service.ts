import { NoticeMessageComponent } from './../../shared/components/notice-message/notice-message.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoticeStatusEnum } from '../enum/notice-status.enum';

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  constructor(
    private snackBar: MatSnackBar
  ) { }


  message(message: string, status?: NoticeStatusEnum) {
    this.snackBar.openFromComponent(NoticeMessageComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
      data: { message, status, snackBar: this.snackBar }
    });
  }


}
