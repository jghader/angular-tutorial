import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { DetailsComponent } from './details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  const mockActivatedRoute = {
    snapshot: { params: { id: '1' } },
  };

  const mockHousingService = {
    getHousingLocationById: jasmine
      .createSpy('getHousingLocationById')
      .and.returnValue(
        Promise.resolve({
          name: 'A113 Transitional Housing', // Provide the expected name
        })
      ),
    submitApplication: jasmine.createSpy('submitApplication'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HousingService, useValue: mockHousingService },
      ],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ], // Include only necessary modules
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch housing location details on initialization', async () => {
    await fixture.whenStable();
    expect(mockHousingService.getHousingLocationById).toHaveBeenCalledWith(1);
    expect(component.housingLocation).toBeDefined();
    expect(component.housingLocation?.name).toEqual(
      'A113 Transitional Housing'
    );
  });

  it('should submit application on form submission', () => {
    component.applyForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });

    component.submitApplication();
    expect(mockHousingService.submitApplication).toHaveBeenCalledWith(
      'John',
      'Doe',
      'john.doe@example.com'
    );
  });
});
