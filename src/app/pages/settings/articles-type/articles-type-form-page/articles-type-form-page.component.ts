import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ArticleTypeModel } from 'src/app/@core/models/settings/article-type.model';

@Component({
  selector: 'app-articles-type-form-page',
  templateUrl: './articles-type-form-page.component.html',
  styleUrls: ['./articles-type-form-page.component.scss']
})
export class ArticlesTypeFormPageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ArticlesTypeFormPageComponent>,
  ) { }

  ngOnInit(): void {


  }

  get(data: ArticleTypeModel) {
    // console.log('ArticlesTypeFormPageComponent', data);
    this.dialogRef.close(data);
  }

}
