import { ArticleService } from './../../../@core/services/article.service';
import { ArticleTypeModel } from './../../../@core/models/settings/article-type.model';
import { SettingsService } from './../../../@core/services/settings.service';
import { GoogleAuthService } from './../../../@core/services/google-auth.service';
import { JwtService } from './../../../@core/services/jwt.service';
import { environment } from './../../../../environments/environment';
import { ThemeService } from 'src/app/@core/services/theme.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import Vditor from 'vditor';
import { MatDialog } from '@angular/material/dialog';
import { ArticlesTypeFormComponent } from '../../settings/articles-type/articles-type-form/articles-type-form.component';
import { ArticlesTypeFormPageComponent } from '../../settings/articles-type/articles-type-form-page/articles-type-form-page.component';

@Component({
  selector: 'app-articles-new',
  templateUrl: './articles-new.component.html',
  styleUrls: ['./articles-new.component.scss']
})
export class ArticlesNewComponent implements OnInit, AfterViewInit {


  typeList: ArticleTypeModel[] = []
  vditor!: Vditor;

  isSubmit: boolean = false;

  form = this.fb.group({
    typeID: [null, [Validators.required]],
    title: [null, [Validators.required]],
    content: [''],
    description: [''],
    status: 0
  });

  get typeID(): FormControl {
    return this.form.get('typeID') as FormControl;
  }
  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private themeService: ThemeService,
    private jwtService: JwtService,
    private googleAuthService: GoogleAuthService,
    private settingsService: SettingsService,
    public dialog: MatDialog,
    private articleService: ArticleService,
    private renderer: Renderer2
  ) { }


  ngOnInit(): void {
    this.themeService.getThemeData({ self: 1 });


    this.settingsService.getArticleType().subscribe((data: ArticleTypeModel[]) => {
      this.typeList = data;
    });



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
      }
    });




  }

  ngAfterViewInit(): void {

  }


  addType() {
    const dialogRef = this.dialog.open(ArticlesTypeFormPageComponent);

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined && result != null && result.id > 0) {
        this.typeList.push(result);
        this.typeList = Object.assign([], this.typeList);
      }

    });
  }


  onSubmit(status: number) {

    const html = this.vditor.getHTML();
    const dom: HTMLElement = this.renderer.createElement('div');
    this.renderer.setProperty(dom, 'innerHTML', html);
    const desc = dom.innerText.replace(/\n/g, ' ').replace(/\s\s/g, ' ').substring(0, 100);


    if (this.isSubmit) return false;

    this.form.get('content')?.setValue(this.vditor.getValue());
    this.form.get('description')?.setValue(desc);
    this.form.get('status')?.setValue(status);

    if (!this.form.valid) return false;

    this.articleService.addArticle(this.form.value).subscribe((data) => {



    }, (error) => {

    });


    return true;
  }



}
