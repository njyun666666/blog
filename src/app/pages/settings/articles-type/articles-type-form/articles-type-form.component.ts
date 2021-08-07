import { NoticeService } from './../../../../@core/services/notice.service';
import { SettingsService } from './../../../../@core/services/settings.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CodeEnum } from 'src/app/@core/enum/code.enum';
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum';

@Component({
  selector: 'app-articles-type-form',
  templateUrl: './articles-type-form.component.html',
  styleUrls: ['./articles-type-form.component.scss']
})
export class ArticlesTypeFormComponent implements OnInit {

  @Output() getEmitter = new EventEmitter();

  isSubmit: boolean = false;

  form = this.fb.group({
    name: [null, Validators.required]
  })

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }


  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private noticeService: NoticeService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.isSubmit) return false;
    if (!this.form.valid) return false;

    this.isSubmit = true;


    this.settingsService.addArticleType(this.form.value).subscribe((data) => {

      // console.log(data);

      if (data.code == CodeEnum.success) {
        this.noticeService.message('新增成功');

        this.getEmitter.emit();

      } else {
        this.noticeService.message('失敗: ' + data.message, NoticeStatusEnum.error);
      }

      this.isSubmit = false;
    },
      (error) => {
        this.noticeService.message('失敗', NoticeStatusEnum.error);
        this.isSubmit = false;
      });

    return true;
  }

}