import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum';

@Component({
  selector: 'app-notice-message',
  templateUrl: './notice-message.component.html',
  styleUrls: ['./notice-message.component.scss']
})
export class NoticeMessageComponent implements OnInit {

  icon: string = '';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {

    switch (data.status) {
      case NoticeStatusEnum.success:
        this.icon = 'fas fa-check';
        break;

      case NoticeStatusEnum.error:
        this.icon = 'fas fa-times';
        break;

      case NoticeStatusEnum.warn:
        this.icon = 'fas fa-exclamation';
        break;

      default:
        break;
    }

  }

  ngOnInit(): void {
  }

  close() {
    this.data.snackBar.dismiss();
  }

}
