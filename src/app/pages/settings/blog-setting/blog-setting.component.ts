import { SettingsService } from './../../../@core/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-blog-setting',
  templateUrl: './blog-setting.component.html',
  styleUrls: ['./blog-setting.component.scss']
})
export class BlogSettingComponent implements OnInit {

  form = new FormGroup({
    title: new FormControl(null),
    status: new FormControl(1)
  });

  constructor(
    private fb: FormBuilder,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {

    this.settingsService.getSetting().subscribe((data) => {
      this.form.patchValue(data);
    });

  }

}
