import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-article-type-label',
  templateUrl: './article-type-label.component.html',
  styleUrls: ['./article-type-label.component.scss']
})
export class ArticleTypeLabelComponent implements OnInit {

  @Input() in_status: number = 1;
  @Input() in_typeID: number = 0;
  @Input() in_typeName: string = '';
  @Input() in_account: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
