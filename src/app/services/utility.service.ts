import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  snackbar = inject(MatSnackBar)
  constructor() { }

  openSnackBar(message: string) {
    this.snackbar.open(message, "Ok", { duration: 2500 });
  }
}
