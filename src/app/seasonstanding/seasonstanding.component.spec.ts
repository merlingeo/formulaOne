import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonstandingComponent } from './seasonstanding.component';

describe('SeasonstandingComponent', () => {
  let component: SeasonstandingComponent;
  let fixture: ComponentFixture<SeasonstandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonstandingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeasonstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
