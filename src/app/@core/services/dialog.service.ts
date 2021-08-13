import { DialogModel } from './../models/dialog.model';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) { }

  text(data: DialogModel) {
    data.showCancelBtn = false;

    this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: data
    });

  }

}
