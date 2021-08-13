import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from 'src/app/@core/models/dialog.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  model: DialogModel = {
    title: '',
    content: '',
    buttonText: '確定',
    buttonColor: 'primary',
    showCancelBtn: true
  };


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel
  ) { }

  ngOnInit(): void {
    // console.log(this.data);

    this.model = Object.assign(this.model, this.data);


  }

}
