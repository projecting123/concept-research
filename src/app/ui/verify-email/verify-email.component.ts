import { Component, inject, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-verify-email',
  imports: [MatIcon],
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css'
})
export class VerifyEmailComponent{
  userId = input.required<string>()
  authService = inject(AuthService)
  ngOnInit(): void {
    const response = this.authService.verifyEmail(this.userId())
    response.subscribe((data: any) => {
      if(data.isEmailVerified){
        this.authService.isEmailVerified.set(true)
      }
    })
  }
}
