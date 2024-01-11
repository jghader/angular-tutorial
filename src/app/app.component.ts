import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';
import { SlideToggle } from './slidebar/slidebar.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    RouterLink,
    RouterOutlet,
    SlideToggle,
    HttpClientModule,
  ],
  template: `
    <main>
      <a [routerLink]="['/']">
        <header class="brand-name">
          <img
            class="brand-logo"
            src="/assets/logo.svg"
            alt="logo"
            aria-hidden="true"
            [class.dark-mode-image]="isDarkMode()"
          />

          <slide-toggle></slide-toggle>
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
