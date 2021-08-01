import { SettingsService } from './../../../@core/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NoticeService } from 'src/app/@core/services/notice.service';
import { NoticeStatusEnum } from 'src/app/@core/enum/notice-status.enum';
import { CodeEnum } from 'src/app/@core/enum/code.enum';

@Component({
  selector: 'app-blog-setting',
  templateUrl: './blog-setting.component.html',
  styleUrls: ['./blog-setting.component.scss'],
})
export class BlogSettingComponent implements OnInit {

  isSubmit: boolean = false;

  form = this.fb.group({
    title: [null, Validators.required],
    status: [1]
  });


  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService,
    private noticeService: NoticeService
  ) { }


  ngOnInit(): void {


    this.settingsService.get().subscribe((data) => {
      this.form.patchValue(data);
    });

  }


  onSubmit() {

    if (this.isSubmit) return false;
    if (!this.form.valid) return false;

    this.isSubmit = true;


    this.settingsService.edit(this.form.value).subscribe((data) => {

      // console.log(data);

      if (data.code == CodeEnum.success) {
        this.noticeService.message('修改成功');
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
