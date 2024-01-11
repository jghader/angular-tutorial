import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../housinglocation';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  template: `
    <section class="listing" [@fadeInOut]="'in'">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <p
        class="listing-location"
        [class.dark-mode-listing-location]="isDarkMode()"
      >
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HousingLocationComponent {
  @Input() housingLocation!: HousingLocation;

  constructor(private themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode() {
    return this.themeService.isDarkMode();
  }
}
