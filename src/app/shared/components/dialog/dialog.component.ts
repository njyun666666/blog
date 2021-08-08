import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  content: string;
  button: 'accent' | 'warn';
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title: string = '';
  content: string = '';
  buttonText: string = '確認';
  buttonColor: string = 'accent';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.title = this.data.title;
    this.content = this.data.content;

    switch (this.data.button) {
      case 'accent':
        this.buttonText = '確認';
        this.buttonColor = 'accent';
        break;
      case 'warn':
        this.buttonText = '刪除';
        this.buttonColor = 'warn';
        break;

      default:

        break;
    };
  }

}
