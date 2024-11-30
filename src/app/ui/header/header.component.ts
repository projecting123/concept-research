import { Component, inject, OnInit, signal, Signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SettingsService } from '../../services/settings.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIcon, MatTooltipModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  sidebar: Signal<any> = viewChild('sidebar');
  authService = inject(AuthService)
  settingsService = inject(SettingsService)
  router = inject(Router)
  constructor() {
  }
  openSidebar() {
    this.sidebar().nativeElement.style.transform = 'translateX(0%)'
  }

  setIsDarkMode(){
    this.settingsService.toggleDarkMode(!this.settingsService.isDarkMode())
  }

  closeSidebar() {
    this.sidebar().nativeElement.style.transform = 'translateX(-100%)'
  }

  logout(){
    this.authService.logout().subscribe(data => {
      this.authService.removeUserInfo()
      this.authService.setisAuthorized(false)
      this.router.navigate(['/login'])
    })
  }

  ngOnInit() {
    this.authService.loggedInEvent.subscribe((isAuthorized: boolean) => {
      this.authService.isAuthorized.set(isAuthorized)
    })
  }
}