import { EventEmitter, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  isDarkMode = signal<boolean>(false)
  modeEvent = new EventEmitter()
  constructor() {
  }

  toggleDarkMode(isDarkMode: boolean) {
    this.isDarkMode.set(isDarkMode)
  }
}

// It is settings related service that'll be used for authorized users