// theme.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.updateTheme();
  }

  isDarkMode() {
    return this.darkMode;
  }

  private updateTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
