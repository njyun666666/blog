import { NoticeService } from './../../../@core/services/notice.service';
import { SettingsService } from './../../../@core/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { ArticleTypeEditModel, ArticleTypeModel, ArticleTypeSortModel } from 'src/app/@core/models/settings/article-type.model';
import { Subject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { ReturnCodeEnum } from 'src/app/@core/enum/return-code.enum';
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReturnModel } from 'src/app/@core/models/return.model';


@Component({
  selector: 'app-articles-type',
  templateUrl: './articles-type.component.html',
  styleUrls: ['./articles-type.component.scss']
})
export class ArticlesTypeComponent implements OnInit {


  typeList: ArticleTypeModel[] = [];

  constructor(
    private settingsService: SettingsService,
    private noticeService: NoticeService,
    private dialog: MatDialog
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

    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: {
        content: '刪除 ' + type.name + ' 嗎?',
        button: 'warn'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);

      if (result) {

        const data = { id: type.id };

        this.settingsService.deleteArticleType(data).subscribe((data: ReturnModel) => {

          if (data.code == ReturnCodeEnum.success) {
            this.noticeService.message('已刪除', NoticeStatusEnum.success);

            this.get();

          } else {
            this.noticeService.message('失敗: ' + data.message, NoticeStatusEnum.error);
          }

        },
          (error) => {
            this.noticeService.message('失敗', NoticeStatusEnum.error);

          });

      }

    });


  }

  save(type: ArticleTypeModel) {

    if (type.isSubmit) return false;
    if (type.name == null || type.name.length === 0) return false;

    type.isSubmit = true;

    const data: ArticleTypeEditModel = { id: type.id, name: type.name };
    this.settingsService.editArticleType(data).subscribe((data: ReturnModel) => {

      if (data.code == ReturnCodeEnum.success) {
        this.noticeService.message('修改成功', NoticeStatusEnum.success);

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

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    moveItemInArray(this.typeList, event.previousIndex, event.currentIndex);

    // console.log(this.typeList.map(x => x.id));

    const data: ArticleTypeSortModel = { ids: this.typeList.map(x => x.id) };

    this.settingsService.editArticleTypeSort(data).subscribe((data: ReturnModel) => {

      if (data.code == ReturnCodeEnum.success) {
        this.noticeService.message('修改成功', NoticeStatusEnum.success);

      } else {
        this.noticeService.message('失敗: ' + data.message, NoticeStatusEnum.error);
      }

    },
      (error) => {
        this.noticeService.message('失敗', NoticeStatusEnum.error);
      });
  }

}
