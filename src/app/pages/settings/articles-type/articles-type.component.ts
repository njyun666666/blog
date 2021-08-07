import { NoticeService } from './../../../@core/services/notice.service';
import { SettingsService } from './../../../@core/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { ArticleTypeEditModel, ArticleTypeModel } from 'src/app/@core/models/settings/article-type.model';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { CodeEnum } from 'src/app/@core/enum/code.enum';
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum';


@Component({
  selector: 'app-articles-type',
  templateUrl: './articles-type.component.html',
  styleUrls: ['./articles-type.component.scss']
})
export class ArticlesTypeComponent implements OnInit {


  typeList: ArticleTypeModel[] = [];

  constructor(
    private settingsService: SettingsService,
    private noticeService: NoticeService
  ) { }

  ngOnInit(): void {
    this.get();
  }



  get() {
    this.settingsService.getArticleType().subscribe((data: ArticleTypeModel[]) => {
      this.typeList = data.map(x => {
        x.o_name = x.name;
        x.isEdit = false;
        x.isSubmit = false;
        return x
      });
    });
  }


  edit(type: ArticleTypeModel) {
    type.isEdit = true;
  }

  delete(type: ArticleTypeModel) {

  }

  save(type: ArticleTypeModel) {

    if (type.isSubmit) return false;
    if (type.name == null || type.name.length === 0) return false;

    type.isSubmit = true;

    const data: ArticleTypeEditModel = { id: type.id, name: type.name };
    this.settingsService.editArticleType(data).subscribe((data) => {

      if (data.code == CodeEnum.success) {
        this.noticeService.message('修改成功');

        type.o_name = type.name;
        type.isEdit = false;

      } else {
        this.noticeService.message('失敗: ' + data.message, NoticeStatusEnum.error);
      }

      type.isSubmit = false;

    },
      (error) => {
        this.noticeService.message('失敗', NoticeStatusEnum.error);
        type.isSubmit = false;
      });

    return true;
  }

  cancel(type: ArticleTypeModel) {
    type.name = type.o_name;
    type.isEdit = false;
  }


}
