import { Component, ViewEncapsulation } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ThemeService } from '../theme.service';

/**
 * @title Basic slide-toggles
 */
@Component({
  selector: 'slide-toggle',
  template: ` <mat-slide-toggle
    class="example-margin"
    [checked]="isDarkMode()"
    (change)="toggleTheme()"
  >
    <span [class.dark-mode-label]="isDarkMode()">Dark Mode</span>
  </mat-slide-toggle>`,
  standalone: true,
  imports: [
    MatCardModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
})
export class SlideToggle {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;
  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
