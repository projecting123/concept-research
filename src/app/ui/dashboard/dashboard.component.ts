import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { UserInfo } from '../../../interfaces/auth';

@Component({
    selector: 'app-dashboard',
    imports: [],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{
    authService = inject(AuthService)
    userInfo!: UserInfo
    platformId = inject(PLATFORM_ID)
    constructor() { }

    ngOnInit() {
        if(isPlatformBrowser(this.platformId)) this.userInfo = this.authService.getUserInfo()
    }
}