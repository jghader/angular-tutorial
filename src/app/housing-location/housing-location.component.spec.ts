import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ThemeService } from '../theme.service';
import { HousingLocationComponent } from './housing-location.component';

describe('HousingLocationComponent', () => {
  let component: HousingLocationComponent;
  let fixture: ComponentFixture<HousingLocationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [ThemeService, { provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HousingLocationComponent);
    component = fixture.componentInstance;

    component.housingLocation = {
      id: 1,
      name: 'Acme Fresh Start Housing',
      city: 'Chicago',
      state: 'IL',
      photo:
        'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
      availableUnits: 4,
      wifi: true,
      laundry: true,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display housing location information', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.listing-heading').textContent).toContain(
      'Acme Fresh Start Housing'
    );
    expect(compiled.querySelector('.listing-location').textContent).toContain(
      'Chicago, IL'
    );
    expect(compiled.querySelector('img').src).toContain(
      'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg'
    );
  });
});
