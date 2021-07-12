import { LoginService } from './../../../@core/services/login.service';
import { MenuService } from './../../../@core/services/menu.service';
import { Component, OnInit } from '@angular/core';
import { GoogleBasicProfile } from 'src/app/@core/models/google/google-basic-profile';
import { GoogleAuthService } from 'src/app/@core/services/google-auth.service';
import { MenuModel } from 'src/app/@core/models/menu.model';

@Component({
  selector: 'app-toolbar-menu',
  templateUrl: './toolbar-menu.component.html',
  styleUrls: ['./toolbar-menu.component.scss']
})
export class ToolbarMenuComponent implements OnInit {

  user!: GoogleBasicProfile;
  menuList!: MenuModel[];

  constructor(
    private googleAuthService: GoogleAuthService,
    private menuService: MenuService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.user = this.googleAuthService.googleUser;

    this.menuService.getMenu(1).subscribe((data) => {
      this.menuList = data;
    })

  }


  logout() {
    this.loginService.logout();
  }



}
