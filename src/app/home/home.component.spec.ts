import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockHousingService: jasmine.SpyObj<HousingService>;

  beforeEach(waitForAsync(() => {
    mockHousingService = jasmine.createSpyObj('HousingService', [
      'getAllHousingLocations',
    ]);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        HomeComponent,
        HousingLocationComponent,
      ],
      providers: [
        { provide: HousingService, useValue: mockHousingService },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display housing locations on initialization', waitForAsync(
    fakeAsync(() => {
      console.log(mockHousingService); // Log the mockHousingService to see if it's injected

      const mockData: HousingLocation[] = [
        {
          id: 0,
          name: 'Acme Fresh Start Housing',
          city: 'Chicago',
          state: 'IL',
          photo:
            'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
          availableUnits: 4,
          wifi: true,
          laundry: true,
        },
        {
          id: 1,
          name: 'A113 Transitional Housing',
          city: 'Santa Monica',
          state: 'CA',
          photo:
            'https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg',
          availableUnits: 0,
          wifi: false,
          laundry: true,
        },
        {
          id: 2,
          name: 'Warm Beds Housing Support',
          city: 'Juneau',
          state: 'AK',
          photo:
            'https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg',
          availableUnits: 1,
          wifi: false,
          laundry: false,
        },
        {
          id: 3,
          name: 'Homesteady Housing',
          city: 'Chicago',
          state: 'IL',
          photo:
            'https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg',
          availableUnits: 1,
          wifi: true,
          laundry: false,
        },
        {
          id: 4,
          name: 'Happy Homes Group',
          city: 'Gary',
          state: 'IN',
          photo:
            'https://angular.io/assets/images/tutorials/faa/krzysztof-hepner-978RAXoXnH4-unsplash.jpg',
          availableUnits: 1,
          wifi: true,
          laundry: false,
        },
        {
          id: 5,
          name: 'Hopeful Apartment Group',
          city: 'Oakland',
          state: 'CA',
          photo:
            'https://angular.io/assets/images/tutorials/faa/r-architecture-JvQ0Q5IkeMM-unsplash.jpg',
          availableUnits: 2,
          wifi: true,
          laundry: true,
        },
        {
          id: 6,
          name: 'Seriously Safe Towns',
          city: 'Oakland',
          state: 'CA',
          photo:
            'https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ixe9nM-unsplash.jpg',
          availableUnits: 5,
          wifi: true,
          laundry: true,
        },
        {
          id: 7,
          name: 'Hopeful Housing Solutions',
          city: 'Oakland',
          state: 'CA',
          photo:
            'https://angular.io/assets/images/tutorials/faa/r-architecture-GGupkreKwxA-unsplash.jpg',
          availableUnits: 2,
          wifi: true,
          laundry: true,
        },
        {
          id: 8,
          name: 'Seriously Safe Towns',
          city: 'Oakland',
          state: 'CA',
          photo:
            'https://angular.io/assets/images/tutorials/faa/saru-robert-9rP3mxf8qWI-unsplash.jpg',
          availableUnits: 10,
          wifi: false,
          laundry: false,
        },
        {
          id: 9,
          name: 'Capital Safe Towns',
          city: 'Portland',
          state: 'OR',
          photo:
            'https://angular.io/assets/images/tutorials/faa/webaliser-_TPTXZd9mOo-unsplash.jpg',
          availableUnits: 6,
          wifi: true,
          laundry: true,
        },
      ];

      mockHousingService.getAllHousingLocations.and.returnValue(
        Promise.resolve(mockData)
      );
      fixture.detectChanges();

      component.initializeHousingLocations(); // Manually trigger data initialization

      tick(); // Simulate the passage of time until promises are resolved
      fixture.detectChanges(); // Update view after async operations

      // Now, you can make your assertions
      expect(component.housingLocationList).toEqual(
        jasmine.arrayContaining(mockData)
      );
    })
  ));

  it('should filter results when the Search button is clicked', () => {
    const mockData: HousingLocation[] = [
      {
        id: 0,
        name: 'Acme Fresh Start Housing',
        city: 'Chicago',
        state: 'IL',
        photo:
          'https://angular.io/assets/images/tutorials/faa/bernard-hermant-CLKGGwIBTaY-unsplash.jpg',
        availableUnits: 4,
        wifi: true,
        laundry: true,
      },
      {
        id: 1,
        name: 'A113 Transitional Housing',
        city: 'Santa Monica',
        state: 'CA',
        photo:
          'https://angular.io/assets/images/tutorials/faa/brandon-griggs-wR11KBaB86U-unsplash.jpg',
        availableUnits: 0,
        wifi: false,
        laundry: true,
      },
      {
        id: 2,
        name: 'Warm Beds Housing Support',
        city: 'Juneau',
        state: 'AK',
        photo:
          'https://angular.io/assets/images/tutorials/faa/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg',
        availableUnits: 1,
        wifi: false,
        laundry: false,
      },
      {
        id: 3,
        name: 'Homesteady Housing',
        city: 'Chicago',
        state: 'IL',
        photo:
          'https://angular.io/assets/images/tutorials/faa/ian-macdonald-W8z6aiwfi1E-unsplash.jpg',
        availableUnits: 1,
        wifi: true,
        laundry: false,
      },
      {
        id: 4,
        name: 'Happy Homes Group',
        city: 'Gary',
        state: 'IN',
        photo:
          'https://angular.io/assets/images/tutorials/faa/krzysztof-hepner-978RAXoXnH4-unsplash.jpg',
        availableUnits: 1,
        wifi: true,
        laundry: false,
      },
      {
        id: 5,
        name: 'Hopeful Apartment Group',
        city: 'Oakland',
        state: 'CA',
        photo:
          'https://angular.io/assets/images/tutorials/faa/r-architecture-JvQ0Q5IkeMM-unsplash.jpg',
        availableUnits: 2,
        wifi: true,
        laundry: true,
      },
      {
        id: 6,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo:
          'https://angular.io/assets/images/tutorials/faa/phil-hearing-IYfp2Ixe9nM-unsplash.jpg',
        availableUnits: 5,
        wifi: true,
        laundry: true,
      },
      {
        id: 7,
        name: 'Hopeful Housing Solutions',
        city: 'Oakland',
        state: 'CA',
        photo:
          'https://angular.io/assets/images/tutorials/faa/r-architecture-GGupkreKwxA-unsplash.jpg',
        availableUnits: 2,
        wifi: true,
        laundry: true,
      },
      {
        id: 8,
        name: 'Seriously Safe Towns',
        city: 'Oakland',
        state: 'CA',
        photo:
          'https://angular.io/assets/images/tutorials/faa/saru-robert-9rP3mxf8qWI-unsplash.jpg',
        availableUnits: 10,
        wifi: false,
        laundry: false,
      },
      {
        id: 9,
        name: 'Capital Safe Towns',
        city: 'Portland',
        state: 'OR',
        photo:
          'https://angular.io/assets/images/tutorials/faa/webaliser-_TPTXZd9mOo-unsplash.jpg',
        availableUnits: 6,
        wifi: true,
        laundry: true,
      },
    ];

    component.housingLocationList = mockData;
    component.filteredLocationList = mockData;

    fixture.detectChanges();

    // Trigger the filter
    const filterValue = 'Portland';
    component.filterResults(filterValue);

    // Assert that the filtered list is correct
    expect(component.filteredLocationList.length).toBe(1);
    expect(component.filteredLocationList[0].city).toBe(filterValue);
  });
});
