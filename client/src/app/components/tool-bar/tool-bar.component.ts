import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItemID } from 'src/app/classes/constants';
import { LoginService } from 'src/app/services/login.service';

interface MenuItem {
  id: MenuItemID;
  label: string;
  icon: string;
  showOnMobile: boolean;
  showOnTablet: boolean;
  showOnDesktop: boolean;
  showWhenNotConnected: boolean;
}

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {
  // Inspired from https://medium.com/javascript-in-plain-english/create-a-responsive-toolbar-in-angular-using-flex-layout-c6d83ff8258e
  menuItems: MenuItem[] = [
    {
      id: MenuItemID.ABOUT,
      label: 'À propos',
      icon: 'help',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false,
      showWhenNotConnected: true
    },
    {
      id: MenuItemID.LOGOUT,
      label: 'Deconnexion',
      icon: 'exit_to_app',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false,
      showWhenNotConnected: false
    },
    {
      id: MenuItemID.PROFILE,
      label: 'Profil',
      icon: 'account_circle',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true,
      showWhenNotConnected: false
    }
  ];

  constructor(public loginService: LoginService, private router: Router) { }

  isUserPhotoAvailable(id: MenuItemID): boolean {
    if (id !== MenuItemID.PROFILE) return false;
    if (!this.loginService.loginResult.userPhoto || this.loginService.loginResult.userPhoto === '') return false;
    return true;
  }

  mainButtonClick(): void {
    if (this.loginService.loginResult.isLoggedIn) this.router.navigate(['home']);
    else this.router.navigate(['login']);
  }

  itemButtonClick(id: MenuItemID): void {
    switch(id) {
      case MenuItemID.LOGOUT:
        this.loginService.setLogoutState();
        this.router.navigate(['login']);
        break;
      case MenuItemID.PROFILE:
        this.router.navigate(['user-profile/', this.loginService.loginResult.username]);
        break;
    }
  }

}
