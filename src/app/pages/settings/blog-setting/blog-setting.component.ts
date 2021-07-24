import { SettingsService } from './../../../@core/services/settings.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-setting',
  templateUrl: './blog-setting.component.html',
  styleUrls: ['./blog-setting.component.scss']
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
    private settingsService: SettingsService
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

      console.log(data);
      this.isSubmit = false;
    },
      (error) => {
        console.log('error', error);
        this.isSubmit = false;
      });

    return true;
  }

}
