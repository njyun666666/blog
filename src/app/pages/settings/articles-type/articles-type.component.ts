import { ThemeService } from 'src/app/@core/services/theme.service'
import { DialogService } from './../../../@core/services/dialog.service'
import { NoticeService } from './../../../@core/services/notice.service'
import { SettingsService } from './../../../@core/services/settings.service'
import { Component, OnInit } from '@angular/core'
import { ArticleTypeDeleteModel, ArticleTypeEditModel, ArticleTypeFormModel, ArticleTypeModel, ArticleTypeSortModel } from 'src/app/@core/models/settings/article-type.model'
import { Subject } from 'rxjs'
import { EventEmitter } from '@angular/core'
import { ReturnCodeEnum } from 'src/app/@core/enum/return-code.enum'
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum'
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component'
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { ReturnModel } from 'src/app/@core/models/return.model'


@Component({
  selector: 'app-articles-type',
  templateUrl: './articles-type.component.html',
  styleUrls: ['./articles-type.component.scss']
})
export class ArticlesTypeComponent implements OnInit {


  typeList: ArticleTypeFormModel[] = [];

  constructor(
    private settingsService: SettingsService,
    private noticeService: NoticeService,
    private dialog: MatDialog,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.get()
  }

  getThemeData(): void {
    this.themeService.getThemeData({ self: 1 });
  }


  get() {
    this.settingsService.getArticleType().subscribe((data: ArticleTypeModel[]) => {
      this.typeList = data.map(x => {
        return {
          id: x.id,
          name: x.name,
          o_name: x.name,
          isEdit: false,
          isSubmit: false
        } as ArticleTypeFormModel
      });
    });

    this.getThemeData();
  }


  edit(type: ArticleTypeFormModel) {
    type.isEdit = true
  }

  delete(type: ArticleTypeFormModel) {

    const dialogRef = this.dialog.open(DialogComponent, {
      minWidth: 300,
      data: {
        content: '?????? ' + type.name + ' ????',
        buttonText: '??????',
        buttonColor: 'warn'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);

      if (result) {

        const data: ArticleTypeDeleteModel = { id: type.id }

        this.settingsService.deleteArticleType(data).subscribe((data: ReturnModel<any>) => {

          if (data.code == ReturnCodeEnum.success) {
            this.noticeService.message('?????????', NoticeStatusEnum.success)

            this.get();

          } else {
            this.noticeService.message('??????: ' + data.message, NoticeStatusEnum.error)
          }

        },
          (error) => {
            this.noticeService.message('??????', NoticeStatusEnum.error)

          })

      }

    })


  }

  save(type: ArticleTypeFormModel) {

    if (type.isSubmit) return false
    if (type.name == null || type.name.length === 0) return false

    type.isSubmit = true

    const data: ArticleTypeEditModel = { id: type.id, name: type.name }
    this.settingsService.editArticleType(data).subscribe((data: ReturnModel<any>) => {

      if (data.code == ReturnCodeEnum.success) {
        this.noticeService.message('????????????', NoticeStatusEnum.success)

        type.o_name = type.name;
        type.isEdit = false;

        this.getThemeData();

      } else {
        this.noticeService.message('??????: ' + data.message, NoticeStatusEnum.error)
      }

      type.isSubmit = false

    },
      (error) => {
        this.noticeService.message('??????', NoticeStatusEnum.error)
        type.isSubmit = false
      })

    return true
  }

  cancel(type: ArticleTypeFormModel) {
    type.name = type.o_name as string;
    type.isEdit = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log(event);
    if (event.previousIndex !== event.currentIndex) {

      moveItemInArray(this.typeList, event.previousIndex, event.currentIndex)

      const data: ArticleTypeSortModel = { ids: this.typeList.map(x => x.id) }

      this.settingsService.editArticleTypeSort(data).subscribe((data: ReturnModel<any>) => {

        if (data.code == ReturnCodeEnum.success) {
          this.noticeService.message('????????????', NoticeStatusEnum.success);
          this.getThemeData();
        } else {
          this.noticeService.message('??????: ' + data.message, NoticeStatusEnum.error);
        }

      },
        (error) => {
          this.noticeService.message('??????', NoticeStatusEnum.error);
        })
    }

  }

}
