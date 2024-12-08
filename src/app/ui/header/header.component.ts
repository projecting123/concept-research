import { Component, inject, OnInit, Signal, viewChild } from '@angular/core';
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
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  sidebar: Signal<any> = viewChild('sidebar');
  auth = inject(AuthService)
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
}