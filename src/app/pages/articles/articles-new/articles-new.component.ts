import { GoogleAuthService } from './../../../@core/services/google-auth.service';
import { JwtService } from './../../../@core/services/jwt.service';
import { environment } from './../../../../environments/environment';
import { ThemeService } from 'src/app/@core/services/theme.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Vditor from 'vditor';
// import * as SimpleMDE from 'simplemde';
// import * as SimpleMDE from 'simplemde';
// import { Element } from '@angular/compiler';

@Component({
  selector: 'app-articles-new',
  templateUrl: './articles-new.component.html',
  styleUrls: ['./articles-new.component.scss']
})
export class ArticlesNewComponent implements OnInit, AfterViewInit {

  // @ViewChild('contentDOM') contentDOM!: ElementRef;
  // simplemde!: SimpleMDE;

  vditor!: Vditor;

  // = new SimpleMDE({ element: this.contentDOM });
  isSubmit: boolean = false;

  form = this.fb.group({
    typeID: [null, [Validators.required]],
    title: [null, [Validators.required]],
    content: ['', [Validators.required]],
  });


  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private jwtService: JwtService,
    private googleAuthService: GoogleAuthService
  ) { }


  ngOnInit(): void {
    this.themeService.getThemeData({ self: 1 });

    const token = this.jwtService.getToken();
    const gtoken = this.googleAuthService.googleUser.id_token;


    this.vditor = new Vditor('vditor', {
      cdn: '/assets/packages/vditor@3.8.6',
      mode: 'wysiwyg',
      icon: "material",
      minHeight: 500,
      lang: 'zh_TW',
      toolbarConfig: {
        pin: true,
      },
      toolbar: [
        'undo', 'redo', '|',
        'headings', 'bold', 'italic', 'strike', '|',
        'line', 'quote', 'list', 'ordered-list', 'check', 'outdent', 'indent', '|',
        'code', 'inline-code', '|',
        'upload', 'link', '|',
        'table', '|',
        'edit-mode', 'both', 'preview', '|',
        'outline'
      ],
      preview: {
        actions: [],
        theme: {
          current: 'dark',
          path: '/assets/packages/vditor@3.8.6/dist/css/content-theme'
        }
      },
      cache: {
        enable: false,
      },
      upload: {
        accept: 'image/*',
        url: environment.api_url + '/File/Upload',
        max: 2 * 1024 * 1024, // 2MB
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '').
            replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '').
            replace('/\\s/g', '')
        },
        setHeaders() {
          return { gtoken: gtoken, token: token }
        },
      },
      after: () => {
        this.vditor.setTheme('dark', 'dark');
        this.vditor.setValue('Hello, Vditor + Angular!');
      }
    });




  }

  ngAfterViewInit(): void {

  }

  onSubmit() {

    this.form.get('content')?.setValue(this.vditor.getValue());

  }



}
